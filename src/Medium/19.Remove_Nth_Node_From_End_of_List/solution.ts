/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function reverseLinkedList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next; // save next
    curr.next = prev;       // reverse pointer
    prev = curr;            // move prev
    curr = next;            // move curr
  }

  return prev;
}


function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head) return head;

  let newHead = reverseLinkedList(head);
  let curr = newHead;
  let prev: ListNode | null = null;
  let i = 1;

  while (curr !== null) {
    if (i === n) {
      if (prev === null) {
        // deleting head of reversed list
        newHead = curr.next;
      } else {
        prev.next = curr.next;
      }
      break;
    }
    prev = curr;
    curr = curr.next;
    i++;
  }

  return reverseLinkedList(newHead);
}
