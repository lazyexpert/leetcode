/**
 * Definition for a binary tree node.
 */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;

  // Monotonic decreasing stack of TreeNodes (by val).
  const stack: TreeNode[] = [];

  for (const x of nums) {
    const node = new TreeNode(x);

    // Everything smaller than x becomes part of node.left (last popped is the largest of them).
    while (stack.length > 0 && stack[stack.length - 1].val < x) {
      node.left = stack.pop()!;
    }

    // If there's still a bigger element on the stack, current node becomes its right child.
    if (stack.length > 0) {
      stack[stack.length - 1].right = node;
    }

    stack.push(node);
  }

  // Root is the bottom of the stack
  return stack[0];
}

constructMaximumBinaryTree([3,2,1,6,0,5]);
