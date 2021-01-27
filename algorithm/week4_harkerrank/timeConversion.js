//https://www.hackerrank.com/challenges/time-conversion/problem
function timeConversion(s) {
  const timeArr = s.split('');
  const ampm = timeArr.splice(8, 2);
  let hour = timeArr.splice(0, 2).join('');

  if (ampm[0] === 'P') {
    if (hour !== '12') {
      hour = Number(hour) + 12 + '';
    }
  } else if (ampm[0] === 'A') {
    if (hour === '12') {
      hour = '00';
    }
  }
  timeArr.unshift(hour);
  return timeArr.join('');
}