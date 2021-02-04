const inputFile = document.getElementById('csv_file');

inputFile.addEventListener('change', async (event) => {
  const data = await loadFile(event.target);
  const peopleList = dataAdaptor(data).map(person => new People(person));
  const model = new Model(peopleList);
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


}

class People {
  constructor(person) {
    this.name = person[0];
    this.age = person[1];
    this.fruit = person[2];
    this.game = person[3];
  }
}