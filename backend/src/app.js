const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require("cors");

require("./db/mongoose");

const indexRouter = require('./routers/image');
const usersRouter = require('./routers/users');


const app = express();
const port =  3000;

// view engine setup

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json()); // to parse the json in request bodys
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

// include routes -> routes.js
app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(port);

module.exports = app;
