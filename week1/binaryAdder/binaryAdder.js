
function halfAdder(bitA, bitB) { //1비트를 더하는 함수
  const answer = [];
  answer[0] = (bitA && bitB);
  answer[1] = getXor(bitA, bitB);
  return answer;
}

function fullAdder(bitA, bitB, carry) { //전체 덧셈
  const answer = [];
  const halfResult = halfAdder(bitA, bitB);
  answer[0] = (halfResult[1] && carry) || halfResult[0];
  answer[1] = getXor(halfResult[1], carry);
  return answer;
}

function isBothTrue(A, B) { //둘다 참일때
  return A && B;
}

function getXor(A, B) {
  return !(A && B) && (A || B);
}


// console.log(halfadder(0, 0));
console.log(fullAdder(0, 1, 1));