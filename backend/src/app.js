const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require("cors");

require("./db/mongoose");

const indexRouter = require('./routers/index');
const usersRouter = require('./routers/users');


var app = express();
const port =  3000;

// view engine setup

app.use(cors()); // to allow cross origin ajax requests
app.use(bodyParser.json()); // to parse the json in request bodys
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// include routes -> routes.js
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port);