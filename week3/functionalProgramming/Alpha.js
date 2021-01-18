const isFactor = (number) => (potentialFactor) => number % potentialFactor === 0;
const getFactors = (number) => {
  const dividedSet = Array.from({ length: Math.sqrt(number) }, (_, i) => i + 1)
    .filter(isFactor(number))
    .reduce((acc, cur) => {
      acc.add(cur);
      acc.add(number / cur);
      return acc;
    }, new Set());

  return Array.from(dividedSet)
    .sort((a, b) => a - b);
}
const sum = (factors) => factors.reduce((acc, cur) => acc + cur, 0);
const isPrime = (number) => getFactors(number).length === 2;

const makeMinToMaxArray = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => i + min);

const getDivisionResult = (number) => {
  const sumFactor = sum(getFactors(number));
  const result = number * 2;
  if (sumFactor === result) {
    return 'perfect, ';
  } else if (sumFactor > result) {
    return 'abundant, ';
  } else if (sumFactor < result) {
    return 'deficient, ';
  }
}

const result = makeMinToMaxArray(2, 100)
  .reduce((acc, cur) => {
    acc += `${cur} : ${getDivisionResult(cur)}`;
    acc += isPrime(cur) ? 'prime\n' : '\n';
    return acc;
  }, '');

console.log(result);