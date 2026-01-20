package main

import "fmt"

type stack []string

func (s *stack) Push(v string) {
	*s = append(*s, v)
}

func (s *stack) Pop() string {
	if len(*s) == 0 {
		return "empty"
	}

	res := (*s)[len(*s)-1]
	*s = (*s)[:len(*s)-1]
	return res
}

func isValid(s string) bool {
	dict := make(map[string]string)
	dict["}"] = "{"
	dict["]"] = "["
	dict[")"] = "("

	st := stack{}

	for _, r := range s {
		c := string(r)

		if val, ok := dict[c]; ok {
			last := st.Pop()
			if last == "empty" {
				return false
			}

			if val != last {
				return false
			}
		} else {
			st.Push(c)
		}
	}

	if len(st) > 0 {
		return false
	}
	return true
}

func main() {
	res := isValid("{")

	fmt.Println(res)
}
