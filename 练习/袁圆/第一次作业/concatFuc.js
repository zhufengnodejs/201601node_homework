/**
 * Created by yuan on 2016/3/7.
 */
var util = require('util');
var buf1 = new Buffer('珠');
var buf2 = new Buffer('峰');
var buf3 = new Buffer('培');
var buf4 = new Buffer('训');

var all = concat([buf1,buf2,buf3,buf4]);
console.log(all.toString());

function concat(lists,length){
    if (util.isUndefined(length)) {
        length = 0;
        for (var i = 0; i < lists.length; i++){
            length += lists[i].length;
        }
    } else {
        length = length >>> 0;
    }
    var pos = 0;
    var buffer = new Buffer(length);
    lists.forEach(function(list){
        list.copy(buffer,pos);
        pos +=list.length;
    });
    return buffer
}
