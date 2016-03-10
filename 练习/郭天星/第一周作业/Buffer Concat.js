//第一种 方式，  这种算吗，可以不？
function concat() {
    var str = '';
    for (var i = 0; i < arguments.length; i++) {
        str += arguments[i].toString();
    }
    var buffers = new Buffer(str);
    return buffers;
}
//使用
var buff1 = new Buffer("珠峰");
var buff2 = new Buffer("科技");
var buff3 = new Buffer("123123");
//var newBuffer = concat(buff1, buff2, buff3);


//第二种
function concat(list, length) {
    if (!(list instanceof Array)) {
        console.error('请输入Buffer数组！');
        return;
    }
    if (length == undefined) {
        var str = '';
        for (var i = 0; i < list.length; i++) {
            str += list[i].toString();
        }
        var buffers = new Buffer(str);
        return buffers;
    }

    var num = /^\d*$/;
    if (num.test(length)) {
        var buffer = new Buffer(length), index = 0;
        for (var i = 0; i < list.length; i++) {
            var temp = list[i];
            temp.copy(buffer, index);
            index += temp.length;
        }
        return buffer;
    } else {
        return new Buffer(0);
    }
}
