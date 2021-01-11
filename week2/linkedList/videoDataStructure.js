const uniqueIdGenerator = require('./UniqueIdGenerator.js');
const titleGenerator = require('./TitleGenerator.js');
const MyVideoData = require('./MyVideoData.js');
const videoListGenerator = require('./VideoListGenerator');
const InputModule = require('./InputModule.js');

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

const myVideoList = [];
myVideoList.push(myVideoData1, myVideoData2, myVideoData3, myVideoData4,
  myVideoData5, myVideoData6, myVideoData7, myVideoData8, myVideoData9,
  myVideoData10, myVideoData11, myVideoData12, myVideoData13);

console.log('---영상 클립---');
myVideoList.forEach(videoData => {
  videoData.printInformation();
});

const inputModule = new InputModule({ videoListGenerator, myVideoList });
inputModule.init();