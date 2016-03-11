$(function () {
    var $id = $('input[name="id"]');
    var $name = $('input[name="name"]');
    var $sex = $('input[name="sex"]');
    var $age = $('input[name="age"]');
    var $submit = $('input[name="submit"]');
    var $searchText = $('input[name="search-text"]');
    var $search = $('input[name="search"]');
    var $table = $('.result table');
    var $tBody = $table.find('tbody');

    function jsonParse(userData) {
        var htmlStr = '';
        for (var cur = 0, len = userData.length; cur < len; cur++) {
            htmlStr += '<tr>';
            for (var key in userData[cur]) {
                if (key === 'id') {
                    continue;
                }
                htmlStr += '<td>';
                htmlStr += userData[cur][key];
                htmlStr += '</td>';
            }
            htmlStr += '<td>';
            htmlStr += '<a href="javascript:void 0;" class="update" record-id="' + userData[cur]['id'] + '">修改</a>';
            htmlStr += ' | ';
            htmlStr += '<a href="javascript:void 0;" class="delete" record-id="' + userData[cur]['id'] + '">删除</a>';
            htmlStr += '</td>';
            htmlStr += '</tr>';
        }
        return htmlStr;
    }

    $submit.on('click', function () {
        $.ajax({
            type: 'GET',
            url: '/add',
            data: {
                id: $id.val(),
                name: $name.val(),
                sex: $('input[name="sex"]:checked').val(),
                age: $age.val()
            },
            success: function (data) {
                var userData = JSON.parse(data);
                if ($submit.val() === '修改') {
                    var $updateRecord = $('a[record-id="' + userData[0]['id'] + '"]')
                        .parent().siblings();
                    $updateRecord.eq(0).text(userData[0]['name']);
                    $updateRecord.eq(1).text(userData[0]['sex']);
                    $updateRecord.eq(2).text(userData[0]['age']);
                } else {
                    $tBody.html($tBody.html() + jsonParse(userData));
                }
                $id.val('');
                $name.val('');
                $sex.removeAttr('checked', '');
                $age.val('');
                $('.add .title').text('添加');
                $submit.val('添加');
            }
        })
    });
    function searchEvent() {
        var searchText = $searchText.val() === '' ? '.*?' : $searchText.val();
        $.ajax({
            type: 'GET',
            url: '/search',
            data: {
                searchText: searchText
            },
            success: function (data) {
                var userData = JSON.parse(data);
                var htmlStr = jsonParse(userData);
                $tBody.html(htmlStr);
            }
        })
    }

    searchEvent();
    $search.on('click', searchEvent);
    $table.on('click', '.update', function () {
        var $record = $(this).parent().siblings('td');
        $id.val($(this).attr('record-id'));
        $name.val($($record[0]).text());
        $('input[name="sex"]').removeAttr('checked');
        if ($($record[1]).text() === '男') {
            $('input[value="男"]').attr('checked', '');
        } else {
            $('input[value="女"]').attr('checked', '');
        }
        $age.val($($record[2]).text());
        $('.add .title').text('修改');
        $submit.val('修改');
    });
    $table.on('click', '.delete', function () {
        var $that = $(this);
        $.ajax({
            type: 'GET',
            url: '/delete',
            data: {
                id: $(this).attr('record-id')
            },
            success: function () {
                $that.parents('tr').remove();
            }
        })
    });
})
;