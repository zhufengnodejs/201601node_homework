function EventEmitter(){
    this._events={};
}
/**
 * 绑定事件
 * @param type
 * @param listener
 */
EventEmitter.prototype.on=function(type,listener){
    if(!this._events[type]){
        this._events[type]=[];
    }
    this._events[type].push(listener);
}
/**
 * 出发事件
 * @param type
 */
EventEmitter.prototype.emit=function(type){
    if(this._events[type]){
        this._events[type].forEach(function(listener){
            listener.apply(null);
        })
    }
}
/**
 * 移除指定事件的指定监听
 * @param type
 * @param listener
 */
EventEmitter.prototype.removeListener=function removeListener(type,listener){
    if(this._events[type]){
        for(var i=0;i<this._events[type].length;i++){
            if(this._events[type][i]===listener){
                this._events[type].splice(i,1);
                return;
            }
        }
    }
}
/**
 * 移除当前事件所有监听
 * @param type
 */
EventEmitter.prototype.removeAllListeners=function(type){
    if(this._events[type]){
        delete this._events[type];
    }
}
/**
 * 绑定只执行一次事件
 * @param type
 * @param listener
 */
EventEmitter.prototype.once=function once(type,listener){
    var fire=false;
    var that=this;
    function g(){
        that.removeListener(type,g);
        if(!fire){
            listener.apply(this,arguments);
            fire=true;
        }
    }
    g.listener=listener;
    this.on(type,g);
}
EventEmitter.prototype.addListener=EventEmitter.prototype.on;
module.exports=EventEmitter;
