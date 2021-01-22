const { Worker } = require('worker_threads');

const workerA = new Worker('./workerA.js');
const workerB = new Worker('./workerB.js');
const workerC = new Worker('./workerC.js');
const workerD = new Worker('./workerD.js');

class Model {
  constructor(workerA, workerB, workerC, workerD) {
    this.threadArray = [{ A: workerA }, { B: workerB }, { C: workerC }, { D: workerD }];
    this.workStuff = { count: 1 };
  }

  cutRandomThreadArray(count) {
    const randomNumber = Math.floor(Math.random() * count);
    this.threadArray.splice(randomNumber, 1);
  }

  getThreadArray() {
    return [...this.threadArray];
  }

  doWork(index) {
    this.threadArray[index][Object.keys(this.threadArray[index])].postMessage(this.workStuff);
  }

  getWorkersMessage() {
    return new Promise(resolve => {
      this.threadArray[index][Object.keys(this.threadArray[index])].on('message', resolve);
    });
  }


}

class View {
  constructor(model) {
    this.model = model;
  }

  render() {

  }
}

const model = new Model(workerA, workerB, workerC, workerD);
// model.cutRandomThreadArray(3);
// console.log(model.getThreadArray())

model.doWork();
// process.exit()
