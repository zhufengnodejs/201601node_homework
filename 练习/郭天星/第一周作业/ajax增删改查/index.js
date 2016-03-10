/*添加*/
$('.add').click(function () {
    var flag = true;
    $('input[type=text]').each(function () {
        if ($(this).val() == '') {
            flag = false;
            alert($(this).attr('title') + '不可为空！');
            $(this).focus();
            return false;
        }
    })
    if (!flag) {
        return false;
    }
    var reg = /^\d{1,2}$/;
    if (!reg.test($.trim($('#txtAge').val()) * 1)) {
        alert('请输入正确的年龄！');
        $('#txtAge').focus();
        return false;
    }
    var parm = '{"name":"' + $('#txtName').val() + '", "age":"' + $('#txtAge').val() + '"}';
    $.ajax({
        url: '/add',
        type: 'post',
        dataType: 'json',
        data: JSON.parse(parm),
        success: function (data) {
            if (data.status == 'success') {
                alert('添加成功！');
            }
        },
        error: function (xhr, status, msg) {
            console.log(msg);
        }
    })
})

//编辑
$('.edit').click(function () {
    if ($('.tr-active').length == 0) {
        alert('请选择要编辑的数据！');
        return false;
    }
    var flag = true;
    $('input[type=text]').each(function () {
        if ($(this).val() == '') {
            flag = false;
            alert($(this).attr('title') + '不可为空！');
            $(this).focus();
            return false;
        }
    })
    if (!flag) {
        return false;
    }
    var parm = '{"name":"' + $('#txtName').val() + '", "age":"' + $('#txtAge').val() + '","id":' + $('.tr-active').children(':first').children().val() + '}';
    $.ajax({
        url: '/edit',
        type: 'post',
        dataType: 'json',
        data: parm,
        success: function (data) {
            if (data.status == 'success') {
                alert('保存成功！');
                loadData(data.value);
            }
        },
        error: function (xhr, status, msg) {
            console.log(msg);
        }
    })
})

/*查询*/
$('.query').click(function () {
    $.ajax({
        url: '/query?v=' + new Date(),
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (data.status == 'success') {
                loadData(data.value);
                $('.tables').show();
            }
        },
        error: function (xhr, status, msg) {
            console.log(msg);
        }
    })
})


$('.delete').click(function () {
    var ids = [];
    $('input[type=checkbox]:checked').each(function (item, i) {
        ids.push($(this).val());
    })
    if (ids.length == 0) {
        return false;
    }
    if (confirm('确定删除吗？')) {
        $.ajax({
            url: '/delete',
            type: 'post',
            data: JSON.stringify(ids),
            dataType: 'json',
            success: function (data) {
                if (data.status == 'success') {
                    loadData(data.value);
                }
            },
            error: function (xhr, status, msg) {
                console.log(msg);
            }
        })
    }
})

//全选、反选
$('.ckAll').click(function () {
    var val = this.checked;
    $('.ck').each(function (item, i) {
        this.checked = val;
    })
})

//渲染表格
function loadData(values) {
    var str = '';
    for (var i = 0; i < values.length; i++) {
        str += '<tr ondblclick="dbClick(this)"><td><input class="ck" value="' + values[i].id + '"type="checkbox"></td><td>' + values[i].name + '</td><td>' + values[i].age + '</td></tr>';
    }
    if (str == '') {
        $('.tables table tbody').empty().append('<tr><td colspan="3">暂无数据~</td></tr>');
    } else {
        $('.tables table tbody').empty().append(str);
    }

    //反选
    $('.ck').click(function () {
        var flag = true;
        $('.ck').each(function (item, i) {
            if (!this.checked) {
                flag = flag && this.checked;
            }
        })
        if (flag) {
            $('.ckAll')[0].checked = true;
        } else {
            $('.ckAll')[0].checked = false;
        }
    })
}

function dbClick(obj) {
    $(obj).siblings().removeClass('tr-active');
    $(obj).addClass('tr-active');
    $('#txtName').val($(obj).children().eq(1).text());
    $('#txtAge').val($(obj).children().eq(2).text());
}