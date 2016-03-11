/**
 * Created by Administrator on 2016/3/9.
 */
var buf = new Buffer('我');
var buf1=new Buffer('喜');
var buf2=new Buffer('欢');
var array=[];
array.push(buf);
array.push(buf1);
array.push(buf2);

//通过循环遍历 copy
console.log(contact(array).toString());
console.log(contact(array,3).toString());

//通过将Buffer数组转换成字符串      write写入Buffer中
console.log(contact1(array).toString());
console.log(contact1(array,3).toString());

function contact(array,length){
    if(length==undefined) {
        length = 0;
        for (var index in array) {
            length += array[index].byteLength;
        }
    }

    var buf=new Buffer(length);
    var index=0
    for(var item in array){
        array[item].copy(buf,index);
        index+=array[item].byteLength;
    }

    return buf;
}

function contact1(array,length){
    var str="";
    for(var index in array){
        str+=array[index].toString('utf8');
    }

    if(length==undefined)
        return new Buffer(str);
    else{
        var bff=new Buffer(length);
        bff.write(str,0,length);
        return bff;
    }
}


