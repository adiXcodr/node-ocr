<h1 align="center" >NODE OCR</h1>
<h3 align="center"> A Rest API solution for Optical Character Recognition.</h3>

## Technologies used
* NodeJS
* ExpressJS
* TesseractJS

### Installing depencencies and running the app
* Fork the repository
* Clone the repository
* Install the dependencies by `npm install`
* Run in development mode by `npm run start`

### How to access the API

* In PostMan, set request to POST and add `Content-Type:application/json` in the request header.
* To generate API Key, Set the URL TO `http://localhost:3000/generate`

INPUT:
```json
    {   
        "name":"Enter your name here",
        "email":"asdasdasd@gmail.com"
    }
```
The result will contain a unique API key.

* Set the URL TO `http://localhost:3000/api`

INPUT:
```json
    {   
        "api_key":"Enter API key for successfull operation",
        "image_url":"asdasdasd@gmail.com"
    }
```
The result will contain the text present in the image.

<br>

### Communication

#### [Slack](https://join.slack.com/t/newworkspace-yuv8502/shared_invite/zt-jrecfmpd-0vICt10cN_4vDMiGavNB8w)


### Author

#### [Adittya Dey](https://github.com/adiXcodr)

<!-- "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client" -->