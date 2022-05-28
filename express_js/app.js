var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');

var DBRouter = require('./routes/DB');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ['http://localhost:3000'],
        method: ['GET', 'POST'],
        credentials: true,
    })
);

app.use('/db', DBRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    logger(req);
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
