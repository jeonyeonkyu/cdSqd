class Location{
  get x() {
    return this.xPosition;
  }
  get y() {
    return this.yPosition;
  }
  set x(value) {
    if(value > 24) {
      throw new Error();
    }
    this.xPosition = value;
  }
  set y(value) {
    if(value > 24) {
      throw new Error();
    }
    this.yPosition = value;
  }
}

const useReadLine = () => {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on("line", (line) => {
    rl.close();
  })
  rl.on("close", () => {
    process.exit();
  })
}

const X = new Location();
X.x = 24;