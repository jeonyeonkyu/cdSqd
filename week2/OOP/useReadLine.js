const Location = require('./Location.js');
const Straight = require('./Straight.js');
const Triangle = require('./Triangle.js');
const Square = require('./Square.js');
const View = require('./View.js');

class UseReadLine {
  constructor() {
    this.readline = require('readline');
    this.rl = this.readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  init() {
    this.printDescription();
    this.receiveInput();
    this.closeModule();
  }

  convertInputToArray(word) {
    const wordArray = word.split('-');
    const convertArray = wordArray.map(element => {
      return element.slice(1, -1)
        .split(',')
        .map(Number);
    })
    return convertArray;
  }

  printDescription() {
    console.log('> 좌표를 입력하세요.');
    console.log('제한)  0 < x, y <= 24');
    console.log('ex) 직선거리 구하기 (10,10)-(14,15)');
    console.log('ex) 삼각형 넓이 구하기 (10,10)-(14,15)-(20,8)');
    console.log('ex) 사각형 넓이 구하기 (10,10)-(22,10)-(22,18)-(10,18)');
    console.log('"Q" 입력시 종료');
  }
  
  chooseShape(location) {
    switch (location.length) {
      case 2:
        const straight = new Straight();
        console.log(`'''두 점사이의 거리는 ${straight.getDistanceBetweenTwoPoints(location).toFixed(6)}'''`);
        break;
      case 3:
        const triangle = new Triangle();
        console.log(`'''삼각형 넓이는 ${triangle.getTriangleArea(location).toFixed(1)}'''`);
        break;
      case 4:
        const square = new Square();
        if (square.checkSquare(location)) {
          console.log(`'''사각형 넓이는 ${square.getSquareArea(location)}'''`);
        } else {
          console.log('> 직사각형이 아닙니다. 다시 입력해주세요.');
        }
        break;
    }
  }

  checkNegative = (...rest) => {
    return rest.some(({ x, y }) => (x < 0 || x > 24) || (y < 0 || y > 24));
  }

  receiveInput() {
    this.rl.on("line", (line) => {
      if (line.toUpperCase() === 'Q') {
        this.rl.close();
      }
      const location = this.convertInputToArray(line)
        .map(element => element = new Location(element[0], element[1]));
      const view = new View(location, 24);
      view.drawTable();
      if (!this.checkNegative(...location)) {
        this.chooseShape(location);
      } else {
        console.log('> 숫자는 0 <= x, y <= 24 만 가능합니다. 다시 입력해주세요.');
      }
    })
  }
  
  closeModule() {
    this.rl.on("close", () => {
      process.exit();
    })
  }
}

const useReadLine = new UseReadLine();
useReadLine.init();