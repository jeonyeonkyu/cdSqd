const { byteAdder } = require('./binaryAdder.js');

function dec2bin(decimal) { //10진수를 2진수 배열로 변환 하는 함수
  const answer = [];
  let squaredCount = getSquaredCount(decimal);
  for (let i = squaredCount; i >= 0; i--) {
    const squaredNumber = 2 ** i;
    if (decimal / squaredNumber >= 1) {
      decimal -= squaredNumber;
      answer[i] = 1;
    } else {
      answer[i] = 0;
    }
  }
  return answer;
}

function getSquaredCount(number) { //2의 몇제곱인지 구해주는 함수
  let count = 1;
  while (true) {
    if (number < 2 ** count) {
      count--;
      break;
    }
    count++;
  }
  return count;
}

function bin2dec(bin) { // 2진수 배열을 10진수로 변환하는 함수
  let answer = 0;
  let multiply = 1;
  bin.forEach(element => {
    answer += element * multiply;
    multiply *= 2;
  })
  return answer;
}

function dec2bin2dec(decimalA = 0, decimalB = 0) { //10진수를 2진수배열로 변경 후 2진수끼리 덧셈한 결과를 10진수로 출력하기
  const binarySumArray = byteAdder(dec2bin(decimalA), dec2bin(decimalB));
  return bin2dec(binarySumArray);
}


function binaryNumToHex(binaryArray) { //2진수배열을 16진수로 변환하기
  const hexRuleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  const digit = 4 - (binaryArray.length % 4 || 4);
  const binArr = binaryArray.concat(new Array(digit).fill(0));
  const hexArr = [];
  for (let i = 0; i < binArr.length; i += 4) {
    const decimal = bin2dec([binArr[i], binArr[i + 1], binArr[i + 2], binArr[i + 3]]);
    hexArr.push(hexRuleArray[decimal]);
  }
  return hexArr;
}

function hexNumToDecimal(hexArray) { //16진수 배열을 10진수로 변환하기
  const hexRuleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  const decimalArray = [];
  let decimalNumber = 0;
  hexArray.forEach(element => {
    decimalArray.push(hexRuleArray.indexOf(element));
  })
  console.log(decimalArray)
  decimalArray.forEach((element, index) => {
    decimalNumber += element * (16 ** index);
  })
  return decimalNumber;
}

console.log(dec2bin(173));
console.log(getSquaredCount(16));
console.log(bin2dec([1, 1, 1, 1, 0, 1, 0, 1]));
console.log(byteAdder([1, 1, 0, 0, 1, 0, 1, 0], [1, 1, 0, 1, 1, 0, 0, 1]));
console.log(dec2bin2dec(124, 123));
console.log(binaryNumToHex([1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]));
console.log(hexNumToDecimal(['e', 1]));