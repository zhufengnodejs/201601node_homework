/**
 * Created by Administrator on 2016/3/6.
 */
var fs=require('fs');
var http=require('http');
var url=require('url');
var users=[];


http.createServer(function(req,res){
    //帮助解析请求中的url
    var objurl=url.parse(req.url,true);
    console.log(objurl.pathname);
    console.log(objurl.pathname.indexOf('delete'));
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'})
    switch (objurl.pathname){
        case '/':
            fs.readFile('./reg.html',function(err,data){
                if(err)
                    console.log(err);
                else{
                    res.end(data);
                }
            });
            break;
        case '/reg':
            //每当服务器接收到客户端发送过来的数据的时候就会触发data事件
            var str="";
            req.on('data',function(message){
                str+=message.toString();
            })
            req.on("end",function(){
                users.push(JSON.parse(str));
                //当全部的数据全部获取到，触发end事件的时候，这时候让请求体的数据返回到用户列表中
                //每次添加完之后返回添加的数据
                res.end(str);
            });
            break;
        case '/sel':
            res.end(JSON.stringify(users));
            break;
        case '/del':
            var result="";
            req.on('data',function(message){
                result+=message;
            });
            req.on('end',function(){
                users.splice(parseInt(result),1);
                res.end(JSON.stringify(users));
            });
            break;
        case '/save':
            var resstr='';
            req.on('data',function(json){
                resstr+=json;
            });
            req.on('end',function(){
                var user=JSON.parse(resstr);
                var index=user.index;
                delete user.index;
                users[index]=user;
                res.end(JSON.stringify(users));
            });
            break;
    }
}).listen(80,'127.0.0.1');