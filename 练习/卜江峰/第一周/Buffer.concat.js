/**
 * Created by BJF on 2016/3/7.
 * 实现Buffer.concat
 * new Buffer(size)
 * new Buffer(array)
 * new Buffer(str, [encoding])
 * buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])
 * buf.toString([encoding], [start], [end])
 */
var buf1=new Buffer("A");
var buf2=new Buffer("B");
var buf3=new Buffer([88,66]); // 数组中可以传哪些东西&类型，数字\特殊符号\string
//http://www.asciima.com/  ASCII码查询
//bufferArr是数组，length是sizeArr中所有buffer的总长度，不是bufferArr数组的长度
Buffer.concat=function (bufferArr,length){
    console.log(Array.isArray(bufferArr[0]));

    var allBuffer=new Buffer(length);
    var preBufferLength=0;
    for (var i=0;i<bufferArr.length;i++){
        //已经是Buffer对象了，不需要重新创建
        //var thisbuf=new Buffer(bufferArr[i]);
        var thisbuf=bufferArr[i];
        thisbuf.copy(allBuffer,preBufferLength,0,thisbuf.length);
        preBufferLength+=thisbuf.length;
    }
    console.log(allBuffer);
    return allBuffer;
}

var result=Buffer.concat([buf3,buf1,buf2],4);
console.log(result.toString('utf8'));