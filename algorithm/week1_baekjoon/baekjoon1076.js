const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(e => e.match(/[a-z]/gi).join(''));;
const color = {
  black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
  green: 5, blue: 6, violet: 7, grey: 8, white: 9
};

const resistance = color[input[0]] + "" + color[input[1]];
let digit = '';
for (let i = 0; i < color[input[2]]; i++) {
  digit += '0';
}

console.log(+(resistance + digit));