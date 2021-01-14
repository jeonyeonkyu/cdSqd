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

const getDistanceBetweenTwoPoints = (...location) => {
  return Math.sqrt((location[0].x - location[1].x) ** 2 + (location[0].y - location[1].y) ** 2);
}

const getTriangleArea = (...location) => {
  const side1 = getDistanceBetweenTwoPoints(location[0], location[1]);
  const side2 = getDistanceBetweenTwoPoints(location[0], location[2]);
  const side3 = getDistanceBetweenTwoPoints(location[1], location[2]);
  const half = (side1 + side2 + side3) / 2;
  return Math.sqrt(half * (half - side1) * (half - side2) * (half - side3));
}

const checkSquare = (location) => {
  const xSet = new Set();
  const ySet = new Set();
  location.forEach(element => {
    xSet.add(element.x);
    ySet.add(element.y);
  })
  return xSet.size === 2 && ySet.size === 2 ? true : false;
}

const getSquareArea = (location) => {
  const xSet = new Set();
  const ySet = new Set();
  location.forEach(element => {
    xSet.add(element.x);
    ySet.add(element.y);
  })
  const xArray = [...xSet];
  const yArray = [...ySet];
  return Math.abs((xArray[0] - xArray[1]) * (yArray[0] - yArray[1]));
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
  console.log('"Q" 입력시 종료');
  rl.on("line", (line) => {
    if (line.toUpperCase() === 'Q') rl.close();
    const location = inputDivision(line)
      .map(element => element = new Location(element[0], element[1]));
    if (!checkNegative(...location)) {
      switch (location.length) {
        case 2:
          const straightLength = getDistanceBetweenTwoPoints(...location);
          console.log(`'''두 점사이의 거리는 ${straightLength}'''`);
          break;
        case 3:
          const triangleArea = getTriangleArea(...location);
          console.log(`'''삼각형 넓이는 ${triangleArea}'''`);
          break;
        case 4:
          if (checkSquare(location)) {
            const squareArea = getSquareArea(location);
            console.log(`'''사각형 넓이는 ${squareArea}'''`);
          } else { 
            console.log('> 잘못 입력하셨습니다. 다시 입력해주세요.');
          }
          break;
      }
    } else {
      console.log('> 잘못 입력하셨습니다. 다시 입력해주세요.');
    }
  })
  rl.on("close", () => {
    process.exit();
  })
}

useReadLine(Location);