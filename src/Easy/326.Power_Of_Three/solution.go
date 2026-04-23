package main

import "fmt"

func isPowerOfThree(n int) bool {
	for curr := float64(n); curr >= 1 || int(curr)%3 != 0; curr /= 3 {
		if curr == 1 {
			return true
		}
	}

	return false
}

func main() {
	res := isPowerOfThree(100)
	fmt.Println(res)
}
