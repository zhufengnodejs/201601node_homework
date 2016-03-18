var http = require("http");
var url = require("url");


var proto = {};
function createServer() {
    function app(req, res) {
        res.responseFinish = false;
        req.staticDir = app.staticDir;
        app.handleFilters(req, res);
    }

    proto.staticDir = "";
    proto.filters = [];
    proto.getHandlers = {};
    proto.postHandlers = {};
    proto.allHandlers = {};
    Object.assign(app, proto);
    return app;
}
/**
 * 添加过滤器处理逻辑
 * @param route
 * @param fn
 */
proto.use = function (route, fn) {
    var path = route;
    var handle = fn;
    if (typeof path != "string") {
        //所有路由都经过的过滤器
        handle = route;
        path = "all";
    }
    this.filters.push({path: path.toLowerCase(), handle: handle});
}
/**
 * 过滤请求
 * @param req
 * @param res
 */
proto.handleFilters = function (req, res) {
    var filters = this.filters;
    var index = 0;
    var urlObj = url.parse(req.url);
    var app = this;
    function next(err) {
        if (index >= filters.length) {
            app.handleRequest(req, res);
            return;
        }
        var handleObj = filters[index++];
        if (handleObj.path.toLowerCase() === urlObj.pathname.toLocaleLowerCase() || handleObj.path === "all") {
            if (err) {
                if (handleObj.handle.length == 4) {
                    //handleObj.handle(err, req, res, next);
                    console.log(JSON.stringify(err));
                    res.send("服务器出现错误", 500);
                    return;
                } else {
                    console.log(JSON.stringify(err));
                    res.send("服务器出现错误", 500);
                    return;
                }
            } else {
                handleObj.handle(req, res, next);
            }
        } else {
            if (err) {
                //next(err);
                console.log(JSON.stringify(err));
                res.send("服务器出现错误", 500);
                return;
            } else {
                next();
            }
        }
    }
    next();
}
proto.handleRequest = function (req, res) {
    if (!req || !res) {
        return;
    }
    if ((typeof res.responseFinish) != "undefined") {
        if (res.responseFinish) {
            return;
        }
    }
    //判断是不是已经被处理
    if (this.handleAll(req, res)) {
        return;
    }
    //判断是否被get处理程序处理
    if (this.handleGet(req, res)) {
        return;
    }
    if (this.handlePost(req, res)) {
        return;
    }
    //没有匹配路由，需要返回404页面
    res.send("没有找到该页面", 404);
}
/**
 * 添加get请求处理逻辑
 * @param route
 * @param fn
 */
proto.get = function (route, fn) {
    var path = route.toLowerCase();
    var handle = fn;
    if (typeof path != "string") {
        throw new TypeError('route must be string');
    }
    this.getHandlers[path] = fn;
}
/**
 * 处理get请求
 * @param req
 * @param res
 * @returns {boolean}
 */
proto.handleGet = function (req, res) {
    if (req.method.toLowerCase() !== "get") {
        //没有处理
        return false;
    }
    var urlObj = url.parse(req.url);
    var pathName = urlObj.pathname.toLowerCase();
    if (!this.getHandlers[pathName]) {
        //没有处理
        return false;
    }
    this.getHandlers[pathName](req, res);
    return true;
}
/**
 * 添加post请求处理逻辑
 * @param route
 * @param fn
 */
proto.post = function (route, fn) {
    var path = route.toLowerCase();
    var handle = fn;
    if (typeof path != "string") {
        throw new TypeError('route must be string');
    }
    this.postHandlers[path]=fn;
}
/**
 * 处理post请求
 * @param req
 * @param res
 * @returns {boolean}
 */
proto.handlePost = function (req, res) {
    if (req.method.toLowerCase() !== "post") {
        //没有处理
        return false;
    }
    var urlObj = url.parse(req.url);
    var pathName = urlObj.pathname.toLowerCase();
    if (!this.postHandlers[pathName]) {
        //没有处理
        return false;
    }
    this.postHandlers[pathName](req, res);
    return true;
}
/**
 * 添加get和post两种方法都允许通过的请求处理逻辑
 * @param route
 * @param fn
 */
proto.all = function (route, fn) {
    var path = route.toLowerCase();
    var handle = fn;
    if (typeof path != "string") {
        throw new TypeError('route must be string');
    }
    if (!this.allHandlers[path]) {
        this.allHandlers[path] = [];
    }
    this.allHandlers[path].push(fn);
}
/**
 * 处理get post不限制的请求
 * @param req
 * @param res
 * @returns {boolean}
 */
proto.handleAll = function (req, res) {
    var urlObj = url.parse(req.url);
    var pathName = urlObj.pathname.toLowerCase();
    if (!this.allHandlers[pathName]) {
        //没有处理
        return false;
    }
    this.allHandlers[pathName](req, res);
    return true;
}
proto.listen = function (port) {
    http.createServer(this).listen(port);
}
/**
 * 设置静态文件所在文件夹
 */
proto.setStaticDir = function (dirName) {
    this.staticDir = dirName;
}
module.exports = createServer;