package main

import "fmt"

func numJewelsInStones(J string, S string) int {
	var result int
	dict := make(map[string]int)

	for _, r := range J {
		c := string(r)
		dict[c] = 0
	}

	for _, r := range S {
		if _, ok := dict[string(r)]; ok {
			result++
		}
	}

	return result
}

func main() {
	res := numJewelsInStones("aA", "aaAbdbdg")

	fmt.Println(res)
}
