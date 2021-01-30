const db = require('./dbConnection.js');
const pcRoom = require('./PcRoom.js');
const { log } = console;
// db.connect();

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

const pcModule = new PcModule(pcRoom);
pcModule.init();