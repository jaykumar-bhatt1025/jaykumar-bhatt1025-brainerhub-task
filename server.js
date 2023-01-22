const express = require('express');
const bp = require('body-parser');
require('dotenv').config()

const app = express();

const port = process.env.PORT || 8080;

app.use(bp.urlencoded({extended:true}));

app.use(require('./controller/routes'));

app.listen(port,() => {
    console.log(`App Running on www.localhost:${port}`);
})