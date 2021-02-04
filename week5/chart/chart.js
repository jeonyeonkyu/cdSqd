const inputFile = document.getElementById('csv_file');

inputFile.addEventListener('change', async (event) => {
  const data = await loadFile(event.target);
  const model = new Model(dataAdaptor(data));
  console.log(model.getDataLength(model.people));
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
  const title = peopleData[0].replace(' ', '').split(',');
  return peopleData.slice(2).map((item) => {
    const personData = item.split(',');
    const person = {};
    for (let i = 0; i < title.length; i++) {
      person[title[i]] = personData[i];
    }
    return person;
  });
}

class Model {
  constructor(people) {
    this.people = people;
  }

  getDataLength(people) {
    return Object.keys(people[0]).length;
  }
}
