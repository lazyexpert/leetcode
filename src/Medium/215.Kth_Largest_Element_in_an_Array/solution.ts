function findKthLargest(nums: number[], k: number): number {
  function getLeftChildIdx(i: number): number {
    return 2 * i + 1;
  }

  function getRightChildIdx(i: number): number {
    return 2 * i + 2;
  }

  function getParentIdx(i: number): number {
    return Math.floor((i-1)/2);
  }

  function addElement(heap: number[], el: number) {
    heap.push(el);
    heapifyUp(heap, heap.length - 1);
  }

  function pop(heap: number[]) {
    if (heap.length === 1) return heap.pop();

    const el = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    heapifyDown(heap, 0);
    return el;
  }

  function swapElements(heap: number[], i: number, j: number) {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }

  function heapifyDown(heap: number[], i: number) {
    const left = getLeftChildIdx(i);
    const right = getRightChildIdx(i);

    let largest = i;

    if (left < heap.length && heap[left] > heap[largest]) {
      largest = left;
    }

    if (right < heap.length && heap[right] > heap[largest]) {
      largest = right;
    }

    if (largest !== i) {
      swapElements(heap, i, largest);
      heapifyDown(heap, largest);
    }
  }

  function heapifyUp(heap: number[], i: number) {
    const parentIdx = getParentIdx(i);
    if (heap[parentIdx] === undefined) return;
    if (heap[parentIdx] < heap[i]) {
      swapElements(heap, parentIdx, i);
      heapifyUp(heap, parentIdx);
    }
  }

  // Build max heap
  function buildHeap(nums: number[]): number[] {
    const heap = new Array<number>();

    for (const num of nums) {
      addElement(heap, num);
    }

    return heap;
  }

  const heap = buildHeap(nums);
  let lastEl = heap[0];
  while (k > 0) {
    lastEl = pop(heap) as number;
    k--;
  }

  return lastEl;
};
