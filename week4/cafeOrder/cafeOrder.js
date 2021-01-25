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
    emitter.on('takeOrder', (customerNumber, drinkType, drinkCount) => {
      const orderDetails = { customerNumber, drinkType, drinkCount, checked: false };
      this.table.add(orderDetails);
    })
  }
}

class Manager {
  constructor(orderWaitingTable, barista) {
    this.table = orderWaitingTable;
    this.barista = barista;
  }

  init() {
    this.orderStatusCheck();
  }

  orderStatusCheck() {
    const self = this;
    let timeId = setTimeout(function tick() {
      const newOrder = self.table.list.filter(order => order.checked === false);
      if (!newOrder) {
        timeId = setTimeout(tick, 1000);
        return;
      }
      for (let i = self.barista.work.length, j = 0; i < 2 && newOrder[j]; i++, j++) {
        self.barista.work.push(newOrder[j]);
        newOrder[j].checked = true;
      }
      timeId = setTimeout(tick, 1000);
    }, 1000)
  }

}

class DashBoard {
  constructor() {

  }
}

class Barista {
  constructor() {
    this.work = [];
    this.drinkMakeTime = { 1: 3, 2: 5, 3: 10 };
    this.drinkKinds = ['아메리카노', '카페라떼', '프라프치노'];
  }

  init() {
    this.doWork();
  }
  doWork() {
    const self = this;
    let timeId = setTimeout(function tick() {
      self.work.forEach(item => {
        console.log(item);
        if (!item.progress) {
          item.progress = 0;
          self.printMakeStart(item.drinkType);
        }
        item.progress++;
        if (self.drinkMakeTime[item.drinkType] === item.progress) {
          self.printMakeEnd(item.drinkType);
        }
      })
      timeId = setTimeout(tick, 1000);
    })
  }

  printMakeStart(drinkType) {
    console.log(`${this.drinkKinds[drinkType - 1]} 시작`);
  }

  printMakeEnd(drinkType) {
    console.log(`${this.drinkKinds[drinkType - 1]} 완성`);
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
      emitter.emit('takeOrder', ++this.customerNumber, drinkType, drinkCount);
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
const barista = new Barista();
const manager = new Manager(orderWaitingTable, barista);
manager.init();
barista.init();
const orderModule = new OrderModule();
orderModule.init();
