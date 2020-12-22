const { createWorker } = require('tesseract.js');
const worker = createWorker({
    logger: m => console.log(m), 
  });
const Data = require('../model/data');

async function doOCR(image_url){
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const { data: { text } } = await worker.recognize(image_url);
    console.log(text);
    await worker.terminate();
    return(text);
};

async function searchKey(key){
    const data = await Data.findOne({ key });
    if (data) {
      console.log(data);
      return true;
    } else {
      return false;
    }
}

module.exports.doOCR = doOCR;
module.exports.searchKey = searchKey;