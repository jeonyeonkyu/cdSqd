const { parentPort } = require('worker_threads');
const processB = { target: 3, count: 0 };

parentPort.on('message', (msg) => {
  processB.count += msg.count;
  if (processB.target === processB.count) {
    console.log('workerB는 끝~');
    parentPort.postMessage('B');
  }
});
