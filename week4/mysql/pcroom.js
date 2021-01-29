const db = require('./dbConnection.js');
// db.connect();


const runMysql = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, function (error, results, fieldList) {
      if (error) reject(error);
      resolve(results);
    });
  })
}

const asyncGetEmptySeats = async () => {
  const seatPacket = await runMysql('SELECT seatnumber from PCSEAT where in_use = 0');
  const seatArray = seatPacket.map(e => e.seatnumber);
  return seatArray;
}

const getRandomSeats = async () => {
  const seats = await asyncGetEmptySeats();
  const randomSeatNumber = Math.floor(Math.random() * seats.length);
  return randomSeatNumber;
}

const insertNewUser = async (nickname, seatNumber) => {
  await runMysql(`insert into PCROOM (nickname, seatnumber) values ('${nickname}', ${seatNumber})`);
  await runMysql(`update PCSEAT set in_use = '1' where seatnumber = ${seatNumber}`);
}

const getUserSeat = async (nickname) => {
  return await runMysql(`select seatnumber from PCROOM where nickname = '${nickname}'`);
}

const getNowDate = () => {
  const date = new Date();
  const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  const [hours, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const quitUser = async (nickname) => {
  const userSeat = await getUserSeat();
  await runMysql(`update PCSEAT set in_use = '0' where seatnumber = ${userSeat}`);
  await runMysql(`update PCROOM set endtime = '${getNowDate()}' where nickname = '${nickname}'`);
}

const getLastUserKey = async () => {
  return await runMysql(`select MAX(id) from PCROOM`);
}

// insertNewUser('aaB');
quitUser('new');

console.log(getNowDate())


class PcModule {
  constructor() {
    this.readline = require('readline');
    this.rl = this.readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '입력> '
    });
  }

  init() {
    this.rl.prompt();
    this.receiveInput();
    this.closeModule();
  }

  receiveInput() { //입력받은 문자열 읽기
    this.rl.on("line", (line) => {
      if (line === 'quit') {
        this.rl.close();
      }
    })
  }

  closeModule() { //모듈 종료
    this.rl.on("close", () => {
      process.exit();
    })
  }
}

// db.end();