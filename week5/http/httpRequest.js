const dns = require('dns');
const net = require('net');
const { log } = console;

class HttpRequest {
  constructor(method = 'GET') {
    this.method = method;
  }

  getMessage(address) {
    return `${this.method} / HTTP/1.1\r\nHost: ${address}\r\n\r\n`;
  }
}

class Socket {
  constructor(address, port = 80, request) {
    this.address = address;
    this.port = port;
    this.socket = new net.Socket();
    this.request = request;
  }

  init() {
    this.connect();
    this.takeData();
  }

  connect() {
    this.socket.connect({ port: this.port, host: this.address }, () => {
      log('(DNS Lookup...)');
      log(`TCP Connection: ${this.address} 80`);
    })
    this.write();
  }

  write() {
    this.socket.write(`${this.request.getMessage(this.address)}`);
  }

  takeData() {
    this.socket.on('data', (data) => {
      console.log(data.toString());
    })
  }
}

const run = (url) => {
  dns.lookup(url, (err, address) => {
    if (err) throw err;
    const request = new HttpRequest();
    const socket = new Socket(address, 80, request);
    socket.init();
  });
}

run('www.kyobobook.co.kr');

