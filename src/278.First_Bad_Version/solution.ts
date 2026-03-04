/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

var solution = function(isBadVersion: any) {

  return function(n: number): number {
    let l = 1;
    let r = n;

    while (l < r) {
      let i = l + Math.floor((r-l)/2);
      if (isBadVersion(i)) {
        r = i;
      } else {
        l = i + 1;
      }
    }

    return r;
  };
};
