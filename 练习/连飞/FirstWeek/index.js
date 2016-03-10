window.onload= function () {
    var register=document.getElementById("register");


    register.onclick= function () {
        var username=document.querySelector("input[name='username']").value;
        var age=document.querySelector("input[name='age']").value;
        var userData={"username":username,"age":age};
        var xhr=new XMLHttpRequest();
        xhr.open("POST","./data",true);
        //xhr.responseType='json';
        xhr.onreadystatechange= function () {
            if(xhr.readyState==4){
                if(xhr.status==200) {
                    var data=JSON.parse(xhr.responseText);
                    //var data=xhr.response;
                    var table=document.querySelector("tbody");
                    var tr=document.createElement("tr");
                    var td=document.createElement("td");
                    var td1=document.createElement("td");
                    td.innerHTML=data.username;
                    td1.innerHTML=data.age;
                    tr.appendChild(td);
                    tr.appendChild(td1);
                    table.appendChild(tr);

                }
            }
        };
        xhr.send(JSON.stringify(userData));


    }

};