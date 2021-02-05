const inputFile = document.getElementById('csv_file');

inputFile.addEventListener('change', async (event) => {
  const data = await loadFile(event.target);
  const peopleList = dataAdaptor(data).map(person => new People(person));
  // console.log(peopleList)
  const model = new Model(peopleList);
  console.log(model.etcFormatter(model.getDividedCategoryCount(model.people, 'game')))
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
      const key = Math.floor(cur / 10) * 10;
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
        acc['etc'] = cur[1];
        return acc;
      }, {});
    return { ...toBeEnteredData, ...etcData };
  }
}

class View {
  colors = ['#ff6b6b', '#cc5de8', '#845ef7', '#22b8cf', '#20c997', '#ff922b'];
  constructor(model) {
    this.model = model;
  }

}