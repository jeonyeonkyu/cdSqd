
function halfAdder(bitA, bitB) { //1비트를 더하는 함수
  return [bitA & bitB, bitA ^ bitB];
}

function fullAdder(bitA, bitB, carry) { //전체 덧셈
  const answer = [];
  const halfResult = halfAdder(bitA, bitB);
  const roundUpCheck = halfResult[1] & carry;
  answer[0] = roundUpCheck | halfResult[0];
  answer[1] = halfResult[1] ^ carry;
  return answer;
}

function byteAdder(byteA, byteB) { //8비트 덧셈기
  const answer = [];
  const maxLength = Math.max(byteA.length, byteB.length);
  const cloneByteA = byteA.concat(new Array(maxLength - byteA.length).fill(0));
  const cloneByteB = byteB.concat(new Array(maxLength - byteB.length).fill(0));
  let carry = 0;
  for (let i = 0; i < maxLength; i++) {
    const [next, current] = fullAdder(cloneByteA[i], cloneByteB[i], carry);
    answer[i] = current;
    carry = next;
  }
  answer[answer.length] = carry;
  return answer;
}

module.exports = { byteAdder };
// console.log(halfadder(0, 0));
// console.log(fullAdder(0, 1, 0));
console.log(byteAdder([0, 1, 0, 1, 1, 0, 0, 0], [1, 0, 1, 1, 0, 0, 1, 1]));
console.log(byteAdder([1, 1, 0, 0, 1, 0, 1, 0], [1, 1, 0, 1, 1, 0, 0, 1]));