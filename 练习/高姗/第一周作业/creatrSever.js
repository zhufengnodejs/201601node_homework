var http=require('http');
var fs=require('fs');
var mime=require('mime');
var url=require('url')
var str='';
var sever=http.createServer(function(request,response){
    // console.log(request.url);
	//console.log(request.method)
	//console.log(request.headers)
	var strArry=[];var b=[];
	var urlObj=url.parse(request.url);//解析url
	//pathname 指的是路径名 问号和端口号中间的那一部分
	//console.log(urlObj.pathname)
	if(urlObj.pathname=='/'){
		response.writeHead(200,{'content-Type':'text/html;charset=utf-8'})
		fs.readFile('./creatrSever.html',function(err,data){
			response.write(data);
			response.end()
		})
	}else if(urlObj.pathname=='/creatrSever.css'){
		response.writeHead(200,{'content-Type':'text/css;charset=utf-8'});
		fs.readFile('./creatrSever.css','utf-8',function(err,data){
			response.write(data);
			response.end()
		})
	}else if(urlObj.pathname=='/creatrSever'){
	//点击才会走着 点击的时候走的/creatrSever的路径 所以urlObj.pathname=/creatrSever 会执行下面的方法
		var akk=''
		request.on('data',function(data){
			str=str+data.toString();
		})
		request.on('end',function(){
			strArry.push(JSON.parse(str));
			response.end(str)

		})
	}
})
sever.listen(8080,'localhost')