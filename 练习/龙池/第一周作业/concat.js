//要求：
function concat(size, length){
    if(size.length==1)
        return size[0];
    var buffer = new Buffer(length);
    var index = 0;
    size.forEach(function(buf){
        buf.copy(buffer,index);
        index+=buf.length;
    });
    return buffer.slice(0,index);
}

//要求
var buf1 = new Buffer("珠");
var buf2 = new Buffer("峰");
var result = concat([buf1, buf2], 6);
console.log(result.toString());
