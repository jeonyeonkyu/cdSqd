const uniqueIdGenerator = require('./UniqueIdGenerator.js');
const titleGenerator = require('./TitleGenerator.js');

class MyVideoData {
  constructor({ uniqueIdGenerator, titleGenerator }) {
    this.id = uniqueIdGenerator.getUniqueId();
    this.title = titleGenerator.getTitle();
    this.playTime = this.getPlayTime();
  }

  getPlayTime() {
    return Math.ceil(Math.random() * 10) + Math.round(Math.random() * 5);
  }

  printInformation = function () {
    console.log(`${this.title}(${this.id}):${this.playTime}`);
  }
}

const myVideoData1 = new MyVideoData({ uniqueIdGenerator, titleGenerator });
const myVideoData2 = new MyVideoData({ uniqueIdGenerator, titleGenerator });
const myVideoData3 = new MyVideoData({ uniqueIdGenerator, titleGenerator });
const myVideoData4 = new MyVideoData({ uniqueIdGenerator, titleGenerator });
const myVideoData5 = new MyVideoData({ uniqueIdGenerator, titleGenerator });
const myVideoData6 = new MyVideoData({ uniqueIdGenerator, titleGenerator });
const myVideoData7 = new MyVideoData({ uniqueIdGenerator, titleGenerator });
const myVideoData8 = new MyVideoData({ uniqueIdGenerator, titleGenerator });
const myVideoData9 = new MyVideoData({ uniqueIdGenerator, titleGenerator });
const myVideoData10 = new MyVideoData({ uniqueIdGenerator, titleGenerator });
const myVideoData11 = new MyVideoData({ uniqueIdGenerator, titleGenerator });
const myVideoData12 = new MyVideoData({ uniqueIdGenerator, titleGenerator });
const myVideoData13 = new MyVideoData({ uniqueIdGenerator, titleGenerator });

myVideoData1.printInformation();
myVideoData2.printInformation();
myVideoData3.printInformation();
myVideoData4.printInformation();
myVideoData5.printInformation();
myVideoData6.printInformation();
myVideoData7.printInformation();
myVideoData8.printInformation();
myVideoData9.printInformation();
myVideoData10.printInformation();
myVideoData11.printInformation();
myVideoData12.printInformation();
myVideoData13.printInformation();