package main

import "fmt"

func isPowerOfTwo(n int) bool {
	for curr := float64(n); curr >= 1 || int(curr)%2 != 0; curr /= 2 {
		if curr == 1 {
			return true
		}
	}

	return false
}

func main() {
	res := isPowerOfTwo(100)
	fmt.Println(res)
}
