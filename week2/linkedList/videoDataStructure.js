const uniqueIdGenerator = require('./UniqueIdGenerator.js');
const titleGenerator = require('./TitleGenerator.js');

const getPlayTime = () => {
  return Math.ceil(Math.random() * 10) + Math.round(Math.random() * 5);
}

function MyVideo({ uniqueIdGenerator, titleGenerator }) {
  this.id = uniqueIdGenerator.getUniqueId();
  this.title = titleGenerator.getTitle();
  this.playTime = getPlayTime();

  this.printInformation = function () {
    console.log(`${this.title}(${this.id}):${this.playTime}`);
  }
}

const myVideo1 = new MyVideo({ uniqueIdGenerator, titleGenerator });
const myVideo2 = new MyVideo({ uniqueIdGenerator, titleGenerator });
const myVideo3 = new MyVideo({ uniqueIdGenerator, titleGenerator });
const myVideo4 = new MyVideo({ uniqueIdGenerator, titleGenerator });
const myVideo5 = new MyVideo({ uniqueIdGenerator, titleGenerator });
const myVideo6 = new MyVideo({ uniqueIdGenerator, titleGenerator });
const myVideo7 = new MyVideo({ uniqueIdGenerator, titleGenerator });
const myVideo8 = new MyVideo({ uniqueIdGenerator, titleGenerator });
const myVideo9 = new MyVideo({ uniqueIdGenerator, titleGenerator });
const myVideo10 = new MyVideo({ uniqueIdGenerator, titleGenerator });
const myVideo11 = new MyVideo({ uniqueIdGenerator, titleGenerator });
const myVideo12 = new MyVideo({ uniqueIdGenerator, titleGenerator });
const myVideo13 = new MyVideo({ uniqueIdGenerator, titleGenerator });

myVideo1.printInformation();
myVideo2.printInformation();
myVideo3.printInformation();
myVideo4.printInformation();
myVideo5.printInformation();
myVideo6.printInformation();
myVideo7.printInformation();
myVideo8.printInformation();
myVideo9.printInformation();
myVideo10.printInformation();
myVideo11.printInformation();
myVideo12.printInformation();
myVideo13.printInformation();