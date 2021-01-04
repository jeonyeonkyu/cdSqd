//1비트를 더하는 함수
function halfAdder(bitA, bitB) {
  const answer = [];
  answer[0] = isBothTrue(bitA, bitB);
  answer[1] = !isBothTrue(bitA,bitB) && (bitA || bitB);
  return answer;
}

//둘다 참일때
function isBothTrue(A, B){
  return A && B;
}

// console.log(halfadder(0, 0));
console.log(fullAdder(0, 1, 0));