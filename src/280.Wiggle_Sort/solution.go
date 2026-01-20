package main

import (
	"fmt"
	"sort"
)

func wiggleSort(nums []int) {
	sort.Ints(nums)

	for i := 1; i < len(nums); i += 2 {
		if i+1 < len(nums) {
			nums[i], nums[i+1] = nums[i+1], nums[i]
		}
	}
}

func main() {
	data := []int{1, 2, 3}
	wiggleSort(data)

	fmt.Println(data)
}
