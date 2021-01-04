function dec2bin(decimal) { //10진수를 2진수 배열로 변환 하는 함수
  const answer = [];
  let squaredCount = getSquaredCount(decimal);
  for(let i = squaredCount; i >= 0; i--) {
    const squaredNumber = 2 ** i;
    if(decimal / squaredNumber >= 1){
      decimal %= squaredNumber;
      answer[i] = 1;
    } else {
      answer[i] = 0;
    }
  }
  return answer;
}

function getSquaredCount(number) { //2의 몇제곱인지 구해주는 함수
  let count = 1;
  while(true) {
    if(number < 2 ** count) {
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

console.log(dec2bin(173));
console.log(bin2dec([1, 1, 1, 1, 0, 1, 0, 1]))