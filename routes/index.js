var express = require('express');
var router = express.Router();
const isImageURL = require('image-url-validator');

var fs = require("fs");
var crypto = require("crypto");

const Data = require('../model/data');
// let jsonData=require('../api_data.json');
const { doOCR, searchKey } = require('../utilities/utilities')


/* GET home page. */
router.get('/', function(req, res, next) {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({status:'Success',data:[]});
});

/* Key Generation */
router.route('/generate')
.get((req,res,next) => {
        res.statusCode=400; //Bad request 400 as post operation not allowed here
        res.setHeader('Content-Type','application/json');
        result="Please Do Post Here with 'name' and 'email' ";
        res.json({status:'Failure',data:result});
})
.post(async (req, res, next) => {
        req.props = Object.assign(req.query, req.params, req.body);
        res.setHeader('Content-Type','application/json');
        let result='';
        console.log(req.props);
        if(req.props.name && req.props.email && req.props.name!='' && req.props.email!=''){
          let key=crypto.randomBytes(10).toString('hex');
          const emailData = await Data.findOne({
            email: req.props.email
          });
          
          // If Email already exists, return error
          if (emailData) {
            res.statusCode=401; //Unauthorized 401 as the credentials are already in use
            return res.json({ status: 'Failure', data: 'E-mail already exists.' });
          }
          
          const data = new Data({
            name:req.props.name,
            email:req.props.email,
            key
          });
          await data.save();
          res.statusCode=200;
          result = key;
          res.json({status:'Success',data:result});
        }
        else {
          res.statusCode=400; //Not found 404 
          result='name or email error';
          res.json({status:'Failure',data:result});
        }
});

/* API */
router.route('/api')
.get((req,res,next) => {
        res.statusCode=400; //Bad request 400 as post operation not allowed here
        res.setHeader('Content-Type','application/json');
        result="Please Do Post Here with 'api_key' and image_url";
        res.json({status:'Failure',data:result});
})
.post(async (req, res, next) => {
        req.props = Object.assign(req.query, req.params, req.body);
        res.setHeader('Content-Type','application/json');
        let result='';
        console.log(req.props);
        try {
        if( await searchKey(req.props.api_key)){

            if(await isImageURL(req.props.image_url)){
                res.statusCode=200;
                result=await doOCR(req.props.image_url);
                res.json({status:'Success',data:result});
            }
            else{
                res.statusCode=400; //Bad request 400 as image is invalid
                result='Invalid Image';
                res.json({status:'Failure',data:result});
            }
          
        }
        else{
          res.statusCode=400; //Bad request 400 as key is invalid
          result='Invalid Key';
          res.json({status:'Failure',data:result});
        }
      } catch (err) {
        res.statusCode=500; //Internal Error 500 as the server encountered an unexpected condition which prevented it from fulfilling the request.
        result='Internal Server error';
        res.json({status:'Failure',data:result, err});
      }
});

module.exports = router;
