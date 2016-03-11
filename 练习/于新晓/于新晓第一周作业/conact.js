var buff1=new Buffer("于");
var buff2=new Buffer("小");
var buff3=new Buffer("牙");

function concat(size,length){
  
    var str='';
    for(var i=0,l=size.length;i<l;i++){
        str+=size[i].toString();
    }
    if(Buffer.byteLength(str)==length)return str;
}

var result=concat([buff1,buff2,buff3],9);

console.log(result.toString());