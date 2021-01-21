const { Worker, isMainThread } = require('worker_threads');

const workerA = new Worker('./workerA.js');
const workerB = new Worker('./workerB.js');
const workerC = new Worker('./workerC.js');
const workerD = new Worker('./workerD.js');
console.log('isMainThread:', isMainThread); // true

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

  doWork() {
    Object.keys(this.threadArray[0]).postMessage(this.workStuff);
  }

  // statusLookup() {
  //   workerA.on('message', (msg) => {
  //     //   console.log(msg);
  //     // })
  //   })
  // }
}

class View {
  constructor(model) {
    this.model = model;
  }

  sleep(delay) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + delay);
  }

  render() {

  }
}

const model = new Model(workerA, workerB, workerC, workerD);
model.cutRandomThreadArray(3);
console.log(model.getThreadArray())



// workerA.on('message', (msg) => {
//   console.log(msg);
// });

// workerB.postMessage('message from mainThread');

// workerB.on('message', (msg) => {
//   console.log(msg);
// });
// workerC.on('message', (msg) => {
//   console.log(msg);
// });
// workerD.on('message', (msg) => {
//   console.log(msg);
// });


// process.exit()
