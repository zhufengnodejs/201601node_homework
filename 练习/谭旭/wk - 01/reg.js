var http = require('http');
var fs = require('fs');
var url = require('url');
var users = [];

var server = http.createServer(function(request,response){
  var urlObj = url.parse(request.url,true);
  if(urlObj.pathname=='/'){
    response.writeHead(200,{'Content-Type':'text/html;charset:utf-8;'});
    fs.readFile('./reg.html','utf-8', function (err,data) {
      response.end(data);
    });
  }else if(urlObj.pathname=='/reg'){

    var str = '';
    request.on('data', function (data) {
      // console.log(data.toString());
      // users.push(data.toString());
      // console.log(users);
      console.log(request);
      str+=data.toString();
    });
    request.on('end', function () {
      response.writeHead(200,{'Content-Type':'text/html;charset:utf-8;'});
      fs.readFile('./reg.html','utf-8', function (err,data) {
        console.log(urlObj.query);
        response.end(data);
      });
    })
  }
});

server.listen(8888,'localhost');