class TitleGenerator {
  constructor() {
    this.count = 0;
  }

  getTitle() {
    return `제목${++this.count}`;
  }
}

const titleGenerator = new TitleGenerator();
module.exports = titleGenerator;