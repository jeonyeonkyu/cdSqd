const inputFile = document.getElementById('csv_file');
const $canvas = document.querySelector('#pi_chart_canvas');
const $drawChart = document.querySelector('#draw_chart');
const $age = document.querySelector('#age');
const $fruit = document.querySelector('#fruit');
const $game = document.querySelector('#game');
const $buttonsArea = document.querySelector('#buttons_area');

inputFile.addEventListener('change', async (event) => {
  const data = await loadFile(event.target);
  $drawChart.disabled = false;
  const peopleList = dataAdaptor(data).map(person => new People(person));
  const model = new Model(peopleList);
  const view = new View(model, $canvas, $drawChart, $age, $fruit, $game, $buttonsArea);
  view.initEvent();
})

function loadFile(sender) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', (sender) => {
      let data = sender.target.result;
      data = data.split(/\r\n|\n/);
      resolve(data);
    })
    reader.readAsText(sender.files[0]);
  })
}

function dataAdaptor(peopleData) {
  return peopleData.slice(2).map((item) => item.split(',').map(e => e = e || 'null'));
}

class People {
  constructor(person) {
    this.name = person[0];
    this.age = person[1];
    this.fruit = person[2];
    this.game = person[3];
  }
}

class Model {
  constructor(people) {
    this.people = people;
    this.dataCount = people.length;
    this.ageList = this.etcFormatter(this.getDividedAgeCount(people));
    this.fruitList = this.etcFormatter(this.getDividedCategoryCount(people, 'fruit'));
    this.gameList = this.etcFormatter(this.getDividedCategoryCount(people, 'game'));
  }

  getDividedAgeCount(people) {
    const peopleAge = people.map(item => item.age);
    return peopleAge.reduce((acc, cur) => {
      const key = Math.floor(cur / 10) * 10 + '~' + Math.ceil(cur / 10) * 10;
      acc[key] = acc[key] || 0;
      acc[key] += 1;
      return acc;
    }, {});
  }

  getDividedCategoryCount(people, category) {
    const peopleItem = people.map(item => item[category]);
    return peopleItem.reduce((acc, cur) => {
      acc[cur] = acc[cur] || 0;
      acc[cur] += 1;
      return acc;
    }, {});
  }

  //제일 많은 데이터 5개를 제외한 데이터는 기타(etc)로 바꿔서 포맷
  etcFormatter(categoryCountData) {
    const categoryEntries = Object.entries(categoryCountData).sort((a, b) => b[1] - a[1]);
    const toBeEnteredData = categoryEntries.filter((_, i) => i <= 4)
      .reduce((acc, cur) => {
        acc[cur[0]] = cur[1];
        return acc;
      }, {});
    const etcData = categoryEntries.filter((_, i) => i > 4)
      .reduce((acc, cur) => {
        acc['etc'] = acc['etc'] || 0;
        acc['etc'] += cur[1];
        return acc;
      }, {});
    return { ...toBeEnteredData, ...etcData };
  }
}

class View {
  colors = ['#ff6b6b', '#cc5de8', '#845ef7', '#22b8cf', '#20c997', '#ff922b'];
  constructor(model, $canvas, $drawChart, $age, $fruit, $game, $buttonsArea) {
    this.model = model;
    this.ctx = $canvas.getContext('2d');
    this.$drawChart = $drawChart;
    this.$age = $age;
    this.$fruit = $fruit;
    this.$game = $game;
    this.$buttonsArea = $buttonsArea;
  }

  initEvent() {
    this.$drawChart.addEventListener('click', this.showButtons.bind(this, this.$buttonsArea));
    this.$age.addEventListener('click', this.render.bind(this, this.model.ageList));
    this.$fruit.addEventListener('click', this.render.bind(this, this.model.fruitList));
    this.$game.addEventListener('click', this.render.bind(this, this.model.gameList));
  }

  render(list) {
    this.ctx.clearRect(0, 0, 600, 400);
    let angle = 0;
    let i = 0;
    for (let category in list) {
      const nextAngle = angle + Math.PI * 2 * (list[category] / 100);
      this.ctx.fillStyle = this.colors[i];  //생성되는 부분의 채울 색 설정
      this.ctx.beginPath();
      this.ctx.moveTo(200, 200); //원의 중심으로 이동
      this.ctx.arc(200, 200, 100, angle, nextAngle);
      this.ctx.lineTo(200, 200);
      this.ctx.fill();
      const midAngle = (angle + nextAngle) / 2;
      this.addText(this.ctx, category, `(${list[category]}%)`, this.colors[i++], midAngle);
      angle = nextAngle;
    }
  }

  addText(context, category, rateCount, colors, midAngle) {
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = colors;
    context.font = "12pt Century Gothic";
    context.fillText(category, 200 + Math.cos(midAngle) * 140, 200 + Math.sin(midAngle) * 140);
    context.fillText(rateCount, 200 + Math.cos(midAngle) * 140, 200 + Math.sin(midAngle) * 140 + 20);
  }

  showButtons(buttonArea) {
    buttonArea.setAttribute('style', 'display: inline;');
  }
}