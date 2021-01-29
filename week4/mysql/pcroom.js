const db = require('./dbConnection.js');
// db.connect();

class PcRoom {
  runMysql(sql) {
    return new Promise((resolve, reject) => {
      db.query(sql, function (error, results) {
        if (error) reject(error);
        resolve(results);
      });
    })
  }

  getEmptySeats = async () => {
    const seatPacket = await this.runMysql('SELECT seatnumber from PCSEAT where in_use = 0');
    const seatArray = seatPacket.map(e => e.seatnumber);
    return seatArray;
  }

  getRandomSeats = async () => {
    const seats = await this.getEmptySeats();
    const randomSeatNumber = Math.floor(Math.random() * seats.length);
    return randomSeatNumber;
  }

  insertNewUser = async (nickname, seatNumber) => {
    await this.runMysql(`insert into PCROOM (nickname, seatnumber) values ('${nickname}', ${seatNumber})`);
    await this.runMysql(`update PCSEAT set in_use = '1' where seatnumber = ${seatNumber}`);
  }

  getUserSeat = async (nickname) => {
    return await this.runMysql(`select seatnumber from PCROOM where nickname = '${nickname}'`);
  }

  getNowDate() {
    const date = new Date();
    const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    const [hours, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  quitUser = async (nickname) => {
    const userSeat = await this.getUserSeat();
    await this.runMysql(`update PCSEAT set in_use = '0' where seatnumber = ${userSeat}`);
    await this.runMysql(`update PCROOM set endtime = '${this.getNowDate()}' where nickname = '${nickname}'`);
  }

  getLastUserKey = async () => {
    return await this.runMysql(`select MAX(id) from PCROOM`);
  }
}

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
      db.end();
      process.exit();
    })
  }
}