const uniqueIdGenerator = require('./UniqueIdGenerator.js');

function MyVideoList(uniqueIdGenerator) {
  this.id = uniqueIdGenerator.getUniqueId();
  this.head = null;
  this.next = null;
}

const getPlayTime = () => {
  return Math.ceil(Math.random() * 10) + Math.round(Math.random() * 5);
}

const myVideoList = new MyVideoList(uniqueIdGenerator);
console.log(myVideoList);