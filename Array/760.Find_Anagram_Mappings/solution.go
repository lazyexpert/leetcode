package main

import "fmt"

func anagramMappings(A []int, B []int) []int {
	res := make([]int, len(A))
	dict := make(map[int]int)

	for i := 0; i < len(B); i++ {
		dict[B[i]] = i
	}

	for i := 0; i < len(A); i++ {
		res[i] = dict[A[i]]
	}

	return res
}

func main() {
	A := []int{1, 2, 3, 4, 5}
	B := []int{5, 4, 3, 2, 1}
	res := anagramMappings(A, B)

	fmt.Println(res)
}
