package main

import (
	"fmt"
)

func findMaximumXOR(nums []int) int {
	max := 0

	for i := 0; i < len(nums); i++ {
		for j := 0; j < len(nums); j++ {
			if nums[i]^nums[j] > max {
				max = nums[i] ^ nums[j]
			}
		}
	}
	return max
}

func main() {
	input := []int{3, 10, 5, 25, 2, 8}

	res := findMaximumXOR(input)

	fmt.Println(res)
}
