var path3 = require('path');
var fs = require('fs');

//创建文件夹如果父文件夹不存在  则创建
function makep(path,callback){
    //1.将path转成数组
    //2.判断是否存在 不存在创建  存在则跳过
    //3.创建目录
   var patharr =  path.substr(2).split("/");
    console.log(patharr);
    var dir = ".";
    patharr.forEach(function(path1){
        dir = dir +"/"+ path1;
        console.log(dir);
       if(fs.existsSync(dir)){
           console.log('进入判断成功');
            }else{
               console.log(fs.mkdirSync(dir));
               if(fs.mkdirSync(dir)){
                   console.log(dir+"创建成功");
               }else{
                   console.log(dir+"创建失败");
               };
            }
        });
}