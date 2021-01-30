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

const pcRoom = new PcRoom();
module.exports = pcRoom;