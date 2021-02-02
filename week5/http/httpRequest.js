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

  connect() {
    this.socket.connect({ port: this.port, host: this.address }, () => {
      log('(DNS Lookup...)');
      log(`TCP Connection: ${this.address} 80`);
      this.sendMessage();
      this.printRequestMessage();
    })
  }

  sendMessage() {
    this.socket.write(`${this.request.getMessage(this.address)}`);
  }

  takeData() {
    return new Promise(resolve => {
      this.socket.on('data', (data) => {
        resolve(data.toString().split('\r\n\r\n'));
      })
    })
  }

  quit() {
    this.socket.end();
  }

  printRequestMessage() {
    log('---------------------------------------');
    log('|             HTTP REQUEST            |');
    log('---------------------------------------');
    log(this.request.getMessage(this.address));
  }
}

class HttpResponse {
  constructor(responseData) {
    this.header = responseData[0];
    this.body = responseData[1];
  }

  printResponseMessage() {
    log('---------------------------------------');
    log('|         HTTP RESPONSE HEADER        |');
    log('---------------------------------------');
    log(this.header);
    log('---------------------------------------');
    log('|          HTTP RESPONSE BODY         |');
    log('---------------------------------------');
    log(this.body);
  }
}

const run = (url) => {
  dns.lookup(url, async (err, address) => {
    if (err) throw err;
    const request = new HttpRequest();
    const socket = new Socket(address, 80, request);
    socket.connect();
    const response = new HttpResponse(await socket.takeData());
    response.printResponseMessage();
    socket.quit();
  });
}

run('www.kyobobook.co.kr');