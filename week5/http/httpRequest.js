const dns = require('dns');
const net = require('net');
const { log } = console;
const socket = new net.Socket();


class HttpRequest {
  constructor(url) {
    this.url = url;
  }
}

class Header {
  constructor() {

  }
}

dns.lookup('www.disney.co.kr', (err, address) => {
  if (err) {
    log(err);
    return;
  }
  log(address);
  socket.connect({ port: 80, host: address }, () => {
    log('(DNS Lookup...)');
    log(`TCP Connection: ${address} 80`);
    socket.write(`GET / HTTP/1.1\r\nHost: ${address}\r\n\r\n`);
  })

  socket.on('data', (data) => {//data 이벤트 발생시 callback
    console.log(data.toString());
    console.log(11)
    process.exit();
  });

});