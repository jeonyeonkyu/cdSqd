const { parentPort } = require('worker_threads');
const processC = { name: 'C', state: 'ready', count: 0, target: 7 };

parentPort.on('message', (msg) => {
  if (processC.count === processC.target) {
    processC.state = 'terminate';
    parentPort.postMessage(`${processC.name},${processC.state},${processC.count},${processC.target}`);
    return;
  }

  if (msg.count === 1) {
    processC.count += msg.count;
    processC.state = 'running';
    parentPort.postMessage(`${processC.name},${processC.state},${processC.count},${processC.target}`);
    processC.state = 'waiting';
    return;
  }

  parentPort.postMessage(`${processC.name},${processC.state},${processC.count},${processC.target}`);
});
