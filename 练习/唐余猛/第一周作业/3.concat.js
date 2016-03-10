function myConcat(bufArray, length){

    //异常处理
    if (arguments.length === 0) {
        throw new error("argument must at least be an Array of Buffers.");
    }

    if (!Array.isArray(arguments[0])) {
        throw new error("argument[0] must least be an Array of Buffers.");
    }    

    //程序主逻辑
    if(length === undefined){
        length = 0;
        bufArray.forEach(function(bufObj){
            length +=bufObj.length;
        });
    }

    var buffer = new Buffer(length);
    var curIndex = 0;
    bufArray.forEach(function(bufObj){
        bufObj.copy(buffer,curIndex);
        curIndex += bufObj.length;
    });
    return buffer;
}

/* 测试一， 数组只有一个buf */
// const buf1 = new Buffer("珠峰培训");
// const length = buf1.length ;
// const resultBuf = myConcat([buf1],length);
// console.log(resultBuf.toString());



/* 测试二， 数组有两个或多个buf */
// const buf1 = new Buffer("珠峰培训");
// const buf2 = new Buffer("北京校区");
// const length = buf1.length + buf2.length;
// const resultBuf = myConcat([buf1,buf2],length);
// console.log(resultBuf.toString());


/* 测试三， 调用时没有传入length 参数 */
// const buf1 = new Buffer("珠峰培训");
// const buf2 = new Buffer("北京校区");
// const resultBuf = myConcat([buf1,buf2]);
// console.log(resultBuf.toString());


/*测试四 传入0个参数*/
// const resultBuf = myConcat();

/*测试五 传入第一个参数不是数组*/
// const resultBuf = myConcat(123);
