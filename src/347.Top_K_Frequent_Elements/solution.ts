function getLeftChildIdx(i: number): number {
  return 2 * i + 1;
}

function getRightChildIdx(i: number): number {
  return 2 * i + 2;
}

function getParentIdx(i: number): number {
  return Math.floor((i-1)/2);
}

function addElement(heap: number[], el: number, lookup: Record<number, number>) {
  heap.push(el);
  heapifyUp(heap, lookup);
}

function heapifyUp(heap: number[], lookup: Record<number, number>) {
  let i = heap.length - 1;
  while (i > 0) {
    const parentIdx = getParentIdx(i);
    const parent = heap[parentIdx];
    if (lookup[parent] < lookup[heap[i]]) {
      swapElements(heap, i, parentIdx);
      i = parentIdx;
    } else {
      break;
    }
  }
}

function heapifyDown(heap: number[], lookup: Record<number, number>) {
  let i = 0;

  while (i < heap.length) {
    const leftIdx = getLeftChildIdx(i);
    const rightIdx = getRightChildIdx(i);
    const leftChild = heap[leftIdx];
    const rightChild = heap[rightIdx];

    let largest = i;

    if (leftIdx < heap.length && lookup[leftChild] > lookup[heap[largest]]) {
      largest = leftIdx;
    }

    if (rightIdx < heap.length && lookup[rightChild] > lookup[heap[largest]]) {
      largest = rightIdx;
    }

    if (largest !== i) {
      swapElements(heap, i, largest);
      i = largest;
    } else {
      break;
    }
  }
}

function swapElements(heap: number[], i: number, j: number) {
  const temp = heap[i];
  heap[i] = heap[j];
  heap[j] = temp;
}

function pop(heap: number[], lookup: Record<number, number>): number {
  if (heap.length === 1) return heap.pop() as number;

  const el = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.pop();
  heapifyDown(heap, lookup);
  return el;
}

function buildHeap(lookup: Record<number, number>): number[] {
  const heap = new Array<number>();
  for (const num of Object.keys(lookup)) {
    addElement(heap, Number(num), lookup);
  }

  return heap;
} 

// Heap solution
function topKFrequent(nums: number[], k: number): number[] {
  const lookup: Record<number, number> = {};
  for (const num of nums) {
    if (lookup[num] === undefined) {
      lookup[num] = 1;
    } else {
      lookup[num]++;
    }
  }
  const heap = buildHeap(lookup);
  const result = new Array<number>();

  while (k > 0) {
    const el = pop(heap, lookup);
    result.push(el);
    k--;
  }
  return result;
};
