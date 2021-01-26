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
    emitter.on('takeOrder', (customerNumber, drinkType, drinkCount, totalCount) => {
      const orderDetails = { customerNumber, drinkType, drinkCount, totalCount, checked: false };
      this.table.add(orderDetails);
    })
  }

}

class Manager {
  constructor(orderWaitingTable, baristas) {
    this.table = orderWaitingTable;
    this.baristas = baristas;
    this.waitingDrink = [];
    this.finishOneOrder = [];
  }

  init() {
    this.orderStatusConfirm();
    this.takeBaristaMade();
  }

  takeBaristaMade() {
    emitter.on('finishOne', oneDrink => {
      this.finishOneOrder.push(oneDrink);
      const finishDrink = this.finishOneOrder
        .filter(item => item.customerNumber === oneDrink.customerNumber);
      if (finishDrink.length !== finishDrink[0].totalCount) return;
      for (let i = 0; i < this.finishOneOrder.length; i++) {
        if (this.finishOneOrder[i].customerNumber === oneDrink.customerNumber) {
          this.finishOneOrder.splice(i, 1);
          i--;
        }
      }
      const finishOrder = this.table.list.filter(order => order.customerNumber === oneDrink.customerNumber);
      finishOrder.forEach(item => item.complete = true);
      this.dashBoardUpdate(finishOrder);
    })
  }

  orderStatusConfirm() {
    const self = this;
    let timeId = setTimeout(function tick() {
      self.newOrderConfirm();
      if (!self.waitingDrink) {
        timeId = setTimeout(tick, 1000);
        return;
      }
      self.doWorkCallBaristas();
      timeId = setTimeout(tick, 1000);
    }, 1000)
  }

  doWorkCallBaristas() {
    this.baristas.forEach(barista => {
      for (let i = barista.work.length; i < 2 && this.waitingDrink[0]; i++) {
        barista.work.push({
          customerNumber: this.waitingDrink[0].customerNumber,
          drinkType: this.waitingDrink[0].drinkType,
          drinkCount: this.waitingDrink[0].drinkCount,
          totalCount: this.waitingDrink[0].totalCount
        });
        this.inProduction(this.waitingDrink[0].customerNumber);
        this.waitingDrink.shift();
      }
    })
  }

  inProduction(nowCustomerNumber) {
    const nowOrder = this.table.list.find(order => order.customerNumber === nowCustomerNumber);
    nowOrder.production = true;
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

  dashBoardUpdate(finishOrder) {
    emitter.emit('dashBoardUpdate', finishOrder);
  }
}

class DashBoard {
  constructor(orderWaitingTable) {
    this.table = orderWaitingTable;
    this.drinkKinds = [, '아메리카노', '카페라떼', '프라프치노'];
  }

  init() {
    this.callCustomer();
    this.show();
  }

  callCustomer() {
    emitter.on('dashBoardUpdate', (list) => {
      const customerNumber = list[0].customerNumber;
      const totalCount = list[0].totalCount;
      console.log(`${customerNumber} 손님~ 주문하신 음료 ${totalCount}잔~ 나왔습니다~`);
    })
  }

  show() {
    const self = this;
    let timeId = setTimeout(function tick() {
      console.log('###############   현     황     판 ################')
      console.log(`┌──────────┬───────────┬───────────┬──────────────┐`);
      console.log(`│ (number) │  (order)  │  (count)  │   (status)   │`);
      console.log(`├──────────┼───────────┼───────────┼──────────────┤`);
      self.table.list.forEach((item) => {
        console.log(`│    ${item.customerNumber}     │ ${self.drinkKinds[item.drinkType]}│     ${item.drinkCount}     │     ${item.complete ? '완료' : item.production ? '제작' : '대기'}     │`);
      });
      console.log(`└──────────┴───────────┴───────────┴──────────────┘`);

      timeId = setTimeout(tick, 5000);
    }, 5000)
  }
}

class Barista {
  constructor(name) {
    this.name = name;
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
      if (!item.progress) {
        item.progress = 0;
        console.log(`바리스타${this.name}-${item.customerNumber}${this.drinkKinds[item.drinkType]} 시작`);
      }
      item.progress++;
    })
  }

  makeEnd() {
    for (let i = 0; i < this.work.length; i++) {
      if (this.drinkMakeTime[this.work[i].drinkType] === this.work[i].progress) {
        console.log(`바리스타${this.name}-${this.work[i].customerNumber}${this.drinkKinds[this.work[i].drinkType]} 완성`);
        this.informDone(this.work[i]);
        this.work.splice(i, 1);
        i--;
      }
    }
  }

  informDone(oneDrink) {
    emitter.emit('finishOne', oneDrink);
  }
}

class OrderModule {
  constructor() {
    this.readline = require('readline');
    this.rl = this.readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  init() {
    console.log('>메뉴  =  1. 아메리카노(3s)    2. 카페라떼(5s)    3. 프라프치노(10s)');
    console.log('고객별로 주문할 음료 개수를 입력하세요. 예) A고객, 아메리카노 2개, 프라프치노 1개 => A, 1:2, 3:1');
    this.rl.setPrompt('입력> ');
    this.rl.prompt();
    this.receiveInput();
    this.closeModule();
  }

  receiveInput() { //입력받은 문자열 읽기
    this.rl.on("line", (line) => {
      const input = line.split(', ');
      const customerNumber = input.shift();
      const totalCount = input.reduce((acc, cur) => acc + Number(cur.slice(-1)), 0);
      input.forEach(item => {
        const [drinkType, drinkCount] = item.split(':').map(Number);
        emitter.emit('takeOrder', customerNumber, drinkType, drinkCount, totalCount);
      })
      // this.rl.close();
    })
  }

  closeModule() { //모듈 종료
    this.rl.on("close", () => {
      process.exit();
    })
  }
}

const makeBaristas = (num) => {
  return Array.from({ length: num }, (_, i) => new Barista(i + 1));
}

const orderWaitingTable = new OrderWaitingTable();
const cashier = new Cashier(orderWaitingTable);
cashier.init();
const baristas = makeBaristas(4);
baristas.forEach(e => e.init());
const manager = new Manager(orderWaitingTable, baristas);
manager.init();
const dashBoard = new DashBoard(orderWaitingTable);
dashBoard.init();
const orderModule = new OrderModule();
orderModule.init();