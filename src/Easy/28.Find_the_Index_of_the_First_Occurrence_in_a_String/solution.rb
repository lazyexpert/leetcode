# @param {String} haystack
# @param {String} needle
# @return {Integer}
def str_str(haystack, needle)
  return 0 if needle.empty?

  index = 0

  while index <= haystack.length - needle.length
    index2 = 0

    while index2 < needle.length &&
          haystack[index + index2] == needle[index2]
      index2 += 1
    end

    return index if index2 == needle.length
    index += 1
  end

  -1
end

puts str_str("mississippi", "issip")