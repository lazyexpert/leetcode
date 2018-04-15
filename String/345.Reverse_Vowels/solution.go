package main

import "fmt"

func findClosestVowel(vowels *map[rune]bool, ss []rune, direction int, index int, limit int) int {
	for {
		if index == limit {
			break
		}
		r := ss[index]
		if val, ok := (*vowels)[r]; ok {
			if val {
				return index
			}
		}
		index += 1 * direction
	}

	return limit
}

func reverseVowels(s string) string {
	vowels := make(map[rune]bool)
	for _, r := range "aeiouAEIOU" {
		vowels[r] = true
	}

	runeInput := []rune(s)
	i := 0
	j := len(runeInput) - 1

	for {
		if i >= j {
			break
		}

		i = findClosestVowel(&vowels, runeInput, 1, i, j)
		if i >= j {
			break
		}

		j = findClosestVowel(&vowels, runeInput, -1, j, i)

		if i != j {
			runeInput[i], runeInput[j] = runeInput[j], runeInput[i]
			i++
			j--
		}
	}

	return string(runeInput)
}

func main() {
	res := reverseVowels("hello")

	fmt.Println(res)
}
