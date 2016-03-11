function user(){
}
user.users = [];
/**
 * 检查是否存在当前用户名
 * @param userName 用户名
 * @returns {boolean} 存在返回true，否则返回false
 */
user.existeUser = function (userName) {
    this.users.forEach(function (user) {
        if (user.name === userName) {
            return true;
        }
    });
    return false;
}
/**
 * 查询用户
 * @param userName
 */
user.queryUsers = function (userName) {
    var usersInfo = [];
    this.users.forEach(function (user) {
        if (user.name.indexOf(userName) >= 0) {
            usersInfo.push(user);
        }
    });
    return usersInfo;
}
/**
 * 删除用户
 * @param userName
 * @returns {boolean}
 */
user.deleteUser = function (userName) {
    var userIndex = -1;
    for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].name === userName) {
            userIndex = i;
            break;
        }
    }
    if (userIndex > -1) {
        this.users.splice(userIndex, 1);
        return true;
    } else {
        return false;
    }
}
/**
 * 更新用户信息
 * @param {string} 旧用户名
 * @param newUser 修改后的用户信息
 * @returns {boolean} 更新用户成功返回true，否则返回false
 */
user.updateUser=function(oldUserName, newUser){
    for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].name === oldUserName) {
            this.users[i] = newUser;
            return true;
        }
    }
    return false;
}
module.exports=user;