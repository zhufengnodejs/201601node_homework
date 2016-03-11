/**
 * Created by yuan on 2016/3/7.
 */
/**
 * Created by yuan on 2016/3/7.
 */
/**
 * Created by Yuan on 2016/3/6.
 */
var http = require('http');
var mime = require('mime');
var url = require('url');//对URL进行处理，把字符串转成对象
var fs = require('fs');

var users = [{ username: '钟汉良', age: '41' },{ username: '袁圆', age: '12' }, { username: '张三', age: '12' }, { username: '李四', age: '22' } ];
function server(request,response){
    var urlObject = url.parse(request.url,true);
    var pathname = urlObject.pathname;
    if(pathname == '/'){
        response.setHeader('Content-Type','text/html;charset=utf-8');
        fs.readFile('./query.html',function(err,data){
            response.write(data);
            response.end();
        });
    }else if(pathname =='/reg'){
        var str = ''
        request.on('data',function(data){
            str += data.toString();
            users.push(JSON.parse(str));
        });
        request.on('end',function(){
            response.end(JSON.stringify(str));
        });
    }else if(pathname =='/query'){
        var str = ''
        request.on('data',function(data){
            str += data.toString();
        });
        request.on('end',function(){
            var userObj = '';
            users.forEach(function (user) {
                if(user.username == str){
                    userObj = user;
                    return
                }
            });
            if(userObj){
                response.end(JSON.stringify(userObj));
            }else{
                response.statusCode = 302;
                response.end();
            }
        });
    }else if(pathname =='/clock'){
        response.end(new Date().toLocaleString());
    }else if(pathname =='/apple'){
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.end(urlObject.query.num+'个苹果');
    }else if(pathname == '/favicon.ico'){
        response.end();
    }else{
        static(pathname,response);
    }
}

function static(pathname,response){
    console.log(pathname);
    response.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf-8');
    fs.readFile(pathname.slice(1),function(err,data){
        response.write(data);
        response.end();
    });
}

var server = http.createServer(server);

server.listen(8082,'localhost');
