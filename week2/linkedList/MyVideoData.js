class MyVideoData {
  constructor({ uniqueIdGenerator, titleGenerator }) {
    this.id = uniqueIdGenerator.getUniqueId();
    this.title = titleGenerator.getTitle();
    this.playTime = this.getPlayTime();
  }

  getPlayTime() {
    return Math.ceil(Math.random() * 15);
  }

  printInformation = function () {
    console.log(`${this.title}(${this.id}):${this.playTime}`);
  }
}

module.exports = MyVideoData;