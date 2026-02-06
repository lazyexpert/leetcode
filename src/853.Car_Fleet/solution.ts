// Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
// (target - position[i]) / speed[i]
// [ticks_required, position]
// [[1,10], [1,8],   [12,0],   [7,5], [3,3]]
// monotonic 
function carFleet(target: number, position: number[], speed: number[]): number {
  const cars = position
    .map((p, i) => ({ p, s: speed[i] }))
    .sort((a, b) => b.p - a.p); // from closest to target -> farthest

  const stack: number[] = []; // times to reach target (fleet arrival times)

  for (const car of cars) {
    const time = (target - car.p) / car.s;

    // New fleet only if it arrives later than the fleet in front
    if (stack.length === 0 || time > stack[stack.length - 1]) {
      stack.push(time);
    }
    // else: merges into the fleet in front (do nothing)
  }

  return stack.length;
}

carFleet(100, [0,2,4], [4,2,1]);
