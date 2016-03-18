$(document).ready(function () {
    $("#regBtn").click(function () {
        var userName = $("#userName").val();
        var pwd = $("#pwd").val();
        var pwd2 = $("#pwd2").val();
        if (userName.length <= 0) {
            alert("用户名不能为空");
            return;
        }
        if (pwd.length <= 0) {
            alert("密码不能为空");
            return;
        }
        if (pwd2.length <= 0) {
            alert("确认密码不能为空");
            return;
        }
        if (pwd != pwd2) {
            alert("两次输入的密码不一致");
            return;
        }
        var postData = "name=" + userName + "&pwd=" + pwd;
        $.ajax({
            type: 'POST',
            url: "/users/reg.html",
            data: postData,
            success: function (data) {
                if (data.code === 0) {
                    window.location.href = "/";
                } else {
                    alert(data.msg);
                }
            },
            error:function (err) {
              alert(JSON.stringify(err));
            },
            dataType: "json"
        });
    });

});
$(document).ready(function () {
    $("#loginBtn").click(function () {
        var userName = $("#userName").val();
        var pwd = $("#pwd").val();
        if (userName.length <= 0) {
            alert("用户名不能为空");
            return;
        }
        if (pwd.length <= 0) {
            alert("密码不能为空");
            return;
        }
        var postData = "name=" + userName + "&pwd=" + pwd;
        $.ajax({
            type: 'POST',
            url: "/users/login.html",
            data: postData,
            success: function (data) {
                if (data.code === 0) {
                    window.location.href = "/";
                } else {
                    alert("用户名或密码错误");
                }
            },
            error:function (err) {
                alert(JSON.stringify(err));
            },
            dataType: "json"
        });
    });
});
