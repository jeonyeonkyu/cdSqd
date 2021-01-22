const { Worker } = require('worker_threads');

const workerA = new Worker('./workerA.js');
const workerB = new Worker('./workerB.js');
const workerC = new Worker('./workerC.js');
const workerD = new Worker('./workerD.js');

class Model {
  constructor(workerA, workerB, workerC, workerD) {
    this.threadArray = [workerA, workerB, workerC, workerD];
    this.workStuff = { count: 1 };
    this.waitStuff = { count: 0 };
    this.workCount = -1;
  }

  cutRandomThreadArray(count) {
    const randomNumber = Math.floor(Math.random() * count);
    this.threadArray.splice(randomNumber, 1);
  }

  getThreadArray() {
    return [...this.threadArray];
  }

  getReady() {
    this.threadArray[0].postMessage(this.waitStuff);
    this.threadArray[1].postMessage(this.waitStuff);
    this.threadArray[2].postMessage(this.waitStuff);
  }

  getWaiting(index) {
    this.threadArray[index].postMessage(this.waitStuff);
  }

  doWork(index) {
    this.threadArray[index].postMessage(this.workStuff);
  }

  getWorkersMessage(index) {
    return new Promise(resolve => {
      this.threadArray[index].on('message', resolve);
    });
  }
}

class View {
  constructor(model) {
    this.model = model;
    this.finishSet = new Set();
  }

  init() {
    this.model.getReady();
    this.printFormatWorker(0);
    this.printFormatWorker(1);
    this.printFormatWorker(2);
    this.render();
  }

  render() {
    const self = this;
    let timeId = setTimeout(function tick() {
      if (self.finishSet.size === 3) {
        console.log('프로세스 종료');
        process.exit();
        return;
      }
      const index = self.getIndexWithWork();
      console.log('.');
      self.model.doWork(index);
      self.printFormatWorker(index);

      if (index === 0) {
        self.model.getWaiting(1);
        self.printFormatWorker(1);
        self.model.getWaiting(2);
        self.printFormatWorker(2);
      } else if (index === 1) {
        self.model.getWaiting(0);
        self.printFormatWorker(0);
        self.model.getWaiting(2);
        self.printFormatWorker(2);
      } else if (index === 2) {
        self.model.getWaiting(0);
        self.printFormatWorker(0);
        self.model.getWaiting(1);
        self.printFormatWorker(1);
      }

      timeId = setTimeout(tick, 1000);
    }, 1000)
  }

  printFormatWorker(index) {
    this.model.getWorkersMessage(index).then(v => {
      const [name, state, count, target] = v.split(',');
      console.log(`${name}(${state}), ${count} / ${target}sec`);
      if (state === 'terminate') {
        this.finishSet.add(name);
      }
    });
  }

  getIndexWithWork() {
    let index = ++this.model.workCount % 3;
    if (this.finishSet.size === 1) {
      index = this.model.workCount % 2 + 1
    } else if (this.finishSet.size === 2) {
      index = 2;
    }
    return index;
  }
}

const model = new Model(workerA, workerB, workerC, workerD);
model.cutRandomThreadArray(3);

const view = new View(model);
view.init();

