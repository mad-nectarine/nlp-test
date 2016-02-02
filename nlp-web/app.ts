//"var hoge required 'hoge'" modules have no export default in ".d.ts"
//I wanna modify to "import hoge from 'hoge'"
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as uuid from 'node-uuid';
import * as fs from 'fs';
import routesConfig from './src/config/routesconfig';
import AppConfig from './src/config/appconfig'

//===== load config.json =====
var app = express();
AppConfig.initialize(path.resolve(__dirname))

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
        stream: { write : (str: string) => {
            let now = new Date();
            let date = now.toDateString();
            let dirpath = __dirname + "/logs";
            let logpath = dirpath + "/" + date + ".log";
            let callback = (err) => {
                if(err) {
                    return console.log("log output error:" + err);
                }
                return console.log(str.slice(0,str.length - 1));
            };
            if(!fs.existsSync(dirpath)){
                fs.mkdirSync(dirpath);
            }
            if(fs.existsSync(logpath)){
                fs.appendFile(logpath, str , callback);
            } else {    
                fs.writeFile(logpath, str , callback);
            }
        }}}));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    genid: function(req) {
        return uuid.v1() // use UUIDs for session IDs
    },
    secret: 'hoge',
    saveUninitialized: false,
    //cookie: { secure: true },
    resave: false
}));
app.use(express.static(path.join(__dirname, 'public')));

//===== set routes =====
routesConfig(app);

//===== error handlers =====
// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err: any = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next: Function): any => {
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
app.use((err: any, req, res, next: Function): any => {
    res.status(err.status || 500);
    res.render('error', {
        title: "Server Error",
        message: err.message,
        error: {}
    });
});
module.exports = app;
