// ��������Ŀ¼
var path = require('path');
var fs = require('fs');
function mkdirs(dirpath, callback) {
    fs.exists(dirpath, function (exists) {
        if (exists) {
            if (callback != undefined) {
                callback(dirpath);
            }
        } else {
            //���Դ�����Ŀ¼��Ȼ���ٴ�����ǰĿ¼
            mkdirs(path.dirname(dirpath), function () {
                fs.mkdir(dirpath, callback);
            });
        }
    });
};

//����
//mkdirs('./test3/2');