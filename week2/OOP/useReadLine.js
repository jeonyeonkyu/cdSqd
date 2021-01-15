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
  return rest.some(({ x, y }) => x < 0 && y < 0);
}


const useReadLine = () => {
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