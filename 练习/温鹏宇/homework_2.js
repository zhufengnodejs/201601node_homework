var path3 = require('path');
var fs = require('fs');

//�����ļ���������ļ��в�����  �򴴽�
function makep(path,callback){
    //1.��pathת������
    //2.�ж��Ƿ���� �����ڴ���  ����������
    //3.����Ŀ¼
   var patharr =  path.substr(2).split("/");
    console.log(patharr);
    var dir = ".";
    patharr.forEach(function(path1){
        dir = dir +"/"+ path1;
        console.log(dir);
       if(fs.existsSync(dir)){
           console.log('�����жϳɹ�');
            }else{
               console.log(fs.mkdirSync(dir));
               if(fs.mkdirSync(dir)){
                   console.log(dir+"�����ɹ�");
               }else{
                   console.log(dir+"����ʧ��");
               };
            }
        });
}