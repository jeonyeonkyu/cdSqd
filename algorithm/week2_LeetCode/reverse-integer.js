//https://leetcode.com/problems/reverse-integer/submissions/
/**
 * @param {number} x
 * @return {number}
 */
const reverse = function (x) {
  const LIMIT_NUMBER = 2147483648;
  let minus = '';
  if (x < 0) {
    minus = '-'
    x *= -1;
  }
  let numStr = (x + '').split('');
  let numLength = numStr.length;
  let result = '';
  for (let i = 0; i < numLength; i++) {
    result += numStr.pop();
  }
  result = +(minus + result);
  if (LIMIT_NUMBER <= result || result < -LIMIT_NUMBER) {
    result = 0;
  }
  return result;
};

