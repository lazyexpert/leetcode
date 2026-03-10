class AlexHeap<T> {
  // Max heap
  private heap = new Array<T>();
  private comparator: Function;
  private size: number;

  constructor(nums: T[], size: number, comparator: Function) {
    this.comparator = comparator;
    this.size = size;

    for(const num of nums) {
      this.addElement(num);
    }
  }

  addElement(num: T) {
    this.heap.push(num);
    this.heapifyUp();
    while (this.heap.length > this.size) {
      this.pop();
    }
  }

  peek() {
    return this.heap[0];
  }

  pop(): T {
    if (this.heap.length === 1) {
      return this.heap.pop() as T;
    }
    const el = this.heap[0];
    this.heap[0] = this.heap[this.heap.length-1];
    this.heap.pop();
    this.heapifyDown();

    return el;
  }

  heapifyDown() {
    let i = 0;

    while (i < this.heap.length) {
      const leftChildIdx = this.getLeftChildIdx(i);
      const rightChildIdx = this.getRightChildIdx(i);
      const leftChild = this.heap[leftChildIdx];
      const rightChild = this.heap[rightChildIdx];

      let idx = i;

      if (leftChildIdx < this.heap.length && this.comparator(leftChild, this.heap[idx])) {
        idx = leftChildIdx;
      }

      if (rightChildIdx < this.heap.length && this.comparator(rightChild, this.heap[idx])) {
        idx = rightChildIdx;
      }

      if (idx !== i) {
        this.swapElements(idx, i);
        i = idx;
      } else {
        break;
      }
    }
  }

  heapifyUp() {
    let i = this.heap.length-1;

    while (i > 0) {
      const parentIdx = this.getParentIdx(i);
      if (this.comparator(this.heap[i], this.heap[parentIdx])) {
        this.swapElements(i, parentIdx);
        i = parentIdx;
      } else {
        break;
      }
    }
  }

  private swapElements(i: number, j: number) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  private getParentIdx(i: number) {
    return Math.floor((i-1)/2);
  }

  private getLeftChildIdx(i: number) {
    return i * 2 + 1;
  }

  private getRightChildIdx(i: number) {
    return i * 2 + 2;
  }
}

class KthLargest {
  private heap: AlexHeap<number>;

  constructor(k: number, nums: number[]) {
    this.heap = new AlexHeap<number>(nums, k, (a: number,b: number) => a < b);
  }

  add(val: number): number {
    this.heap.addElement(val);
    const el = this.heap.peek();
    return el;
  }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */