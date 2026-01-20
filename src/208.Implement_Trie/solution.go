package main

import "fmt"

type Node struct {
	children    map[rune]*Node
	isEndOfWord bool
}

type Trie struct {
	head  *Node
	cheat map[string]bool
}

/** Initialize your data structure here. */
func Constructor() Trie {
	return Trie{cheat: make(map[string]bool), head: &Node{isEndOfWord: false, children: make(map[rune]*Node)}}
}

// Insert inserts a word into the trie
func (trie *Trie) Insert(word string) {
	trie.cheat[word] = true
	children := trie.head.children
	lastNode := trie.head

	for _, r := range word {
		if node, ok := children[r]; ok {
			children = node.children
			lastNode = node
		} else {
			children[r] = &Node{isEndOfWord: false, children: make(map[rune]*Node)}
			lastNode = children[r]
			children = lastNode.children
		}
	}

	lastNode.isEndOfWord = true
}

// Search returns if the word is in the trie.
func (trie *Trie) Search(word string) bool {
	if _, ok := trie.cheat[word]; ok {
		return true
	}

	return false
}

/** Returns if there is any word in the trie that starts with the given prefix. */
func (trie *Trie) StartsWith(prefix string) bool {
	children := trie.head.children

	for _, r := range prefix {
		if node, ok := children[r]; ok {
			children = node.children
		} else {
			return false
		}
	}

	return true
}

func main() {
	obj := Constructor()
	obj.Insert("abc")

	search := obj.Search("abc")
	fmt.Println(search)

	search = obj.Search("ab")
	fmt.Println(search)

	obj.Insert("ab")

	search = obj.Search("ab")
	fmt.Println(search)

	obj.Insert("ab")

	search = obj.Search("ab")
	fmt.Println(search)
}
