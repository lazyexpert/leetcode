#!/usr/bin/env python3
"""
Fetch a LeetCode problem via the public GraphQL endpoint and emit a manifest
ready to pipe into scaffold.py.

Usage: fetch.py <url-or-slug>

Accepts either a full LeetCode problem URL (e.g.
https://leetcode.com/problems/two-sum/description/) or a bare slug (e.g.
two-sum). Outputs a JSON manifest on stdout with: number, title, difficulty,
type ("algorithmic" | "SQL"), tags, statement (markdown).

Exit codes:
   0 success
   1 problem not found (bad slug)
   2 premium problem (content empty / paywalled)
   3 network / HTTP failure
  64 invalid arguments
"""
import html
import json
import re
import sys
import urllib.error
import urllib.request


QUERY = (
    'query q($s:String!){question(titleSlug:$s){'
    'questionFrontendId title difficulty content topicTags{slug}'
    '}}'
)


# ── slug / URL handling ────────────────────────────────────────────────────

def extract_slug(value: str) -> str | None:
    m = re.search(r'problems/([^/?\s]+)', value)
    if m:
        return m.group(1)
    if re.match(r'^[a-z0-9][a-z0-9-]*$', value):
        return value
    return None


# ── GraphQL fetch ──────────────────────────────────────────────────────────

def fetch(slug: str) -> dict:
    req = urllib.request.Request(
        'https://leetcode.com/graphql',
        data=json.dumps({'query': QUERY, 'variables': {'s': slug}}).encode(),
        headers={
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0',
        },
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        # LC returns raw tabs inside JSON strings; strict=False tolerates it.
        return json.loads(resp.read().decode(), strict=False)


# ── HTML → Markdown ────────────────────────────────────────────────────────

def html_to_markdown(content_html: str) -> str:
    """Convert LC problem HTML to the repo's README markdown format.

    Handles both legacy `<pre>` example blocks and the newer
    `<div class="example-block">` form. The output is structured as:

        <description paragraphs>

        ## Constraints
        - …

        ## Example
        ```
        Input: …
        Output: …
        ```

        **Follow-up:** …  (when present)
    """
    s = content_html

    # 1. decode HTML entities (&nbsp; &#39; &lt; &gt; &quot; …)
    s = html.unescape(s).replace('\xa0', ' ').replace('\r\n', '\n')

    # 2. inline tags (do before block extraction so list/pre contents format right)
    s = re.sub(r'<code>(.*?)</code>', r'`\1`', s, flags=re.DOTALL)
    s = re.sub(r'<(?:strong|b)\b[^>]*>(.*?)</(?:strong|b)>', r'**\1**', s, flags=re.DOTALL)
    s = re.sub(r'<(?:em|i)\b[^>]*>(.*?)</(?:em|i)>', r'*\1*', s, flags=re.DOTALL)
    s = re.sub(r'<sup>(.*?)</sup>', r'^\1', s, flags=re.DOTALL)
    s = re.sub(r'<sub>(.*?)</sub>', r'_\1', s, flags=re.DOTALL)
    # strip presentational wrappers, keep inner text
    s = re.sub(r'</?(?:span|font)\b[^>]*>', '', s)

    # 3. strip "**Example N:**" header paragraphs — fenced block is self-labelling
    s = re.sub(
        r'<p>\s*\*\*\s*Example\s*\d*:?\s*\*\*\s*</p>',
        '', s, flags=re.IGNORECASE,
    )

    # 4. normalise example blocks to sentinel form
    def div_example(m: re.Match) -> str:
        lines: list[str] = []
        for pm in re.finditer(r'<p>(.*?)</p>', m.group(1), re.DOTALL):
            text = re.sub(r'<[^>]+>', '', pm.group(1))
            text = re.sub(r'\s+', ' ', text).strip()
            text = re.sub(r'\*\*(Input|Output|Explanation):\*\*', r'\1:', text)
            if text:
                lines.append(text)
        return '\nEXAMPLE_BEGIN\n' + '\n'.join(lines) + '\nEXAMPLE_END\n'

    s = re.sub(
        r'<div[^>]*class="[^"]*example-block[^"]*"[^>]*>(.*?)</div>',
        div_example, s, flags=re.DOTALL,
    )

    def pre_example(m: re.Match) -> str:
        inner = m.group(1).strip('\n')
        inner = re.sub(r'<[^>]+>', '', inner)
        inner = re.sub(r'\*\*(Input|Output|Explanation):\*\*', r'\1:', inner)
        return '\nEXAMPLE_BEGIN\n' + inner + '\nEXAMPLE_END\n'

    s = re.sub(r'<pre>(.*?)</pre>', pre_example, s, flags=re.DOTALL)

    # 5. extract Follow-up (wrapped in <p>, or bare)
    follow_up: str | None = None
    fm = re.search(
        r'(?:<p>\s*)?\*\*\s*Follow[- ]up:?\s*\*\*\s*(.*?)(?:</p>|\Z)',
        s, flags=re.DOTALL | re.IGNORECASE,
    )
    if fm:
        text = re.sub(r'<[^>]+>', '', fm.group(1))
        text = re.sub(r'\s+', ' ', text).strip()
        if text:
            follow_up = text
        s = s[:fm.start()] + s[fm.end():]

    # 6. extract constraints — <ul> following the Constraints: marker
    constraints: str | None = None
    cm = re.search(
        r'<p>\s*\*\*\s*Constraints:?\s*\*\*\s*</p>\s*<ul>(.*?)</ul>',
        s, flags=re.DOTALL | re.IGNORECASE,
    )
    if cm:
        items: list[str] = []
        for it in re.findall(r'<li>(.*?)</li>', cm.group(1), re.DOTALL):
            t = re.sub(r'<[^>]+>', '', it)
            t = re.sub(r'\s+', ' ', t).strip()
            if t:
                items.append(f'- {t}')
        if items:
            constraints = '\n'.join(items)
        s = s[:cm.start()] + s[cm.end():]

    # 7. remaining lists
    def convert_ul(m: re.Match) -> str:
        out: list[str] = []
        for it in re.findall(r'<li>(.*?)</li>', m.group(1), re.DOTALL):
            t = re.sub(r'<[^>]+>', '', it)
            t = re.sub(r'\s+', ' ', t).strip()
            if t:
                out.append(f'- {t}')
        return '\n\n' + '\n'.join(out) + '\n\n'

    def convert_ol(m: re.Match) -> str:
        out: list[str] = []
        for idx, it in enumerate(re.findall(r'<li>(.*?)</li>', m.group(1), re.DOTALL), 1):
            t = re.sub(r'<[^>]+>', '', it)
            t = re.sub(r'\s+', ' ', t).strip()
            if t:
                out.append(f'{idx}. {t}')
        return '\n\n' + '\n'.join(out) + '\n\n'

    s = re.sub(r'<ul>(.*?)</ul>', convert_ul, s, flags=re.DOTALL)
    s = re.sub(r'<ol>(.*?)</ol>', convert_ol, s, flags=re.DOTALL)

    # 8. paragraphs
    def convert_p(m: re.Match) -> str:
        text = m.group(1).strip()
        text = re.sub(r'\s+', ' ', text)
        return '\n\n' + text + '\n\n' if text else ''

    s = re.sub(r'<p>(.*?)</p>', convert_p, s, flags=re.DOTALL)

    # 9. stray tags
    s = re.sub(r'<br\s*/?>', '\n', s)
    s = re.sub(r'<[^>]+>', '', s)

    # 10. split description / example blocks via sentinels
    description_parts: list[str] = []
    example_blocks: list[str] = []
    cursor = 0
    for m in re.finditer(r'EXAMPLE_BEGIN\n(.*?)\nEXAMPLE_END', s, re.DOTALL):
        description_parts.append(s[cursor:m.start()])
        example_blocks.append(m.group(1).strip())
        cursor = m.end()
    description_parts.append(s[cursor:])
    description = re.sub(r'\n{3,}', '\n\n', '\n'.join(description_parts)).strip()

    # 11. assemble
    parts: list[str] = []
    if description:
        parts.append(description)
    if constraints:
        parts.append('## Constraints\n' + constraints)
    if example_blocks:
        blocks = '\n\n'.join(f'```\n{b}\n```' for b in example_blocks)
        parts.append('## Example\n\n' + blocks)
    if follow_up:
        parts.append(f'**Follow-up:** {follow_up}')

    return '\n\n'.join(parts).rstrip() + '\n'


# ── main ───────────────────────────────────────────────────────────────────

def main() -> int:
    if len(sys.argv) != 2:
        print('usage: fetch.py <url-or-slug>', file=sys.stderr)
        return 64

    slug = extract_slug(sys.argv[1])
    if not slug:
        print('ERROR: could not extract slug from argument', file=sys.stderr)
        return 64

    try:
        data = fetch(slug)
    except urllib.error.URLError as e:
        print(f'ERROR: network failure: {e}', file=sys.stderr)
        return 3
    except json.JSONDecodeError as e:
        print(f'ERROR: malformed response: {e}', file=sys.stderr)
        return 3

    question = data.get('data', {}).get('question')
    if not question:
        print('ERROR: problem not found (bad slug?)', file=sys.stderr)
        return 1
    if not question.get('content'):
        print('ERROR: premium problem or empty content', file=sys.stderr)
        return 2

    tag_slugs = [t['slug'] for t in question.get('topicTags', [])]
    manifest = {
        'number':     int(question['questionFrontendId']),
        'title':      question['title'],
        'difficulty': question['difficulty'],
        'type':       'SQL' if 'database' in tag_slugs else 'algorithmic',
        'tags':       tag_slugs,
        'statement':  html_to_markdown(question['content']),
    }
    print(json.dumps(manifest, ensure_ascii=False))
    return 0


if __name__ == '__main__':
    sys.exit(main())
