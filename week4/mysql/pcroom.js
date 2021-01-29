const db = require('./dbConnection.js');
const { log } = console;
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

  async getEmptySeats() {
    const seatPacket = await this.runMysql('SELECT seatnumber from PCSEAT where in_use = 0');
    const seatArray = seatPacket.map(e => e.seatnumber);
    return seatArray;
  }

  async getRandomSeats() {
    const seats = await this.getEmptySeats();
    const randomSeatNumber = Math.floor(Math.random() * seats.length);
    return seats[randomSeatNumber];
  }

  async insertNewUser(nickname, seatNumber) {
    await this.runMysql(`insert into PCROOM (nickname, seatnumber) values ('${nickname}', ${seatNumber})`);
    await this.runMysql(`update PCSEAT set in_use = '1' where seatnumber = ${seatNumber}`);
  }

  async getUserSeat(nickname) {
    const seatPacket = await this.runMysql(`select seatnumber from PCROOM where nickname = '${nickname}'`);
    return seatPacket[0].seatnumber;
  }

  getNowDate() {
    const date = new Date();
    const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    const [hours, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  async quitUser(nickname, userSeat) {
    await this.runMysql(`update PCSEAT set in_use = '0' where seatnumber = ${userSeat}`);
    await this.runMysql(`update PCROOM set endtime = '${this.getNowDate()}' where nickname = '${nickname}'`);
  }

  async getLastUserKey() {
    const maxIdPacket = await this.runMysql(`select MAX(id) from PCROOM`);
    return maxIdPacket[0]['MAX(id)'];
  }
}

class PcModule {
  constructor(pcRoom) {
    this.pcRoom = pcRoom;
    this.readline = require('readline');
    this.rl = this.readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async init() {
    log(`ex) 시작시 [new 'nickname'],  종료시 [stop 'nickname']을 입력해주세요`);
    log('빈자리는 다음과 같습니다');
    log(await this.pcRoom.getEmptySeats());
    this.rl.setPrompt('입력> ');
    this.receiveInput();
    this.closeModule();
    this.rl.prompt();
  }

  receiveInput() { //입력받은 문자열 읽기
    this.rl.on("line", async (line) => {
      if (line === 'quit') this.rl.close();
      const [command, nickname] = line.split(' ');
      switch (command) {
        case 'new':
          const seatNumber = await this.pcRoom.getRandomSeats();
          await this.pcRoom.insertNewUser(nickname, seatNumber);
          const userKey = await this.pcRoom.getLastUserKey();
          log(`${seatNumber} 자리에 앉으세요 : #${userKey}`);
          break;
        case 'stop':
          const userSeat = await this.pcRoom.getUserSeat(nickname);
          await this.pcRoom.quitUser(nickname, userSeat);
          log(`이제 ${userSeat} 자리가 비었습니다.`);
          break;
      }
      log(`${await this.pcRoom.getEmptySeats()}`);
      this.rl.prompt();
    })
  }

  closeModule() { //모듈 종료
    this.rl.on("close", () => {
      log('pc방 영업종료');
      db.end();
      process.exit();
    })
  }
}

const pcRoom = new PcRoom();
const pcModule = new PcModule(pcRoom);
pcModule.init();