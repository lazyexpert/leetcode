package main

import (
	"fmt"
	"sort"
)

type ByHeight [][]int

func (a ByHeight) Len() int      { return len(a) }
func (a ByHeight) Swap(i, j int) { a[i], a[j] = a[j], a[i] }
func (a ByHeight) Less(i, j int) bool {
	if a[i][0] == a[j][0] {
		return a[i][1] < a[j][1]
	}

	return a[i][0] < a[j][0]
}

func reconstructQueue(people [][]int) [][]int {
	res := make([][]int, len(people))
	sort.Sort(ByHeight(people))

	for _, person := range people {
		left := person[1]
		for i, v := range res {
			if left == 0 && len(v) == 0 {
				res[i] = person
				break
			}

			if len(v) == 0 || v[0] >= person[0] {
				left--
			}
		}
	}

	return res
}

func main() {
	data := [][]int{[]int{7, 0}, []int{4, 4}, []int{7, 1}, []int{5, 0}, []int{6, 1}, []int{5, 2}}
	res := reconstructQueue(data)

	fmt.Println(res)
}
