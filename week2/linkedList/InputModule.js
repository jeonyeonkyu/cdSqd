//Node.js 실행 모듈
class InputModule {
  constructor({ videoListGenerator, myVideoList }) {
    this.videoListGenerator = videoListGenerator;
    this.myVideoList = myVideoList;
    this.readline = require('readline');
    this.rl = this.readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.videoController = {
      add: (nodeId) => this.videoListGenerator.addLast(nodeId),
      insert: (nodeId, playTime) => this.videoListGenerator.insert(nodeId, playTime),
      delete: (nodeId) => this.videoListGenerator.deleteFromId(nodeId),
      render: () => this.videoListGenerator.render()
    }
  }

  init() {
    console.log('#######   영상 편집기   #######');
    console.log('~~~ q 입력시 영상편집 종료 ~~~');
    this.rl.setPrompt('> ');
    this.rl.prompt();
    this.receiveInput();
    this.closeModule();
  }

  receiveInput() {
    this.rl.on("line", (line) => {
      if (line.toUpperCase() === 'Q') {
        this.rl.close();
      }
      const inputText = line.split(' ');
      let [statement, id, insertIndex] = [inputText[0], inputText[1], inputText[2]];
      const isExistId = this.myVideoList.some(element => element.id === id);
      if (!isExistId && statement !== 'render') {
        console.log('잘못 입력하셨습니다');
        this.rl.prompt();
        return;
      }
      if (statement !== 'delete') {
        id = this.myVideoList.find(element => element.id === id);
      }
      this.videoController[statement](id, Number(insertIndex));
      this.videoListGenerator.print();
      this.rl.prompt();
    })
  }

  closeModule() {
    this.rl.on("close", () => {
      console.log('#######  영상 편집종료  #######');
      process.exit();
    })
  }
}

module.exports = InputModule;