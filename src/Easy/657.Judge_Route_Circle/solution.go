package main

import "fmt"

func judgeCircle(moves string) bool {
	var sum int

	for _, r := range moves {
		c := string(r)
		if c == "U" || c == "R" {
			sum++
		} else {
			sum--
		}
	}

	if sum == 0 {
		return true
	}

	return false
}

func main() {
	res := judgeCircle("URLD")

	fmt.Println(res)
}
