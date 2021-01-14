class Location {
  constructor() {
    this.limitSize = 24;
  }
  get x() {
    return this.xPosition;
  }
  get y() {
    return this.yPosition;
  }
  set x(value) {
    if (checkSize(value)) return -1;
    this.xPosition = value;
  }
  set y(value) {
    if (checkSize(value)) return -1;
    this.yPosition = value;
  }
  checkSize(value) {
    return value <= this.limitSize ? true : false;
  }
}

const inputDivision = (word) => {
  const wordArray = word.split('-');
  const aWord = wordArray[0].slice(1, wordArray[0].length - 1);
  const bWord = wordArray[1].slice(1, wordArray[1].length - 1);
  const A = aWord.split(',');
  const B = bWord.split(',');
  return [...A, ...B];
}

const useReadLine = (A, B) => {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log('> 좌표를 입력하세요.');
  console.log('ex) (10,10)-(14,15)');
  rl.setPrompt('> 잘못 입력하셨습니다. 다시 입력해주세요.');
  rl.prompt();
  rl.on("line", (line) => {
    [A.x, A.y, B.x, B.y] = inputDivision(line);
    if (!checkNegative(A.x, A.y, B.x, B.y)){
      
    }

      rl.close();
  })
  rl.on("close", () => {
    process.exit();
  })
}


const A = new Location();
const B = new Location();
// useReadLine(A, B);

console.log(inputDivision('(10,10)-(14,15)'));