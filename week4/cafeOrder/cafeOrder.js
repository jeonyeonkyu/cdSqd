//주문 캐셔에게 이동
//캐셔 받은 주문을 주문 대기표에 추가 
//매니저 주문 대기표를 1초마다 확인, 바리스타의 음료제작상태 확인 후 전달 1초에 끝남과 동시에 바리스타에게 전달해야될듯
//바리스타 동시에 2개까지 음료 만들수 잇음 음료 만들기 시작, 음료만들기 끝 에대한 이벤트
//현황판 음료가 대기중인지 제작중인지 완료인지 출력 < 매니저가 확인해야할듯

const EventEmitter = require('events');
const emitter = new EventEmitter();

class OrderWaitingTable { //queue테이블
  constructor() {
    this.list = [];
  }

  add(data) {
    this.list.push(data);
  }

  delete() {
    this.list.shift();
  }

  getList() {
    return [...this.list];
  }
}

class Cashier {
  constructor(orderWaitingTable) {
    this.table = orderWaitingTable;
  }

  init() {
    this.addToOrderList();
  }

  addToOrderList() {
    emitter.on('order', (customerNumber, drinkType, drinkCount) => {
      const orderDetails = { customerNumber, drinkType, drinkCount };
      this.table.add(orderDetails);
    })
  }


}

class Manager {
  constructor() {

  }
}

class DashBoard {
  constructor() {

  }
}

class Barista {
  constructor() {

  }
}

class OrderModule {
  constructor() {
    this.readline = require('readline');
    this.rl = this.readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.customerNumber = 0;
  }

  init() {
    console.log('>메뉴  =  1. 아메리카노(3s)    2. 카페라떼(5s)    3. 프라프치노(10s)');
    console.log('> 주문할 음료를 입력하세요. 예) 아메리카노 2개 => 1:2');
    this.rl.setPrompt('입력> ');
    this.rl.prompt();
    this.receiveInput();
    this.closeModule();
  }

  receiveInput() { //입력받은 문자열 읽기
    this.rl.on("line", (line) => {
      const [drinkType, drinkCount] = line.split(':').map(Number);
      emitter.emit('order', ++this.customerNumber, drinkType, drinkCount);
      this.rl.prompt();
      // this.rl.close();
    })
  }

  closeModule() { //모듈 종료
    this.rl.on("close", () => {
      process.exit();
    })
  }
}

const orderWaitingTable = new OrderWaitingTable();
const cashier = new Cashier(orderWaitingTable);
cashier.init();
const orderModule = new OrderModule();
orderModule.init();