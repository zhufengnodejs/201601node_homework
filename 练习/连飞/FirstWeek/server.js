var http=require("http");
var url=require("url");
var fs=require("fs");
var mine=require("mime");

//创建一个服务器
http.createServer(function (request,response) {
    var newUrl;
    newUrl=url.parse(request.url).pathname;

    if(newUrl=="/") {
        newUrl='/index.html';
        isFileExist(newUrl,response);
    }else if(newUrl=="/data") {
        var str='';
        request.on("data", function (data) {
            str+=data.toString();
        });
        request.on("end", function () {
            response.end(str);
        });
    }else{
        isFileExist(newUrl,response);
    }
}).listen(9090);


/*
  **判读文件是否存在并读取
 */

function isFileExist(url,response){
    fs.exists("./"+url, function (exists){
        if(exists){
            response.setHeader("Content-Type",mine.lookup(url)+",charset=utf8");
            fs.readFile("."+url, function (err,data) {
                if(err){
                    response.statusCode = 404;
                    response.end();
                }else{
                    response.statusCode = 200;
                    response.write(data);
                    response.end();
                }

            })
        }else{
            response.statusCode=404;
            response.end();
        }
    })
}