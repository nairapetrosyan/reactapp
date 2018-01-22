const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const initApi = require('./routes');
const todoSchema = require('./models/todos');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator());

app.use(bodyParser.json())
initApi(app);

mongoose.connect(url).then(()=>{
    console.log('Connected')
});
mongoose.Promise=global.Promise;


app.listen(3000, () => {
    console.log('server started')
});