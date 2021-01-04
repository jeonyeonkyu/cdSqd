function dec2bin(decimal) {
  const answer = [];
  
  return answer;
}

function bin2dec(bin) {
  let answer = 0;
  let multiply = 1;
  bin.forEach(element => {
   answer +=  element * multiply;
   multiply *= 2; 
  })
  return answer;
}

console.log(bin2dec([1,1,1,1,0,1,0,1]))