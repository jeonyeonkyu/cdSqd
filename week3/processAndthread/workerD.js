const { parentPort } = require('worker_threads');
const processD = { target: 11, count: 0 };

parentPort.on('message', (msg) => {
  processD.count += msg.count;
  if (processD.target === processD.count) {
    console.log('workerD는 끝~');
    parentPort.postMessage('D');
  }
});
