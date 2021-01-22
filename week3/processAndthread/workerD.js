const { parentPort } = require('worker_threads');
const processD = { name: 'D', state: 'ready', count: 0, target: 11 };

parentPort.on('message', (msg) => {
  if (processD.count === processD.target) {
    processD.state = 'terminate';
    parentPort.postMessage(`${processD.name},${processD.state},${processD.count},${processD.target}`);
    return;
  }

  if (msg.count === 1) {
    processD.count += msg.count;
    processD.state = 'running';
    parentPort.postMessage(`${processD.name},${processD.state},${processD.count},${processD.target}`);
    processD.state = 'waiting';
    return;
  }

  parentPort.postMessage(`${processD.name},${processD.state},${processD.count},${processD.target}`);
});
