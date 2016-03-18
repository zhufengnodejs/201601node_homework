var http = require("http");
var url = require("url");
var mime = require("mime");
var fs = require("fs");
var path = require("path");
var user=require("./user.js");

var server = http.createServer(function (req, res) {
    var urlObj =url.parse(req.url, true);
    var curUrl = urlObj.pathname;
    if (curUrl === "/") {
        curUrl = "/reg.html";
    }
    var method = req.method;
    res.statusCode = 200;
    if (curUrl === "/user") {
        var result = {code: -1, msg: "未知错误", data: null};
        var postData = "";
        req.on("data", function (data) {
            postData += data;
        });
        switch (method) {
            case "GET":
                //查询
                if (!urlObj.query.name) {
                    result.data = user.users;
                } else {
                    result.data = user.queryUsers(urlObj.query.name)
                }
                result.code = 0;
                result.msg = "ok";
                res.end(JSON.stringify(result));
                break;
            case "POST":
                //注册
                req.on("end", function () {
                    var newUser = JSON.parse(postData);
                    if (!user.existeUser(newUser.name)) {
                        user.users.push(newUser);
                        result.code = 0;
                        result.msg = "ok";
                        result.data=user.users;
                    } else {
                        result.code = 1;
                        result.msg = "已存在该用户名，不可以重复注册";
                    }
                    res.end(JSON.stringify(result));
                });
                break;
            case "DELETE":
                //删除
                req.on("end", function () {
                    var nameInfo = JSON.parse(postData);
                    var name = nameInfo.name;
                    if (user.deleteUser(name)) {
                        result.code=0;
                        result.msg="ok";
                        result.data=user.users;
                    } else {
                        result.code=1;
                        result.msg="用户列表中不存在该用户";
                    }
                    res.end(JSON.stringify(result));
                });
                break;
            case "PUT":
                //更新
                req.on("end",function(){
                    var postObj = JSON.parse(postData);
                    if(user.updateUser(postObj.oldUserName,postObj.newUser)){
                        result.code=0;
                        result.msg="ok";
                        result.data=user.users;
                    }else{
                        result.code=1;
                        result.msg="用户列表中不存在该用户";
                    }
                    res.end(JSON.stringify(result));
                });
                break;
        }
    } else {
        res.setHeader('Content-Type', mime.lookup(curUrl) + ';charset=utf-8');
        fs.readFile("." + curUrl, function (err, data) {
            res.end(data);
        });
    }

}).listen(8080);
