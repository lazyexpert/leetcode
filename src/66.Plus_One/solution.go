package main

import "fmt"

func plusOne(digits []int) []int {
	size := len(digits)
	incrementNext := true

	for i := size - 1; i >= 0; i-- {
		if incrementNext {
			if digits[i] == 9 {
				incrementNext = true
				digits[i] = 0
			} else {
				incrementNext = false
				digits[i] = digits[i] + 1
			}
		} else {
			break
		}
	}

	if incrementNext {
		return append([]int{1}, digits...)
	}

	return digits
}

func main() {
	data := []int{9}
	res := plusOne(data)

	fmt.Println(res)
}
