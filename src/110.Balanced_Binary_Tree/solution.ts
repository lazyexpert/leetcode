/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
}

function isBalanced(root: TreeNode | null): boolean {
  const dfs = (node: TreeNode | null): number => {
    if (!node) return 0;

    const lh = dfs(node.left);
    if (lh === -1) return -1;

    const rh = dfs(node.right);
    if (rh === -1) return -1;

    if (Math.abs(lh - rh) > 1) return -1;
    return Math.max(lh, rh) + 1;
  };

  return dfs(root) !== -1;
};

function arrayToTree(arr: Array<number | null>): TreeNode | null {
  if (arr.length === 0 || arr[0] == null) return null;

  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (i < arr.length && queue.length > 0) {
    const node = queue.shift() as TreeNode;

    // left
    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal != null) {
        node.left = new TreeNode(leftVal);
        queue.push(node.left);
      }
    }

    // right
    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal != null) {
        node.right = new TreeNode(rightVal);
        queue.push(node.right);
      }
    }
  }

  return root;
}

isBalanced(arrayToTree([1,2,3,4,5,6,null,8]));
