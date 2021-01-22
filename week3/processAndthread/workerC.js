const { parentPort } = require('worker_threads');
const processC = { target: 5, count: 0 };

parentPort.on('message', (msg) => {
  processC.count += msg.count;
  if (processC.target === processC.count) {
    console.log('workerC는 끝~');
    parentPort.postMessage('C');
  }
});
