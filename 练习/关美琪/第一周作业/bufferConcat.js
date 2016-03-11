/**
 * Created by v_mqguan on 2016/3/10.
 */
/**
 * 1. list 一个由Buffer组成的数组
 * 2. 最后返回的Buffer的长度
 */
var buf1 = new Buffer("珠");
var buf2 = new Buffer("峰");
var result = concat([buf1,buf2],6);
console.log(result.toString());//控制台应该输出 珠峰
function concat(arr,length){
   var str='';
    var buf=new Buffer(length);
    arr.forEach(function(t){
        str+=t;
    });
    buf=str;
    console.log(buf);
    return buf.length;
}