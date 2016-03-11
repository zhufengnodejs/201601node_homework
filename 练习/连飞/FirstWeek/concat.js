
var concat=function(list,length){

    if (!Array.isArray(list)){
        throw new TypeError('list argument must be an Array of Buffers.');
    }

    if (list.length === 0){
        return new Buffer(0);
    }

    if (length === undefined) {
        length = 0;
        for (var i = 0; i < list.length; i++)
            length += list[i].length;
    } else {
        length = length >>> 0;
    }

    var buffer = new Buffer(length);
    var len = 0;
    for (var i = 0; i < list.length; i++) {
        var buf = list[i];
        buf.copy(buffer, len);
        len += buf.length;
    }

    return buffer;
}

module.exports=concat;