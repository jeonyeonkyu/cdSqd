//https://www.hackerrank.com/challenges/save-the-prisoner/problem
function saveThePrisoner(n, m, s) {
  m += s - 1;
  return m % n ? m % n : n;
}