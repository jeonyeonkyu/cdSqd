//https://www.hackerrank.com/challenges/diagonal-difference/problem
function diagonalDifference(arr) {
  let left = 0;
  let right = 0;
  for (let i = 0, j = i; i < arr.length; i++, j++) {
    left += arr[i][j];
  }
  for (let i = 0, j = arr.length - 1; i < arr.length; i++, j--) {
    right += arr[i][j];
  }
  return Math.abs(left - right);
}