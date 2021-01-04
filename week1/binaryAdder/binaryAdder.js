//1비트를 더하는 함수
function halfAdder(bitA, bitB) {
  const answer = [];
  answer[0] = isBothTrue(bitA, bitB);
  answer[1] = !isBothTrue(bitA, bitB) && (bitA || bitB);
  return answer;
}
//전체 덧셈
function fullAdder(bitA, bitB, carry) {
  const answer = [];
  const halfResult = halfAdder(bitA, bitB);
  const roundUpCheck = isBothTrue(halfResult[1], carry);
  answer[0] = roundUpCheck || halfResult[0];
  answer[1] = !roundUpCheck && (halfResult[1] || carry);
  return answer;
}
//둘다 참일때
function isBothTrue(A, B) {
  return A && B;
}

function byteAdder(byteA, byteB) {
  var answer = [];
  return answer;
}
// console.log(halfadder(0, 0));
console.log(fullAdder(0, 1, 0));