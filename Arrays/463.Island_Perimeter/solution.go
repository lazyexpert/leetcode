package main

import "fmt"

func islandPerimeter(grid [][]int) int {
	var per int

	for y := 0; y < len(grid); y++ {
		for x := 0; x < len(grid[y]); x++ {
			if grid[y][x] == 1 {
				if x-1 < 0 || grid[y][x-1] == 0 {
					per++
				}

				if x+1 > len(grid[y])-1 || grid[y][x+1] == 0 {
					per++
				}

				if y-1 < 0 || grid[y-1][x] == 0 {
					per++
				}

				if y+1 > len(grid)-1 || grid[y+1][x] == 0 {
					per++
				}

			}
		}
	}

	return per
}

func main() {
	row1 := []int{0, 1, 0, 0}
	row2 := []int{1, 1, 1, 0}
	row3 := []int{0, 1, 0, 0}
	row4 := []int{1, 1, 0, 0}

	input := [][]int{row1, row2, row3, row4}

	per := islandPerimeter(input)

	fmt.Println(per)
}
