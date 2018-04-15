package main

import "fmt"

func findTheDifference(s string, t string) byte {
	dict := make(map[rune]int)
	for _, r := range s {
		dict[r] = dict[r] + 1
	}

	for _, r := range t {
		if val, ok := dict[r]; ok {
			dict[r] = val - 1

			if val == 0 {
				return byte(r)
			}
		} else {
			return byte(r)
		}
	}

	return 0
}

func main() {
	diff := findTheDifference("helloworld", "xhelloworld")

	fmt.Println(string(diff))
}
