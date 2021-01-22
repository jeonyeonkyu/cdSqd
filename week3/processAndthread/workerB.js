const { parentPort } = require('worker_threads');
const processB = { name: 'B', state: 'ready', count: 0, target: 5 };

parentPort.on('message', (msg) => {
  if (processB.count === processB.target) {
    processB.state = 'terminate';
    parentPort.postMessage(`${processB.name},${processB.state},${processB.count},${processB.target}`);
    return;
  }

  if (msg.count === 1) {
    processB.count += msg.count;
    processB.state = 'running';
    parentPort.postMessage(`${processB.name},${processB.state},${processB.count},${processB.target}`);
    processB.state = 'waiting';
    return;
  }

  parentPort.postMessage(`${processB.name},${processB.state},${processB.count},${processB.target}`);
});
