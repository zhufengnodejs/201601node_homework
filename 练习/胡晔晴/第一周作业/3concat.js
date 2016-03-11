/**
 * Created by hu on 2016/3/11.
 */
function mconcat(arr,length){
    if(!arr instanceof Array){
        console.log('输入数组哇');
    }
    if(length==undefined){
        //console.log('no');
        //return
        var length=0;
        arr.forEach(function(e){
            length+= e.length;
        })
    }
    var buf=new Buffer(length);
    var len=0;
    for(var i=0;i<arr.length;i++){
        //把arr里的拷贝到buf上
        arr[i].copy(buf,len);
        len+=arr[i].length;
    }
    console.log(buf.toString());

}

var buf1=new Buffer('你');
var buf2=new Buffer('好');
var buf3=new Buffer('额');

var buf=mconcat([buf1,buf2,buf3]);
//var arr=[1,2,3,4,5];
//arr.forEach(function(e){
//    console.log(e);
//});
//buf1 = new Buffer(26);
//buf2 = new Buffer(26);
//for (var i = 0 ; i < 26 ; i++) {
//    buf1[i] = i + 97; // 97 is ASCII a
//    buf2[i] = 33; // ASCII !
//}
//buf1.copy(buf2, 8, 16, 20);
//console.log(buf2.toString('ascii', 0, 25));
//buf2复制buf1中的内容
