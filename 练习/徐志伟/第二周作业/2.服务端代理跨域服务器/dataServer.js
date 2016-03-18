var path=require("path");
var data=require("./data");
var connect=require("./myExpress/connect");
var middle=require("./myExpress/middle");
var app=connect();
app.setStaticDir(path.join(__dirname,"public"));
middle(app);
/**
 * 获取用户
 */
app.get("/users",function (req, res) {
    res.send(JSON.stringify(data.users));
});
/**
 * 添加用户
 */
app.post("/users",function (req, res) {
    var postDta="";
    req.on("data",function (data) {
        postDta+=data;
    });
    req.on("end",function () {
        var users=JSON.parse(postDta);
        users.forEach(function (user) {
            data.users.push(user);
        });
        res.send(JSON.stringify({code:0,msg:"OK"}));
    })
});
app.listen(8081);
