function lastStoneWeight(stones: number[]): number {
  // Max heap
  function getLeftChildIdx(i: number): number {
    return i * 2 + 1;
  }

  function getRightChildIdx(i: number): number {
    return i * 2 + 2;
  }

  function getParentIdx(i: number): number {
    return Math.floor((i-1)/2);
  }

  function swapElements(heap: number[], i: number, j: number) {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }

  function addElement(heap: number[], el: number) {
    heap.push(el);
    heapifyUp(heap);
  }

  function heapifyUp(heap: number[]) {
    let i = heap.length - 1;

    while (i > 0) {
      const parentIdx = getParentIdx(i);
      if (heap[parentIdx] < heap[i]) {
        swapElements(heap, i, parentIdx);
        i = parentIdx;
      } else {
        break;
      }
    }
  }

  function heapifyDown(heap: number[]) {
    let i = 0;

    while (i < heap.length) {
      const leftChildIdx = getLeftChildIdx(i);
      const rightChildIdx = getRightChildIdx(i);
      const leftChild = heap[leftChildIdx];
      const rightChild = heap[rightChildIdx];

      let largest = i;
      if (leftChildIdx < heap.length && leftChild > heap[largest]) {
        largest = leftChildIdx;
      }

      if (rightChildIdx < heap.length && rightChild > heap[largest]) {
        largest = rightChildIdx;
      }

      if (largest !== i) {
        swapElements(heap, largest, i);
        i = largest;
      } else {
        break;
      }
    }
  }

  function pop(heap: number[]) {
    if (heap.length === 1) return heap.pop();
    const el = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    heapifyDown(heap);
    return el;
  }

  function buildHeap(nums: number[]) {
    const heap = new Array<number>();
    for (const num of nums) {
      addElement(heap, num);
    }
    return heap;
  }

  const heap = buildHeap(stones);
  while (heap.length > 1) {
    const stoneA = pop(heap) as number;
    const stoneB = pop(heap) as number;
    if (stoneA !== stoneB) {
      addElement(heap, stoneA - stoneB);
    }
  }

  return heap.length === 0 ? 0 : heap[0];
};

lastStoneWeight([1,3])
