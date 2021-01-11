class MyVideoList {
  constructor() {
    this.head = null;
    this.next = null;
  }
}

const getPlayTime = () => {
  return Math.ceil(Math.random() * 10) + Math.round(Math.random() * 5);
}
