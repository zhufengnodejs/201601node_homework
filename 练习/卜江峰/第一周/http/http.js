/**
 * Created by BJF on 2016/3/9.
 */

var fs=require('fs');
var path = require('path');
var url=require('url');
var http= require('http');
var user=[];
http.createServer(function(request,response){
    var urlObject= url.parse(request.url,true);
    if(urlObject.pathname == "/"){
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        fs.readFile('./index.html',function(err,data){
            response.end(data);
        })
    }else if(urlObject.pathname == "/reg"){
        var str = '';
        request.on('data',function(data){
           str+=data.toString();
        });
        request.on('end',function(){
            console.log(str);
            user.push(JSON.parse(str));
            response.end(str);
        })
    }
}).listen(1111);