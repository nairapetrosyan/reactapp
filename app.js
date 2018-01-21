const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const initApi = require('./routes');
const todoSchema = require('./models/todos');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
//app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
//app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.json())
//initApi(app);

mongoose.connect(url).then(()=>{
    console.log('Connected')
});
mongoose.Promise=global.Promise;





app.listen(3000, () => {
    console.log('server started')
});