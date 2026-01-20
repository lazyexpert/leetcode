class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }
 }

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy: ListNode = new ListNode();
  let tail = dummy;
  let carry: number = 0;
  let node1 = l1;
  let node2 = l2;

  while (node1 != null || node2 != null || carry > 0 ) {
    let value = (node1?.val ?? 0) + (node2?.val ?? 0) + carry;
    carry = Math.floor(value / 10);
    value = value % 10;

    const node = new ListNode(value);
    tail.next = node;
    tail = node;
    node1 = node1?.next || null;
    node2 = node2?.next || null;
  }

  return dummy.next;
};

const list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);

const res = addTwoNumbers(list, list);
console.log(res);
