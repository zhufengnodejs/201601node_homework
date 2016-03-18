/**
 * 模仿express框架原理写了一个connect和middle
 */
var path = require("path");
var data = require("./data");
var connect = require("./myExpress/connect");
var middle = require("./myExpress/middle");
var http=require("http");
var app = connect();
app.setStaticDir(path.join(__dirname, "public"));
middle(app);

/**
 * 获取用户
 */
app.get("/users", function (req, res) {
    var request = http.request({
        host: 'localhost',
        method: 'GET',
        port: 8081,
        path: '/users',
        headers: {'Content-Type': 'application/json'}
    }, function (res2) {
        var result = "";
        res2.on("data", function (data) {
            result += data;
        });
        res2.on("end", function () {
            res.send(result);
        })
    });
    request.end();
});
/**
 * 添加用户
 */
app.post("/users", function (req, res) {
    var postDta = "";
    req.on("data", function (data) {
        postDta += data;
    });
    req.on("end", function () {
        var request = http.request({
            host: 'localhost',
            method: 'POST',
            port: 8081,
            path: '/users',
            headers: {'Content-Type': 'application/json'}
        }, function (res2) {
            var result = "";
            res2.on("data", function (data) {
                result += data;
            });
            res2.on("end", function () {
                res.send(result);
            });
        });
        request.end(postDta);
        //
    });
});
app.listen(8080);
