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

function deleteDuplicates(head: ListNode | null): ListNode | null {
  let prev = head;
  if (!head?.next) return head;
  let curr = head.next; 

  while (curr !== null) {
    if (prev?.val === curr.val) {
      prev.next = curr.next;
      curr = curr.next as ListNode;
    } else {
      let temp = curr;
      prev = curr;
      curr = temp.next as ListNode;
    }
  }

  return head;
};