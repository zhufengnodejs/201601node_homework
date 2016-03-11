// 创建所有目录
var path = require('path');
var fs = require('fs');
function mkdirs(dirpath, callback) {
    fs.exists(dirpath, function (exists) {
        if (exists) {
            if (callback != undefined) {
                callback(dirpath);
            }
        } else {
            //尝试创建父目录，然后再创建当前目录
            mkdirs(path.dirname(dirpath), function () {
                fs.mkdir(dirpath, callback);
            });
        }
    });
};

//测试
//mkdirs('./test3/2');