var path = require('path');
var fs = require('fs');

function mkdir(path, root) {
    var dirs = path.split('/'), dir = dirs.shift(), root = (root || '') + dir + '/';
    try {
    	fs.mkdirSync(root); 
    }catch (e) {
        if(!fs.statSync(root).isDirectory()) throw new Error(e);
    }

    if (dirs.length) {
    	mkdir(dirs.join('/'), root)
    }
}

mkdir('parent/child/grandchild');
