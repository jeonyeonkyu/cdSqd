class Location {
  constructor(xPos, yPos) {
    this.limitSize = 24;
    this.x = xPos;
    this.y = yPos;
  }
  get x() {
    return this.xPosition;
  }
  get y() {
    return this.yPosition;
  }
  set x(value) {
    this.xPosition = this.checkSize(value) ? value : -1;
  }
  set y(value) {
    this.yPosition = this.checkSize(value) ? value : -1;
  }
  checkSize(value) {
    return value <= this.limitSize ? true : false;
  }
}

const inputDivision = (word) => {
  const wordArray = word.split('-');
  const divisionArray = wordArray.map(element => {
    return element.slice(1, element.length - 1)
      .split(',')
      .map(Number);
  })
  return divisionArray;
}

const checkNegative = (...rest) => {
  return rest.some(element => element < 0);
}

const getDistanceBetweenTwoPoints = (Ax, Ay, Bx, By) => {
  return Math.sqrt((Ax - Bx) ** 2 + (Ay - By) ** 2);
}
const useReadLine = (A, B) => {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log('> 좌표를 입력하세요. 0 < x,y <= 24');
  console.log('ex) (10,10)-(14,15)');
  rl.on("line", (line) => {
    [A.x, A.y, B.x, B.y] = inputDivision(line);
    if (!checkNegative(A.x, A.y, B.x, B.y)) {
      const straightLength = getDistanceBetweenTwoPoints(A.x, A.y, B.x, B.y);
      console.log(`'''두 점사이의 거리는 ${straightLength}'''`);
      rl.close();
    } else {
      console.log('> 잘못 입력하셨습니다. 다시 입력해주세요.');
    }
  })
  rl.on("close", () => {
    process.exit();
  })
}

const A = new Location();
const B = new Location();
// useReadLine(A, B);

console.log(inputDivision('(10,20)-(20,30)-(20,10)'))