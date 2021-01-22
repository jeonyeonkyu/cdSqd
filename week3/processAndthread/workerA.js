const { parentPort } = require('worker_threads');
const processA = { name: 'A', state: 'ready', count: 0, target: 3 };

parentPort.on('message', (msg) => {
  if (processA.count === processA.target) {
    processA.state = 'terminate';
    parentPort.postMessage(`${processA.name},${processA.state},${processA.count},${processA.target}`);
    return;
  }

  if (msg.count === 1) {
    processA.count += msg.count;
    processA.state = 'running';
    parentPort.postMessage(`${processA.name},${processA.state},${processA.count},${processA.target}`);
    processA.state = 'waiting';
    return;
  }

  parentPort.postMessage(`${processA.name},${processA.state},${processA.count},${processA.target}`);
});
