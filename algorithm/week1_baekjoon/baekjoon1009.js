//https://www.acmicpc.net/problem/1009
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const inputArray = input.slice(1).map(e => e.split(' ').map(v => +v));
inputArray.forEach(element => {
  const temp = element[0];
  for (let i = 1; i < element[1]; i++) {
    element[0] *= temp;
    element[0] %= 10;
  }
  if (element[1] === 1) {
    console.log(element[0] % 10 ? element[0] % 10 : 10);
  } else {
    console.log(element[0] ? element[0] : 10);
  }
})