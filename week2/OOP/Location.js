class Location {
  constructor(xPos, yPos) {
    this.MAX_POSITION = 24;
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
    return value <= this.MAX_POSITION ? true : false;
  }
}
module.exports = Location;

const checkNegative = (...rest) => {
  return rest.some(({ x, y }) => x < 0 && y < 0);
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

const getDistanceBetweenTwoPoints = ([first, second]) => {
  return Math.sqrt((first.x - second.x) ** 2 + (first.y - second.y) ** 2);
}

const getTriangleArea = ([first, second, third]) => {
  const side1 = getDistanceBetweenTwoPoints([first, second]);
  const side2 = getDistanceBetweenTwoPoints([first, third]);
  const side3 = getDistanceBetweenTwoPoints([second, third]);
  const half = (side1 + side2 + side3) / 2;
  return Math.sqrt(half * (half - side1) * (half - side2) * (half - side3));
}

const getPointSavedSet = (location) => {
  return location.reduce(({ xSet, ySet }, { x, y }) => {
    xSet.add(x);
    ySet.add(y);
    return { xSet, ySet };
  }, { xSet: new Set(), ySet: new Set() })
}

const checkSquare = (location) => {
  return Object.entries(getPointSavedSet(location))
    .filter(([_, value]) => value.size === 2)
    .length === 2;
}

const getSquareArea = (location) => {
  const { xSet, ySet } = getPointSavedSet(location);
  const [x1, x2] = [...xSet];
  const [y1, y2] = [...ySet];
  return Math.abs((x1 - x2) * (y1 - y2));
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
    if (line.toUpperCase() === 'Q') {
      rl.close();
    }
    const location = inputDivision(line)
      .map(element => element = new Location(element[0], element[1]));

    if (!checkNegative(...location)) {
      switch (location.length) {
        case 2:
          const straightLength = getDistanceBetweenTwoPoints(location);
          console.log(`'''두 점사이의 거리는 ${straightLength}'''`);
          break;
        case 3:
          const triangleArea = getTriangleArea(location);
          console.log(`'''삼각형 넓이는 ${triangleArea}'''`);
          break;
        case 4:
          if (checkSquare(location)) {
            const squareArea = getSquareArea(location);
            console.log(`'''사각형 넓이는 ${squareArea}'''`);
          } else {
            console.log('> 직사각형이 아닙니다. 다시 입력해주세요.');
          }
          break;
      }
    } else {
      console.log('> 숫자는 0 <= x <= 24 만 가능합니다. 다시 입력해주세요.');
    }
  })
  rl.on("close", () => {
    process.exit();
  })
}

useReadLine(Location);