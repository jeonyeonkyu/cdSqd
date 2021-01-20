//https://programmers.co.kr/learn/courses/30/lessons/64061
function solution(board, moves) {
  const result = [];
  let count = 0;
  for (let i = 0; i < moves.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[j][(moves[i] - 1)] != 0) {
        result.push(board[j][(moves[i] - 1)]);
        board[j][(moves[i] - 1)] = 0;
        break;
      }
    }
  }
  for (let i = 0; i < result.length; i++) {
    if (result[i] == result[i - 1]) {
      result.splice(i - 1, 2);
      i = 0
      count += 2;
    }
  }
  return count;
}