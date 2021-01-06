// https://www.acmicpc.net/problem/10757
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

const array1 = input[0].split('').reverse().map(Number);
const array2 = input[1].split('').reverse().map(Number);
const maxLength = Math.max(array1.length, array2.length);
const result = [];
let temp = 0;
for (let i = 0; i < maxLength; i++) {
  array1[i] = array1[i] || 0;
  array2[i] = array2[i] || 0;
  result[i] = ((array1[i] + array2[i] + temp) % 10);
  temp = array1[i] + array2[i] + temp >= 10 ? 1 : 0;
}
if (temp) {
  result.push(1);
}
console.log(result.reverse().join(''));