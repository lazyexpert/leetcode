package main

import "fmt"

func twoSum(nums []int, target int) []int {
	hashmap := make(map[int]int)
	result := make([]int, 2)

	for i := 0; i < len(nums); i++ {
		if val, ok := hashmap[nums[i]]; ok {
			result[0] = val
			result[1] = i

			break
		}

		hashmap[target-nums[i]] = i
	}

	return result
}

func main() {
	nums := []int{5, 3, 2, 7, 1, 9, 10}

	result := twoSum(nums, 14)

	fmt.Println(result)
}
