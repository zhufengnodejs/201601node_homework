/**
 * Created by caoyangkaka on 3/8/16.
 */
var http = require('http');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var url = require('url');
var users = [];
var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    // for loging
    console.log('LOG:' + request.method + '; ' + request.url + '; ' + 'TIME: ' + new Date().toString());
    // all about router
    if (urlObj.pathname == '/') {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        fs.readFile('./spa.html', function (err, data) {
            response.end(data);
        })
    } else if (urlObj.pathname == '/register') {
        var str = '';
        request.on('data', function (data) {
            str += data.toString();
        });
        request.on('end', function () {
            var cUser = JSON.parse(str);
            if (users.every(function (user) {
                    return user.username !== cUser.username || (user.username === cUser.username && user.age !== cUser.age);
                })) {
                users.push(cUser);
                response.end(str);
            } else {
                response.end();
            }
        })
    } else if (urlObj.pathname == '/search') {
        var name = urlObj.query.username;
        var temp = users.find(function (user) {
            return user.username === name;
        });
        if (temp) {
            response.end(JSON.stringify(temp));
        } else {
            response.end();
        }
    } else if (urlObj.pathname == '/update') {
        var str = '';
        request.on('data', function (data) {
            str += data.toString();
        });
        request.on('end', function () {
            var cUser = JSON.parse(str);
            var temp = users.find(function (user) {
                return user.username === cUser.username;
            });
            if (temp) {
                var toUsers = [];
                toUsers.push({
                    username: temp.username,
                    age: temp.age
                });
                temp.age = cUser.age;
                toUsers.push(cUser);
                response.end(JSON.stringify(toUsers));
            } else {
                response.end();
            }
        })
    } else if (urlObj.pathname == '/delete') {
        var name = urlObj.query.username;
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === name) {
                response.end(JSON.stringify(users[i]));
                users.splice(i, 1);
                return;
            }
        }
        response.end();
    } else if (urlObj.pathname == '/update') {
        var str = '';
        request.on('data', function (data) {
            str += data.toString();
        });
    } else if (urlObj.pathname == '/all') {
        response.end(JSON.stringify(users));
    } else {
        var pathname = urlObj.pathname;
        response.setHeader('Content-Type', mime.lookup(pathname) + ';charset=utf-8');
        response.setHeader('Cache-Control', 'max-age=2592000');
        fs.exists('.' + pathname, function (exists) {
            if (exists) {
                fs.readFile('.' + pathname, function (err, data) {
                    if (err) {
                        response.statusCode = 404;
                        response.end();
                    } else {
                        response.statusCode = 200;
                        response.write(data);
                        response.end();
                    }

                })
            } else {
                response.statusCode = 404;
                response.end();
            }

        })
    }
}).listen(8080, 'localhost');