package main

import (
	"fmt"
	"strconv"
)

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func collectPaths(node *TreeNode, currentPath string, result []string) []string {
	if node.Left != nil {
		result = collectPaths(node.Left, currentPath+"->"+strconv.Itoa(node.Left.Val), result)
	}

	if node.Right != nil {
		result = collectPaths(node.Right, currentPath+"->"+strconv.Itoa(node.Right.Val), result)
	}

	if node.Left == nil && node.Right == nil {
		result = append(result, currentPath)
	}

	return result
}

func binaryTreePaths(root *TreeNode) []string {
	result := make([]string, 0)
	if root == nil {
		return result
	}

	res := collectPaths(root, strconv.Itoa(root.Val), result)
	return res
}

func main() {
	head := TreeNode{Val: 1}
	left := TreeNode{Val: 2}
	head.Left = &left
	leftRight := TreeNode{Val: 5}
	head.Left.Right = &leftRight
	right := TreeNode{Val: 3}
	head.Right = &right

	result := binaryTreePaths(&head)

	fmt.Println(result)
}
