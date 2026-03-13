// prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const prereqMap = new Map<number,number[]>();

  // course -> prerequisite - graph structure
  for (let i = 0; i < prerequisites.length; i++) {
    const prereq = prerequisites[i];
    const course = prereq[0];
    const prerequisite = prereq[1];
    const courseEl = prereqMap.get(course) || [];

    courseEl.push(prerequisite);
    prereqMap.set(course, courseEl);
  }

  function dfs(course: number, visited: Set<number>): boolean {
    if (visited.has(course)) return false; // <-- circular dependency
    const prereq = prereqMap.get(course) || new Array<number>();
    if (prereq.length === 0) return true;

    let res = true;
    visited.add(course);
    for (const p of prereq) {
      res = res && dfs(p, visited);
    }

    if (res === true) {
      prereqMap.set(course, []);
    }
    visited.delete(course);
    return res;
  }

  
  for (let course = 0; course < numCourses; course++) {
    if (!dfs(course, new Set<number>())) return false;
  }

  return true;
};
