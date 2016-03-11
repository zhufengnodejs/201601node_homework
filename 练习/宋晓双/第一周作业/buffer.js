
Buffer.prototype.myConcat=function(list,length){

   if(!isArray(list)){
     console.log("不是一个数组");
   }
    if(length===0){
      return new Buffer(0);
    }
    var buffer=new Buffer(length);
    var pre=0;
    for(var i= 0,len=list.length;i<len;i++){
       if(Buffer.isBuffer(list[i])){
           list[i].copy(buffer,pre);
           pre+=list[i].length;
       }else{
           console.log("不是buffer类型");
       }
    }
    return buffer;
};
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

var buf=new Buffer("测试");
console.log(Buffer.prototype.myConcat([buf],buf.length).toString("utf8"));

var buf1=new Buffer("测试1");
var buf2=new Buffer("测试+1");
var bufLength=buf1.length+buf2.length;
console.log(Buffer.prototype.myConcat([buf1,buf2],bufLength).toString("utf8"));