var express = require('express');
var user = require("../modules/user");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get("/login.html", function (req, res) {
    if (req.session.userInfo) {
        res.redirect("/");
    } else {
        res.render('login', {title: '登陆'});
    }
});
/**
 * 登陆接口
 */
router.post("/login.html", function (req, res) {
    console.log("进入login接口");
    user.getUser(req.body.name, req.body.pwd, function (data) {
        if (data.code === 0 && data.data != null) {
            req.session.regenerate(function(){
                req.session.userInfo = data.data;
                res.send({code: 0, msg: "ok", name: data.data.name});
            });
        } else {
            res.send({code: data.code, msg: data.msg});
        }
    });
});
router.get("/reg.html", function (req, res) {
    if (req.session.userInfo) {
        res.redirect("/");
    } else {
        res.render('reg', {title: '注册'});
    }
});
/**
 * 注册接口
 */
router.post("/reg.html", function (req, res) {
    console.log("进入reg接口");
    user.addUser(req.body.name, req.body.pwd, function (data) {
        if (data.code === 0 && data.data != null) {
            req.session.regenerate(function(){
                req.session.userInfo = data.data;
                res.send({code: 0, msg: "ok", data: data.data.name});
            });
        } else {
            res.send({code: data.code, msg: data.msg});
        }
    });
});
module.exports = router;
