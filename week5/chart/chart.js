const inputFile = document.getElementById('csv_file');

inputFile.addEventListener('change', async (event) => {
  const data = await loadFile(event.target);
  const model = new Model(dataAdaptor(data));
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

function dataAdaptor(data) {
  return data.slice(2).map((item) => item.split(','));
}

class Model {
  constructor(data) {

  }
}