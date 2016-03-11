function myConcat(bufArray, length) {
    if (length === undefined)
    {
        length = 0;
        bufArray.forEach(function (obj) {
            length += obj.length;
        });
    }
    var buffer = new Buffer(length);
    var curIndex = 0;
    bufArray.forEach(function (bufObj) {
       if((curIndex+bufObj.length)<=length) {
           bufObj.copy(buffer, curIndex);
       }
       else{
           bufObj.copy(buffer, curIndex,0,bufObj.length);
       }
        curIndex += bufObj.length;
    });
    return buffer;
}

/*var buf1 = new Buffer("珠1");
 var buf2 = new Buffer("珠2");
 var reslult =myConcat([buf1, buf2],5);
 console.log(reslult.toString('utf8'));*/
