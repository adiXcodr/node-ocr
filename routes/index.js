var express = require('express');
var router = express.Router();
const isImageURL = require('image-url-validator');
const { createWorker } = require('tesseract.js');
const worker = createWorker({
  logger: m => console.log(m), // Add logger here
});

var api_key='hello9999';

async function doOCR(image_url){
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  
  const { data: { text } } = await worker.recognize(image_url);
  console.log(text);
  await worker.terminate();
  return(text);
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({status:'Success',data:[]});
});

/* POST API */
router.route('/api')
.get((req,res,next) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        result="Please Do Post Here with 'api_key' and image_url";
        res.json({status:'Failure',data:result});
})
.post(async (req, res, next) => {
        req.props = Object.assign(req.query, req.params, req.body);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        let result='';
        console.log(req.props);
        if(req.props.api_key==api_key){

            if(await isImageURL(req.props.image_url)){
                result=await doOCR(req.props.image_url);
                res.json({status:'Success',data:result});
            }
            else{
                result='Invalid Image';
                res.json({status:'Failure',data:result});
            }
          
        }
        else{
          result='Invalid Key';
          res.json({status:'Failure',data:result});
        }
});

module.exports = router;
