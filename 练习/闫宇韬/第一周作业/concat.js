var buf1 = new Buffer('珠');
var buf2 = new Buffer('峰');
var buf3 = new Buffer('培');
var buf4 = new Buffer('训');

var all = concat([buf1,buf2,buf3,buf4],12);
console.log(all.toString('utf8'));

function concat(arr,length){
    var buffer = new Buffer(length);//定义一个buffer的总的长度,也就是将来要展示多少个字节
    var pos = 0; //定义一个要拷贝的目标位置
    for(var i=0;i<arr.length;i++){
        arr[i].copy(buffer,pos);//循环每个数组里面的字节，一个一个的拷贝到定义的buffer
        pos += arr[i].length;//当拷贝了第一个进去之后，目标的位置就是当前这个数组的字节长度
    }
    return buffer;
};