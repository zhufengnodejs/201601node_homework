var url = require("url");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

var middle = function (app) {
    app.use(function (req, res, next) {
        var urlObj = url.parse(req.url, true);
        req.pathName = urlObj.pathname;
        req.query = urlObj.query;
        /**
         * 响应函数
         * @param content
         * @param statusCode
         * @param head
         */
        res.send = function (content, statusCode, head) {
            if(res.responseFinish){
                return;
            }
            if (!statusCode) {
                statusCode = 200;
            }
            if (!head) {
                head = {'Content-Type': 'text/html;charset=utf-8'};
            }
            res.writeHead(statusCode, head);
            res.end(content);
            res.responseFinish=true;
        }
        next();
    });
    /**
     * 处理静态文件
     */
    app.use(function (req, res, next) {
        var pathName = req.pathName;
        var staticDir = req.staticDir;
        if(pathName==="/"){
            pathName="/index.html";
        }
        if (fs.existsSync(path.join(staticDir, pathName))) {
            //存在静态文件
            fs.readFile(path.join(staticDir, pathName), function (err, data) {
                if (err) {
                    res.send("服务器出现异常", 500);
                } else {
                    res.send(data, 200, {'Content-Type': mime.lookup(pathName)});
                }
            });
        } else {
            next();
        }
    });
}
module.exports = middle;