//https://programmers.co.kr/learn/courses/30/lessons/42840
function solution(answers) {
  let people1 = [1, 2, 3, 4, 5]
  let people2 = [2, 1, 2, 3, 2, 4, 2, 5]
  let people3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
  let correct1 = 0, correct2 = 0, correct3 = 0;

  answers.forEach((ele, index) => {
    if (ele === people1[index % people1.length]) {
      correct1++;
    }
    if (ele === people2[index % people2.length]) {
      correct2++;
    }
    if (ele === people3[index % people3.length]) {
      correct3++;
    }
  });
  const answer = [correct1, correct2, correct3];
  const score_1st = Math.max(...answer);
  const result = [];
  answer.forEach((ele, index) => {
    if (ele === score_1st) {
      result.push(index + 1);
    }
  });
  return result;
}