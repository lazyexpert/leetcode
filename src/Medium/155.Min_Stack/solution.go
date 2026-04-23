package main

import "fmt"

type stack []int

func (s *stack) Push(v int) {
	*s = append(*s, v)
}

func (s *stack) Pop() int {
	res := (*s)[len(*s)-1]
	*s = (*s)[:len(*s)-1]
	return res
}

type MinStack struct {
	min  int
	data stack
}

/** initialize your data structure here. */
func Constructor() MinStack {
	return MinStack{2147483647, stack{}}
}

func (minstack *MinStack) Push(x int) {
	if x < minstack.min {
		minstack.min = x
	}

	minstack.data.Push(x)
}

func (minstack *MinStack) Pop() {
	res := minstack.data.Pop()

	if minstack.min == res {
		min := 2147483647

		for _, v := range minstack.data {
			if v < min {
				min = v
			}
		}

		minstack.min = min
	}
}

func (minstack *MinStack) Top() int {
	return minstack.data[len(minstack.data)-1]
}

func (this *MinStack) GetMin() int {
	return this.min
}

func main() {
	minStack := Constructor()
	minStack.Push(-2)
	minStack.Push(0)
	minStack.Push(-3)
	fmt.Println(minStack.GetMin()) //--> Returns -3.
	minStack.Pop()
	fmt.Println(minStack.Top())    //     --> Returns 0.
	fmt.Println(minStack.GetMin()) //--> Returns -2.
}
