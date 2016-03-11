/**
 * Created by xuzw on 16-3-9.
 */
/**
 *
 * @param {Array} buffer数组
 * @param {Number?} 生成buffer的长度（可不传）
 * @returns {Buffer} 生成的buffer
 */
function concat(list, length) {
    var result = null;
    try {
        if (!length) {
            length = 0;
            for (var i = 0; i < list.length; i++) {
                var subBuffer = list[i];
                length += subBuffer.length;
            }
        }
        var buffer = new Buffer(length);
        var startIndex = 0;
        for (var i = 0; i < list.length; i++) {
            var subBuffer = list[i];
            subBuffer.copy(buffer, startIndex, 0, subBuffer.length);
            startIndex += subBuffer.length;
        }
        result = buffer;
    } catch (e) {
        console.log(e);
    }
    return result;
}
//测试
console.time("0");
var buf1 = new Buffer('珠');
var buf2 = new Buffer('峰');
var buf3 = new Buffer('培');
var buf4 = new Buffer('训');
var list = [buf1, buf2, buf3, buf4];
console.log(concat(list).toString("utf8"));
console.timeEnd("0");