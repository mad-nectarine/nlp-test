'use strict';

//"var hoge required 'hoge'" modules have no export default in ".d.ts"
//I wanna modify to "import hoge from 'hoge'"
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var fs = require('fs');
var routesconfig_1 = require('./src/config/routesconfig');
var appconfig_1 = require('./src/config/appconfig');
//===== load config.json =====
var app = express();
appconfig_1.default.initialize(path.resolve(__dirname));
//===== view engine setup =====
app.set('views', __dirname + '/src/app_endpoints');
app.set('view engine', 'server.js');
app.engine('server.js', require('express-react-views').createEngine());
//===== set middleware =====
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
if (app.get('env') === 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('common', {
        stream: { write: function write(str) {
                var now = new Date();
                var date = now.toDateString();
                var dirpath = __dirname + "/logs";
                var logpath = dirpath + "/" + date + ".log";
                var callback = function callback(err) {
                    if (err) {
                        return console.log("log output error:" + err);
                    }
                    return console.log(str.slice(0, str.length - 1));
                };
                if (!fs.existsSync(dirpath)) {
                    fs.mkdirSync(dirpath);
                }
                if (fs.existsSync(logpath)) {
                    fs.appendFile(logpath, str, callback);
                } else {
                    fs.writeFile(logpath, str, callback);
                }
            } } }));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    genid: function genid(req) {
        return uuid.v1(); // use UUIDs for session IDs
    },
    secret: 'hoge',
    saveUninitialized: false,
    //cookie: { secure: true },
    resave: false
}));
app.use(express.static(path.join(__dirname, 'public')));
//===== set routes =====
routesconfig_1.default(app);
//===== error handlers =====
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: "Server Error",
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: "Server Error",
        message: err.message,
        error: {}
    });
});
module.exports = app;