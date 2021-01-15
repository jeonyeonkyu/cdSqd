class View {
  constructor(locationArray, max) {
    this.locationArray = [...locationArray].sort((a, b) => a.x - b.x);
    this.MAX = max;
  }

  drawTable() {
    this.drawVertical();
    this.drawHorizontal();
  }

  drawVertical() {
    let drawTemplate = '';
    let drawLine = '';
    for (let i = this.MAX; i > 0; i--) {
      let vertical = i % 2 ? '  ' : i;
      let blank = i < 10 && i % 2 === 0 ? ' ' : '';
      drawLine = `${blank}${vertical} |                                                                        `;
      let choiceArray = this.locationArray.filter(element => element.y === i);
      if (choiceArray.length) {
        choiceArray.forEach(element => {
          let drawLineArray = drawLine.split('');
          drawLineArray[element.x*3+3] = '●';
          drawLine = drawLineArray.join('');
        })
      }
      drawTemplate += drawLine;
      if (i === 1) break;
      drawTemplate += '\n';
    }
    console.log(drawTemplate);
  }

  drawHorizontal() {
    let drawLine = '   ┼';
    for (let i = 0; i < this.MAX; i++) {
      drawLine += ' ──';
    }
    let drawNumber = ' 0 　 　 ';
    for (let i = 2; i <= this.MAX; i += 2) {
      drawNumber += `${i}　  `
      drawNumber += i < 8 ? ' ' : '';
    }
    console.log(drawLine);
    console.log(drawNumber);
  }

}

module.exports = View;