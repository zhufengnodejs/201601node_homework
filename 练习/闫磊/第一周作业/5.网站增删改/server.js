var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var mime = require('mime');


var users = [];
var curIndex = 0;
var server = http.createServer(function (request, response) {

    var urlObj = url.parse(request.url, true);
    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    if (urlObj.pathname == '/') {
        fs.readFile('./index.html', function (err, data) {
            response.write(data.toString());
            response.end();
        });
    }
    else if (urlObj.pathname == '/addUser') {
        var str = '';
        request.on('data', function (data) {
            str += data.toString();
        });
        request.on('end', function () {
            curIndex++;
            var userInfo = JSON.parse(str);
            userInfo.id = curIndex;
            users.push(userInfo);
            response.write('ok');
            response.end();
        });
    }
    else if (urlObj.pathname == '/getUsers') {
        response.write(JSON.stringify(users));
        response.end();
    }
    else if (urlObj.pathname == '/delUser') {
        var str = '';
        request.on('data', function (data) {
            str += data.toString();
        });
        request.on('end', function () {
            var data = JSON.parse(str);
            console.log(data.id);
            if (data && data.id) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id == data.id) {
                        users.splice(i, 1);
                        break;
                    }
                }
            }
            console.log(JSON.stringify(users));
            response.write('ok');
            response.end();
        });
    }
    else {
        response.end();
    }
});
server.listen(8080);
