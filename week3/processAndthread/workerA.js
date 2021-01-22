const { parentPort } = require('worker_threads');
const processA = { target: 1, count: 0 };

parentPort.on('message', (msg) => {
  processA.count += msg.count;
  if (processA.target === processA.count) {
    console.log('workerA는 끝~');
    parentPort.postMessage('A');
  }
});
