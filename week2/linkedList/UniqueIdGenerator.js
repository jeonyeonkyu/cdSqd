class UniqueIdGenerator {  // 유니크한 아이디 만들기 a~f까지 ex) eafb
  constructor() {
    this.idList = [];
  }

  getRandomId() {
    const alphabetStartNum = 97;
    const id = String.fromCharCode(Math.floor(Math.random() * 6 + alphabetStartNum),
      Math.floor(Math.random() * 6 + alphabetStartNum),
      Math.floor(Math.random() * 6 + alphabetStartNum),
      Math.floor(Math.random() * 6 + alphabetStartNum));
    return id;
  }

  makeId() {
    let id = this.getRandomId();
    for (let i = 0; i < this.idList.length; i++) {
      if (this.idList[i] === id) {
        id = this.getRandomId();
        i = 0;
      }
    }
    this.idList.push(id);
  }

  getUniqueId() {
    this.makeId();
    return this.idList[this.idList.length - 1];
  }
}

const uniqueIdGenerator = new UniqueIdGenerator();
Object.freeze(uniqueIdGenerator);
module.exports = uniqueIdGenerator;