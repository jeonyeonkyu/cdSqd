///https://www.hackerrank.com/challenges/kangaroo/problem
function kangaroo(x1, v1, x2, v2) {
  for (let i = 0; i <= 10000; i++) {
    if (x1 === x2) return 'YES';
    x1 += v1;
    x2 += v2;
  }
  return 'NO'
}