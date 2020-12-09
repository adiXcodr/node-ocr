var express = require('express');
var router = express.Router();
const isImageURL = require('image-url-validator');
const { createWorker } = require('tesseract.js');
const worker = createWorker({
  logger: m => console.log(m), // Add logger here
});
var fs = require("fs");
var crypto = require("crypto");
let jsonData=require('../api_data.json');

async function doOCR(image_url){
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  
  const { data: { text } } = await worker.recognize(image_url);
  console.log(text);
  await worker.terminate();
  return(text);
};

function searchKey(key){
  if(!jsonData || jsonData.length<1){
    return(false);
  }
  else{
    let obj = jsonData.find(o => o.key === key);
    console.log(obj);
    if(!obj)
      return(false);
    else
      return(true);
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({status:'Success',data:[]});
});

/* Key Generation */
router.route('/generate')
.get((req,res,next) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        result="Please Do Post Here with 'name' and 'email' ";
        res.json({status:'Failure',data:result});
})
.post(async (req, res, next) => {
        req.props = Object.assign(req.query, req.params, req.body);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        let result='';
        console.log(req.props);
        if(req.props.name && req.props.email && req.props.name!='' && req.props.email!=''){
          let key=crypto.randomBytes(10).toString('hex');
          let data={
            name:req.props.name,
            email:req.props.email,
            key:key
          };
          if(!jsonData || jsonData.length<1)
            jsonData=[];
          if (jsonData.filter(x => x.email === req.props.email).length > 0)
            return res.json({ status: 'Failure', data: 'E-mail already exists.' });
          jsonData.push(data);
          fs.writeFileSync('api_data.json', JSON.stringify(jsonData));
          result=key;
          res.json({status:'Success',data:result});
        }
        else{
          result='name or email error';
          res.json({status:'Failure',data:result});
        }
});

/* API */
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
        if(searchKey(req.props.api_key)){

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
