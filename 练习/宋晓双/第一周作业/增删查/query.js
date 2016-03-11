
var sub = document.getElementById("sub");
var query = document.getElementById("query");
var number=0;
sub.addEventListener("click", function () {
    number++;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var userInfo = {
        username: username,
        password: password,
        id:number
    }
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/reg", true);
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {///请求在处理中
            if (xhr.status == 200) {//请求成功
                var data=xhr.response;
                var str="";
                    str+="<tr id='t"+data.id+"'>";
                    str+="<td>"+data.username+"</td>";
                    str+="<td>"+data.password+"</td>";
                    str+="<td><p class='delete' id='"+data.id+"' onclick='del("+data.id+")'>删除</p></td>";
                    str+="</tr>";
                }
               $("#table").append(str);
            }
        };
    xhr.send(JSON.stringify(userInfo));
});
$("#query").on("click",(function(){
    var username = document.getElementById("username").value;
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/query", true);
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {///请求在处理中
            if (xhr.status == 200) {//请求成功
                var data=xhr.response;
               if(data!=null){
                 var str="";
                 str+="<tr>";
                 str+="<td>"+data+"</td>";
                 str+="</tr>";
                 $("#tableQuery").append(str);
                 }else{
                   var str="";
                   str+="<tr>";
                   str+="<td>没有此商品</td>";
                   str+="</tr>";
                   $("#tableQuery").append(str);
               }
           }
        }
    };
    xhr.send(username);
}));
function del(id){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var userInfo = {
        username: username,
        password: password,
        id:id
    }
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/delete", true);
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {///请求在处理中
            if (xhr.status == 200) {//请求成功
                var data=xhr.response;
                   for(var i=0;i<data.length;i++){
                       if(data[i].id==id){
                          $("#t"+id).remove();
                       }
                   }
            }
        }
    };
    xhr.send(JSON.stringify(userInfo));
};



