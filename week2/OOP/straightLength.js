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

const checkNegative = (...rest) => {
  return rest.some(element => element.x < 0 && element.y < 0);
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

const getDistanceBetweenTwoPoints = (location1, location2) => {
  return Math.sqrt((location1.x - location2.x) ** 2 + (location1.y - location2.y) ** 2);
}

const getTriangleArea = (location1, location2, location3) => {
  const side1 = getDistanceBetweenTwoPoints(location1, location2);
  const side2 = getDistanceBetweenTwoPoints(location1, location3);
  const side3 = getDistanceBetweenTwoPoints(location2, location3);
  const half = (side1 + side2 + side3) / 2;
  return Math.sqrt(half * (half - side1) * (half - side2) * (half - side3));
}

const useReadLine = (Location) => {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log('> 좌표를 입력하세요.');
  console.log('제한)  0 < x, y <= 24')
  console.log('ex) 직선거리 구하기 (10,10)-(14,15)');
  console.log('ex) 삼각형 넓이 구하기 (10,10)-(14,15)-(20,8)');
  console.log('ex) 사각형 넓이 구하기 (10,10)-(22,10)-(22,18)-(10,18)');
  rl.on("line", (line) => {
    const location = inputDivision(line)
      .map(array => array = new Location(array[0], array[1]));
    if (!checkNegative(...location)) {
      // const straightLength = getDistanceBetweenTwoPoints(location[0], location[1]);
      // console.log(`'''두 점사이의 거리는 ${straightLength}'''`);
      const triangleArea = getTriangleArea(location[0], location[1], location[2]);
      console.log(triangleArea);
      rl.close();
    } else {
      console.log('> 잘못 입력하셨습니다. 다시 입력해주세요.');
    }
  })
  rl.on("close", () => {
    process.exit();
  })
}

useReadLine(Location);