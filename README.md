<h1 align="center" >NODE OCR</h1>
<h3 align="center"> A Rest API for OCR</h3>

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

* Set the URL TO `http://localhost:3000/api` and do POST

INPUT:
```json
    {   
        "api_key":"Enter API key for successfull operation",
        "image_url":"asdasdasd@gmail.com"
    }
```

<br>

### Author

#### [Adittya Dey](https://github.com/adiXcodr)

<!-- "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client" -->