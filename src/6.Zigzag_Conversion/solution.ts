
function convert6(s: string, numRows: number): string {
  if (s.length === 1 || numRows > s.length || numRows === 1) return s;
  const zigzag = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    zigzag[i] = "";
  }

  let direction = 1; // 1 - down, -1 - up
  let currentIndex = 0;

  for (let i = 0; i < s.length; i++) {
    const currString: string = zigzag[currentIndex];
    zigzag[currentIndex] = currString + s[i];

    if (currentIndex === numRows - 1) direction = -1;
    else if(currentIndex === 0) direction = 1;

    currentIndex += direction;
  }

  return zigzag.join("");
};

const convertResult = convert6("PAYPALISHIRING", 3);
console.log(convertResult);
