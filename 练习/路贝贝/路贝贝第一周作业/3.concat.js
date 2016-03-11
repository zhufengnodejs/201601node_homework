
function concat(list,length){
    var buf = new Buffer(length);
    var totalLength = 0;
    list.forEach(function(obj){
        obj.copy(buf,totalLength);
        totalLength += obj.length;
    });
    return buf;
}

var buf1 = new Buffer("珠");
var buf2 = new Buffer("峰");
var result = concat([buf1,buf2],6);
console.log(result.toString('utf-8'));