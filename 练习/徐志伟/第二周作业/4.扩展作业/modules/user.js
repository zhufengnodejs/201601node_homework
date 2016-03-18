var fs=require("fs");
var user={};
/**
 *添加用户
 * @param userName
 * @param pwd
 * @param callback
 */
user.addUser=function(userName,pwd,callback){
    var that=this;
    this.existeUser(userName,function (data) {
            if(data.code!=0){
                callback(data);
            }else{
                if(data.data!=null){
                    callback({code:1,msg:"已经存在该用户名"});
                }else{
                    fs.readFile("../modules/data.json","utf8",function (err, data) {
                        if(err){
                            console.log("发生错误",err);
                            callback({code:-1,msg:"未知错误"});
                        }else{
                            var users=JSON.parse(data);
                            var newUser={name:userName,pwd:pwd,id:that.getMaxId(users)+1};
                            users.push(newUser);
                            fs.writeFile("../modules/data.json",JSON.stringify(users),"utf8",function (err) {
                                if(!err){
                                    callback({code:0,msg:"ok",data:newUser});
                                }else {
                                    console.log("发生错误",err);
                                    callback({code:-1,msg:"未知错误"});
                                }
                            })
                        }
                    });
                }
            }
        });
};
/**
 * 根据用户名密码获取用户
 * @param userName
 * @param pwd
 * @param callback
 */
user.getUser=function (userName, pwd,callback) {
    fs.readFile("../modules/data.json","utf8",function (err, data) {
        if(err){
            console.log("发生错误",err);
            callback({code:-1,msg:"未知错误"});
        }else{
            var users=JSON.parse(data);
            var user=null;
            for(var i=0;i<users.length;i++){
                if(users[i].name===userName&&users[i].pwd===pwd){
                    user=users[i];
                }
            }
            callback({code:0,msg:"ok",data:user});
        }
    });
};
/**
 * 根据用户名判断用户是否存在
 * @param userName
 * @param callback
 */
user.existeUser=function(userName,callback){
    fs.readFile("../modules/data.json","utf8",function (err, data) {
        if(err){
            console.log("发生错误",err);
            callback({code:-1,msg:"未知错误"});
        }else{
            var users=JSON.parse(data);
            var user=null;
            for(var i=0;i<users.length;i++){
                if(users[i].name===userName){
                    user=users[i];
                }
            }
            callback({code:0,msg:"ok",data:user});
        }
    });
};
/**
 * 获取用户列表最大ID
 * @param users
 * @returns {number}
 */
user.getMaxId=function (users) {
    var maxId=0;
    for(var i=0;i<users.length;i++){
        if(users[i].id>maxId){
            maxId=users[i].id;
        }
    }
    return maxId;
};
module.exports=user;

