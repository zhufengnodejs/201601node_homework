/**
 * 1. list 一个由Buffer组成的数组
 * 2. 最后返回的Buffer的长度
 */
function concat(size,length){
    if (!Array.isArray(size)) {
        throw 'list argument must be an Array of Buffers';
    }
    if (!Number(length) && length !== undefined) {
        return new Buffer(0);
    }
    var str = '';
    size.forEach(function (bufferObj) {
        if (Buffer.isBuffer(bufferObj)) {
            str += bufferObj;
        } else {
            throw 'list argument must be an Array of Buffers';
        }
    });
    var buffer = new Buffer(str);
    if (length >= 0 || length == undefined) {
        buffer = buffer.slice(0, length);
        if (buffer.length < length) {
            var buf = buffer;
            buffer = new Buffer(length);
            buf.copy(buffer, 0, 0, buf.length)
        }
    } else {
        throw 'Invalid typed array length';
    }
    return buffer;
}

var buf1 = new Buffer("珠");
var buf2 = new Buffer("峰");
var result = concat([buf1,buf2],6);
console.log(result.toString());//控制台应该输出 珠峰
/*
var buf1 = new Buffer('珠峰');
var buf2 = new Buffer('培');
var buf3 = new Buffer('训');
console.log('数组中只有一个元素的情况：');
console.log(Buffer.concat([buf1], 3));
console.log(bufferConcat([buf1], 3));

console.log('length为0的情况：');
console.log(Buffer.concat([buf1], 0));
console.log(bufferConcat([buf1], 0));

console.log('数组中有多个元素且length小于数组元素拼接后总长度的情况：');
console.log(Buffer.concat([buf1, buf2, buf3], 6));
console.log(concat([buf1, buf2, buf3], 6));

console.log('数组中有多个元素且length是数组元素拼接后总长度的情况：');
console.log(Buffer.concat([buf1, buf2, buf3], 12));
console.log(concat([buf1, buf2, buf3], 12));

console.log('数组中有多个元素且length超出数组元素拼接后总长度的情况：');
console.log(Buffer.concat([buf1, buf2, buf3], 15));
console.log(concat([buf1, buf2, buf3], 15));

console.log('数组中有多个元素且不传length的情况：');
console.log(Buffer.concat([buf1, buf2, buf3]));
console.log(concat([buf1, buf2, buf3]));

console.log('length为非数值的情况1：');
console.log(Buffer.concat([buf1, buf2, buf3], '7'));
console.log(concat([buf1, buf2, buf3], '7'));

console.log('length为非数值的情况2：');
console.log(Buffer.concat([buf1, buf2, buf3], '6as'));
console.log(concat([buf1, buf2, buf3], '6as'));

console.log('第一个参数为空或数组元素不是Buffer的情况：');
try {
    console.log(Buffer.concat([1, 2, 3],5));
} catch (e) {
    console.log(e);
}
try {
    console.log(concat([1,2,3],5));
} catch (e) {
    console.log(e);
}*/
