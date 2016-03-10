var fs = require('fs');
var http = require('http');
var mime = require('mime');
var path = require('path');
var url = require('url');
var users = [];


var server = http.createServer(function(request,response){
    var urlObj = url.parse(request.url,true);
    if(urlObj.pathname == '/'){
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        fs.readFile('./index.html',function(err,data){
            if (err){   
            }else{
                response.end(data);
            }
        })
   }else if(urlObj.pathname == '/reg'){
        //每当服务器收到客户端发过来的一段数据的时候就会触发data事件
       var str = '';
        request.on('data',function(data){
            str+=data.toString();
       });
        //当所有的数据全部接收完毕的时候会会触发end事件，这时请求体的数据就接收完整了
        request.on('end',function(){
            console.log(str);
            //转成对象追加到用户列表里
            users.push(JSON.parse(str));
            //最后返回用户列表
            response.end(str);
        })
    }else if(urlObj.pathname === '/delUser'){
        var str = '';
        request.on('data',function(data){
            str+=data.toString();
       });
        //当所有的数据全部接收完毕的时候会会触发end事件，这时请求体的数据就接收完整了
        request.on('end',function(){
            //转成对象追加到用户列表里
            var todelUser = JSON.parse(str);
            //最后返回用户列表
            users = users.filter(function(obj){
                console.log(obj.username,todelUser.username,obj.age , todelUser.age);
                var result = (obj.username !== todelUser.username) && (obj.age !== todelUser.age);
               return result;
            });
            response.end(str);
        })
    }else if(urlObj.pathname === '/listUsers'){
       response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'}); 
       response.end(JSON.stringify(users));
    }else{
        //主要用来处理 index.html 中jquery 文件的引用问题
        var requesturl = request.url;
        response.setHeader('Content-Type',mime.lookup(requesturl)+';charset=utf-8');//设置响应头
        fs.exists('.'+requesturl,function(exists){
            if(exists){
                fs.readFile('.'+requesturl,function(err,data){
                    console.error(requesturl,err,data);
                //如果读取文件出错了，则也报404错误
                    if(err){
                        response.statusCode = 404;
                        response.end();
                    }else{
                        response.statusCode = 200;
                        response.write(data);
                        response.end();
                    }
                });
            }else{
                response.statusCode = 404;
                response.end();
            }
        });

    }
}).listen(8080,function(){
    console.log('server started on http://localhost:8080');
});