//https://leetcode.com/problems/palindrome-number/submissions/
/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }
  const inputArray = (x + '').split('');
  let firstNum = '';
  let lastNum = '';
  while (inputArray.length) {
    if (inputArray.length === 1) {
      return true;
    }
    firstNum = inputArray.shift();
    lastNum = inputArray.pop();
    if (firstNum !== lastNum) {
      return false;
    }
  }
  return true;
};