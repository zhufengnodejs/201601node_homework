/**
 * Created by v_mqguan on 2016/3/10.
 */
var fs = require('fs');
var http = require('http');
var url = require('url');
var users = [];
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    if (urlObj.pathname == '/') {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        fs.readFile('./ajax.html', function (err, data) {
            if (err) {
            } else {
                res.end(data);
            }
        });
    } else if (urlObj.pathname == '/reg') {
        //每当服务器收到客户端发过来的一段数据的时候就会触发data事件
        var str = '';
        req.on('data', function (data) {
            str += data.toString();
        });
        //当所有的数据全部接收完毕的时候会会触发end事件，这时请求体的数据就接收完整了
        req.on('end', function () {
            console.log(str);
            fs.writeFileSync('./data.txt', str, {flag: 'a'});
            //转成对象追加到用户列表里
            users.push(JSON.parse(str));
            //最后返回用户列表
            res.end(str);
        })

    } else if (urlObj.pathname == '/que') {
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        fs.readFile('./data.txt', 'utf8', function (err, data) {
            if (err) {
                console.log("xxx")
            } else {
                var arr=data.toString()
                console.log(arr);
                //users.push(JSON.parse(data.toString()));

            }
            res.end(data.toString());
        });

    }
});
server.listen(8888);