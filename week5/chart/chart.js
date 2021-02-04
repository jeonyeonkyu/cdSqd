const inputFile = document.getElementById('csv_file');

inputFile.addEventListener('change', async (event) => {
  const data = await loadFile(event.target);
  const peopleList = dataAdaptor(data).map(person => new People(person));
  const model = new Model(peopleList);
  console.log(model.getDividedCategoryCount(model.people, 'game'))
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
  return peopleData.slice(2).map((item) => item.split(','));
}

class Model {
  constructor(people) {
    this.people = people;
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

}

class People {
  constructor(person) {
    this.name = person[0];
    this.age = person[1];
    this.fruit = person[2];
    this.game = person[3];
  }
}