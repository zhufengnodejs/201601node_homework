var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime');

http.createServer(function (request, response) {
        var pathName = url.parse(request.url, true).pathname;

        if (pathName == '/') {
            pathName = '/index.html';
        }

        switch (pathName) {
            case '/favicon.ico':
                return response.end('');
                break;
            case '/add':
                var str = '';
                request.on('data', function (data) {
                    str += decodeURIComponent(data.toString());
                });
                request.on('end', function () {
                    var personList = [];
                    fs.readFile('./data.json', function (err, data) {
                        if (!err) {
                            if (data.toString() != '') {
                                personList = JSON.parse(data);
                            }
                            var arrTemp = str.split('&'), obj = {};
                            arrTemp.forEach(function (item, index) {
                                var arr = item.split('=');
                                obj[arr[0]] = arr[1];
                            })
                            if (personList.length == 0) {
                                obj.id = 1;
                            } else {
                                obj.id = personList[personList.length - 1].id + 1;
                            }
                            personList.push(obj);
                            fs.writeFile('./data.json', JSON.stringify(personList), 'utf8', function (err) {
                                if (!err) {
                                    response.end('{"status":"success"}');
                                } else {
                                    response.end('{"status":"failed"}');
                                }
                            })
                        }
                    })
                })
                break;
            case '/query':
                fs.readFile('./data.json', function (err, data) {
                    if (!err) {
                        data = data.toString() == '' ? '[]' : data.toString();
                        response.end('{"status":"success","value":' + data + '}');
                    }
                })
                break;
            case '/delete':
                var ids = '';
                request.on('data', function (data) {
                    ids += decodeURIComponent(data.toString());
                });
                request.on('end', function () {
                    ids = JSON.parse(ids);
                    fs.readFile('./data.json', function (err, data) {
                            if (!err) {
                                var datas = JSON.parse(data.toString());
                                for (var i = 0; i < ids.length; i++) {
                                    for (var j = 0; j < datas.length; j++) {
                                        if (ids[i] == datas[j].id) {
                                            datas.splice(j, 1);
                                            j--;
                                        }
                                    }
                                }
                                fs.writeFile('./data.json', JSON.stringify(datas), function (err) {
                                    if (!err) {
                                        response.end('{"status":"success","value":' + JSON.stringify(datas) + '}');
                                    }
                                })
                            }
                        }
                    )
                })
                break;
            case '/edit':
                var str = '';
                request.on('data', function (data) {
                    str += decodeURIComponent(data.toString());
                });
                request.on('end', function () {
                    var parmObj = JSON.parse(str);

                    fs.readFile('./data.json', function (err, data) {
                        if (!err) {
                            var personList = [];
                            if (data.toString() != '') {
                                personList = JSON.parse(data.toString());
                            }
                            for (var i = 0; i < personList.length; i++) {
                                if (personList[i].id == parmObj.id) {
                                    personList[i].name = parmObj.name;
                                    personList[i].age = parmObj.age;
                                }
                            }
                            fs.writeFile('./data.json', JSON.stringify(personList), 'utf8', function (err) {
                                if (!err) {
                                    response.end('{"status":"success","value":' + JSON.stringify(personList) + '}');
                                } else {
                                    response.end('{"status":"failed"}');
                                }
                            })
                        }
                    })
                })
                break;
            default :
                fs.readFile('.' + pathName, function (err, data) {
                    response.setHeader('Content-Type', mime.lookup(pathName) + ';charset=utf8');
                    response.end(data.toString());
                })
        }
    }
).
    listen('8080', 'localhost');