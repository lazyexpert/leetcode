/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     neighbors: _Node[]
 * 
 *     constructor(val?: number, neighbors?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 * 
 */

class _Node {
  val: number
  neighbors: _Node[]

  constructor(val?: number, neighbors?: _Node[]) {
    this.val = (val===undefined ? 0 : val)
    this.neighbors = (neighbors===undefined ? [] : neighbors)
  }
}

function getOrCreateNode(val: number, lookup: Map<number, _Node>): _Node {
  const cached = lookup.get(val);
  if (cached) return cached;

  const newNode = new _Node(val);
  lookup.set(val, newNode);
  return newNode;
}

// for each node, traverse all children and add them to the queue
function cloneGraph(node: _Node | null): _Node | null {
	if (node === null) return null;
  const newHead = new _Node(node.val);
  if (node.neighbors.length === 0) return newHead;

  const queue = new Array<_Node>(); // nodes to visit from original graph
  const lookup = new Map<number, _Node>(); // new graph, lookup for already created nodes

  lookup.set(newHead.val, newHead);
  queue.push(node);

  while (queue.length > 0) {
    const curr = queue.shift() as _Node;
    const newNode = getOrCreateNode(curr.val, lookup);

    for (let i = 0; i < curr.neighbors.length; i++) {
      const neighbourNode = curr.neighbors[i];
      const alreadySeen = lookup.has(neighbourNode.val);
      if (!alreadySeen) {
        queue.push(neighbourNode);
      }
      const neighborCopy = getOrCreateNode(neighbourNode.val, lookup);
      newNode.neighbors.push(neighborCopy);
    }
  }

  return newHead;
};