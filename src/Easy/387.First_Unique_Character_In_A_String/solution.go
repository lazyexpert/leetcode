package main

import "fmt"

type occurence struct {
	repeated       bool
	firstOccurence int
}

func firstUniqChar(s string) int {
	dict := make(map[string]*occurence)

	for index, r := range s {
		c := string(r)
		if _, ok := dict[c]; ok {
			occ := dict[c]
			occ.repeated = true
		} else {
			dict[c] = &occurence{false, index}
		}
	}

	minIndex := len(s)

	for _, v := range dict {
		if !v.repeated && v.firstOccurence < minIndex {
			minIndex = v.firstOccurence
		}
	}

	if minIndex == len(s) {
		return -1
	}

	return minIndex
}

func main() {
	// res := firstUniqChar("loveleetcode")
	res := firstUniqChar("z")

	fmt.Println(res)
}
