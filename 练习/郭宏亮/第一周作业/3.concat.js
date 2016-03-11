/**
 * Created by tony guo on 16/3/10.
 * 模拟一个 Buffer类的concat方法
 * arguments:
 * @@list {Array} 数组元素必须是Buffer类型
 * @@length {number}
 */

Buffer.myConcat  = function (list, length) {
    var ary = list, len = length, tLength = 0, count = 0;

    if (ary && Array.isArray(ary)) {
        //判断arguments是否符合要求
        ary.forEach(function (val) {
            if (!Buffer.isBuffer(val)) throw new Error ('list arguments must be Buffer type!');
        });

        //获取List中总字节长度
        ary.forEach(function (val) {
            tLength += val.length;
        });

        //定义大小为tLength的Buffer
        var buf = new Buffer(tLength);

        //copy list
        ary.forEach(function (val) {
            for(var i = 0, l = val.length; i < l; i++) {
                buf[count + i] = val[i];
            }
            count += l;
        });

        if (len && typeof len == 'number') {
            len = len > tLength ? tLength : len;
            //定义大小为len的Buffer
            var rBuff = new Buffer(len);
            for(var j = 0, sl = len; j < sl; j++) {
                rBuff[j] = buf[j] ;
            }
            return rBuff;

        } else {
            //如果length参数未填写或类型不正确,则返回Buffer实例的全长.
            return buf;
        }
    } else {
        throw new Error ('concat arguments : list must be Array type');
    }
};

var bf1 = new Buffer('你是谁啊?');
var bf2 = new Buffer('我是Buffer !');

var bf = Buffer.myConcat([bf1, bf2]);
var bff = Buffer.myConcat([bf1, bf2],12);
console.log(bf);
console.log(bf.toString());
console.log(bff);
console.log(bff.toString());