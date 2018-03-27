package main

import "fmt"

func findDisappearedNumbers(nums []int) []int {
	res := make([]int, 0)
	dict := make([]int, len(nums))

	for i := 0; i < len(nums); i++ {
		dict[nums[i]-1] = 1
	}

	for i := 0; i < len(nums); i++ {
		if dict[i] == 0 {
			res = append(res, i+1)
		}
	}

	return res
}

func main() {
	nums := []int{4, 3, 2, 7, 8, 2, 3, 1}
	res := findDisappearedNumbers(nums)

	fmt.Println(res)
}
