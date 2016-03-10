/**
 * Created by quan on 16/3/9.
 */
//方法一
function concat2(list){
    if (!(list instanceof Array)) {
        console.error('请输入正确的数组！');
        return;
    }
    var str = list.join("");
    var buffers = new Buffer(str);
    return buffers;
}
//方法二
function concat(list,length){
    if (!(list instanceof Array)) {
        console.error('请输入正确的数组！');
        return;
    }
    var buffer = new Buffer(length);
    var totalLength = 0;
    list.forEach(function(obj){
        obj.copy(buffer,totalLength);
        totalLength += obj.length;
        //console.log("方法1====:"+obj.toString());
    });
    return buffer;
}

 const buf1 = new Buffer("珠峰培训");
 const buf2 = new Buffer("北京校区");
//方法1
 const resultBuf2 = concat2([buf1,buf2]);
 console.log(resultBuf2.toString());
//方法2
 const length = buf1.length + buf2.length;//方法1
 const resultBuf1 = concat([buf1,buf2],length);
 console.log(resultBuf1.toString());

