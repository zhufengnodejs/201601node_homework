
var http = require('http');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var url = require('url');
var userAry=[];
var server=http.createServer(function(request,response){
    var urlObj=url.parse(request.url,true);
    if(urlObj.pathname=="/favicon.ico"){
        return response.end('404');
    }else if(urlObj.pathname=="/"){
        response.writeHead("200",{'Content-Type':'text/html;charset=utf-8'});
        fs.readFile('./query.html',function(err,data){
            if(err){
                console.log("报错了");
            }else{
                response.end(data);
            }
        });
    }else if(urlObj.pathname=="/reg"){
        var str="";
          request.addListener("data",function(data){
              str+=data.toString();
          });
        request.addListener("end",function(){
            var obj=JSON.parse(str);
            userAry.push(JSON.parse(str));
            response.end(str);
        });
    }else if(urlObj.pathname=="/query"){
        var  str="";
        request.addListener("data",function(data){
            str=data.toString();
        });
        request.addListener("end",function(){
            for(var i=0;i<userAry.length;i++){
                if(userAry[i].username==str){
                    response.end(str);
                }else{
                    response.end("null");
                }
            }
            response.end(str);
        });
    }else if(urlObj.pathname=="/delete"){
        request.addListener("data",function(data){
            str=data.toString();
        });
        request.addListener("end",function(){
            var user=JSON.parse(str);
            for(var i=0;i<userAry.length;i++){
                if(userAry[i].username==user.name&&userAry[i].password==user.password){
                    userAry.slice(i,1);
                    i--;
                }
            }
            response.end(JSON.stringify(userAry));
        });
    }else{
        var requestUrl=request.url;
        response.setHeader("Content-Type",mime.lookup(requestUrl)+";charset=utf-8");
        fs.exists('.'+requestUrl,function(exists) {
            if (exists) {
                //如果读文件的时候，因为是相当当前目录，所以一定要加点，
                //如果读文件的时候写/index.js,读取当前跟目录下的
                fs.readFile('.' + requestUrl,function(err,data) {
                    if (err) {
                        response.statusCode = 404;
                        response.end();
                    } else {
                        response.statusCode = 200;
                        response.write(data);
                        response.end();
                    }
                });
            } else {
                response.statusCode = 404;
                response.end();
            }
        });
    }
});
server.listen(8080,"localhost");