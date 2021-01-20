//https://programmers.co.kr/learn/courses/30/lessons/12930
function solution(s) {
  const result = [];
  const resultArr = s.split(" ");
  resultArr.forEach(word => {
    const alphabetArray = word.split('');
    let answer = '';
    alphabetArray.forEach((ele, index) => {
      answer += index % 2 ? ele.toLowerCase() : ele.toUpperCase();
    })
    result.push(answer);
  })
  return result.join(" ");
}