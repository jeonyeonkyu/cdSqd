
function halfAdder(bitA, bitB) { //1비트를 더하는 함수
  const answer = [];
  answer[0] = isBothTrue(bitA, bitB);
  answer[1] = getXor(bitA, bitB);
  return answer;
}

function fullAdder(bitA, bitB, carry) { //전체 덧셈
  const answer = [];
  const halfResult = halfAdder(bitA, bitB);
  const roundUpCheck = isBothTrue(halfResult[1], carry);
  answer[0] = roundUpCheck || halfResult[0];
  answer[1] = getXor(halfResult[1], carry);
  return answer;
}

function isBothTrue(A, B) { //둘다 참일때
  return A && B;
}

function getXor(A, B) {
  return !(A && B) && (A || B);
}

function byteAdder(byteA, byteB) { //8비트 덧셈기
  const answer = [];
  let carry = 0;
  for (let i = 0; i < byteA.length; i++) {
    const [next, current] = fullAdder(byteA[i], byteB[i], carry);
    answer[i] = current;
    carry = next;
  }
  answer[answer.length] = carry;
  return answer;
}
// console.log(halfadder(0, 0));
// console.log(fullAdder(0, 1, 0));
console.log(byteAdder([ 1, 1, 0, 1, 1, 0, 1, 0 ], [ 1, 0, 1, 1, 0, 0, 1, 1 ]));
console.log(byteAdder([ 1, 1, 0, 0, 1, 0, 1, 0 ], [ 1, 1, 0, 1, 1, 0, 0, 1 ]));