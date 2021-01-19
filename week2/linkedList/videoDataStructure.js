const uniqueIdGenerator = require('./UniqueIdGenerator.js');
const titleGenerator = require('./TitleGenerator.js');
const MyVideoData = require('./MyVideoData.js');
const videoListGenerator = require('./VideoListGenerator');
const InputModule = require('./InputModule.js');

const myVideoList = [];
for (let i = 0; i < 13; i++) {
  myVideoList.push(new MyVideoData({ uniqueIdGenerator, titleGenerator }));
}
console.log('---영상 클립---');
myVideoList.forEach(videoData => {
  videoData.printInformation();
});

const inputModule = new InputModule({ videoListGenerator, myVideoList });
inputModule.init();