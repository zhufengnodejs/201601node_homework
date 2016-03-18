var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var uncheckPath=";/users/reg.html;/users/login.html;/users/reg;/users/login;";
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: '12345',
    name: 'session-id',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 2*60*60*1000},  //设置maxAge是2小时，即2小时后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
/**
 * 检查是否登陆
 */
app.use(function (req,res,next) {
    if(uncheckPath.indexOf(";"+req.path+";")>=0){
        console.log(req.path+"通过验证");
        next();
    }else{
        if(!req.session.userInfo){
            console.log(req.session.userInfo);
            console.log(req.path,"没有通过验证");
            res.redirect("/users/login.html");
        }else{
            console.log(req.path+"通过验证2");
            next();
        }
    }
});
app.use("/users/logout.html",function (req, res,next) {
    req.session.destroy(function () {
        res.redirect("/users/login.html");
    });
});
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
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
        message: err.message,
        error: {}
    });
});


module.exports = app;
