var EventEmitter = require('./EventEmitter');
var util = require('util');
function Boy(name){
    this.name = name;
    this.say = function(words){
        console.log(this.name+"说：",words);
    }
    EventEmitter.call(this);
}
util.inherits(Boy,EventEmitter);
var xiaoming=new Boy("小明");
var m=xiaoming.say.bind(xiaoming,"这是第一个可多次触发的事件");
xiaoming.on("说话",m);
xiaoming.emit("说话");
xiaoming.on("说话",xiaoming.say.bind(xiaoming,"这是第二个可多次触发的事件"));
xiaoming.removeListener("说话",m);
xiaoming.emit("说话");
xiaoming.removeAllListeners("说话");
xiaoming.once("说话",xiaoming.say.bind(xiaoming,"好话只说一遍"));
xiaoming.emit("说话");
xiaoming.emit("说话");

