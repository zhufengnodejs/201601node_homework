//自己实现concat方法
var fs = require('fs');
var mime =  require('mime');

var buffer1 = new Buffer('abc');
var buffer2 = new Buffer('def');
var buffer3 = new Buffer('ghi');
var buffer4 = new Buffer('jklkk');


var list = [buffer1,buffer2,buffer3,buffer4];
function concat1(list,length){
    var buffers = new Buffer(length);
    var count1 = 0;
    list.forEach(function(buffer){
        console.log(count1);

        if(list.length>0){
            //console.log(typeof  count1,typeof buffer.byteLength);
            buffer.copy(buffers,count1,0,count1+buffer.byteLength-1);
        }
        //console.log(buffers);
        count1 = count1 + buffer.byteLength-1;
    });

    //console.log(buffers.toString());
    return buffers;
}
console.log(concat1(list,14).toString());