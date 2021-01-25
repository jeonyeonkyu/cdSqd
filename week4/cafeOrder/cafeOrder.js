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
    this.waitingDrink = [];
  }

  init() {
    this.orderStatusConfirm();
  }

  orderStatusConfirm() {
    const self = this;
    let timeId = setTimeout(function tick() {
      self.newOrderConfirm();
      if (!self.waitingDrink) {
        timeId = setTimeout(tick, 1000);
        return;
      }
      for (let i = self.barista.work.length; i < 2 && self.waitingDrink[0]; i++) {
        self.barista.work.push({
          customerNumber: self.waitingDrink[0].customerNumber,
          drinkType: self.waitingDrink[0].drinkType
        });
        self.waitingDrink.shift();
      }
      self.dashBoardUpdate();
      timeId = setTimeout(tick, 1000);
    }, 1000)
  }

  newOrderConfirm() {
    const newOrder = this.table.list.filter(order => order.checked === false);
    newOrder.forEach(item => {
      for (let i = 0; i < item.drinkCount; i++) {
        this.waitingDrink.push(item);
      }
    })
    newOrder.forEach(order => order.checked = true);
  }

  dashBoardUpdate() {
    emitter.emit('dashBoardUpdate', this.table.list);
  }
}

class DashBoard {
  constructor() {
    this.dashBoard = null;
  }

  confirm() {
    emitter.on('dashBoardUpdate', (list) => {
      // console.log(list)
    })
  }

  show() {

  }
}

class Barista {
  constructor() {
    this.work = [];
    this.drinkMakeTime = { 1: 3, 2: 5, 3: 10 };
    this.drinkKinds = [, '아메리카노', '카페라떼', '프라프치노'];
  }

  init() {
    this.doWork();
  }

  doWork() {
    const self = this;
    let timeId = setTimeout(function tick() {
      self.makeStart();
      self.makeEnd();
      timeId = setTimeout(tick, 1000);
    })
  }

  makeStart() {
    this.work.forEach(item => {
      console.log(item)
      if (!item.progress) {
        item.progress = 0;
        console.log(`${this.drinkKinds[item.drinkType]} 시작`);
      }
      item.progress++;
    })
  }

  makeEnd() {
    for (let i = 0; i < this.work.length; i++) {
      if (this.drinkMakeTime[this.work[i].drinkType] === this.work[i].progress) {
        console.log(`${this.drinkKinds[this.work[i].drinkType]} 완성`);
        this.work.splice(i, 1);
        i--;
      }
    }
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
const dashBoard = new DashBoard();
dashBoard.confirm();
const orderModule = new OrderModule();
orderModule.init();
