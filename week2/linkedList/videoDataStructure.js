const uniqueIdGenerator = require('./UniqueIdGenerator.js');
const titleGenerator = require('./TitleGenerator.js');

const getPlayTime = () => {
  return Math.ceil(Math.random() * 10) + Math.round(Math.random() * 5);
}

function MyVideoList({ uniqueIdGenerator, titleGenerator }) {
  this.id = uniqueIdGenerator.getUniqueId();
  this.head = null;
  this.next = null;
  this.title = titleGenerator.getTitle();
  this.playTime = getPlayTime();

  this.printInformation = function () {
    console.log(`${this.title}(${this.id}):${this.playTime}`);
  }
}

const myVideoList1 = new MyVideoList({ uniqueIdGenerator, titleGenerator });
const myVideoList2 = new MyVideoList({ uniqueIdGenerator, titleGenerator });
const myVideoList3 = new MyVideoList({ uniqueIdGenerator, titleGenerator });
const myVideoList4 = new MyVideoList({ uniqueIdGenerator, titleGenerator });
const myVideoList5 = new MyVideoList({ uniqueIdGenerator, titleGenerator });
const myVideoList6 = new MyVideoList({ uniqueIdGenerator, titleGenerator });
const myVideoList7 = new MyVideoList({ uniqueIdGenerator, titleGenerator });
const myVideoList8 = new MyVideoList({ uniqueIdGenerator, titleGenerator });
const myVideoList9 = new MyVideoList({ uniqueIdGenerator, titleGenerator });
const myVideoList10 = new MyVideoList({ uniqueIdGenerator, titleGenerator });
const myVideoList11 = new MyVideoList({ uniqueIdGenerator, titleGenerator });
const myVideoList12 = new MyVideoList({ uniqueIdGenerator, titleGenerator });
const myVideoList13 = new MyVideoList({ uniqueIdGenerator, titleGenerator });

myVideoList1.printInformation();
myVideoList2.printInformation();
myVideoList3.printInformation();
myVideoList4.printInformation();
myVideoList5.printInformation();
myVideoList6.printInformation();
myVideoList7.printInformation();
myVideoList8.printInformation();
myVideoList9.printInformation();
myVideoList10.printInformation();
myVideoList11.printInformation();
myVideoList12.printInformation();
myVideoList13.printInformation();