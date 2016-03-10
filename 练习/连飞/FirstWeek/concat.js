
var concat=function(size,length){
    var buffers=new Buffer(length);
    var len=0;
    if(size instanceof Array){
        for(var i=0;i<size.length;i++){
            size[i].copy(buffers,len,0,size[i].length);
            len+=size[i].length;
        }
    }else{
        size.copy(buffers,len,0,size.length);
    }
    return buffers;
}

module.exports=concat;