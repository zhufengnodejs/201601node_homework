$(function () {
    // controller
    var ajax = {
        init: function () {
            this.xhr = new XMLHttpRequest();
        },
        get: function (url, deBool) {
            var xhr = this.xhr;
            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var user = xhr.response;
                        if (url === '/all') {
                            view.renderTable(user);
                        } else if (deBool) {
                            view.renderDelete(user, url);
                        } else {
                            view.renderSearch(user, url);
                        }
                    }
                }
            };
            xhr.send();
        },
        post: function (url, data) {
            var xhr = this.xhr;
            xhr.open('POST', url, true);
            xhr.responseType = 'json';
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var user = xhr.response;
                        var oUser = JSON.parse(data);
                        if (url === '/register') {
                            view.renderRegister(user, oUser);
                        } else {
                            view.renderUpdate(user, oUser);
                        }
                    } else {
                        view.renderError('Danger: The server response is bad, please contact the server admin.');
                    }
                } else {
                    view.renderError('Danger: The server is off, please contact the server admin.');
                }
            };
            xhr.send(data);
        }
    };

    // starter
    var starter = {
        init: function () {
            ajax.init();
            view.init();
        }
    };

    // view
    var view = {
        // here are all the event adding process
        init: function () {
            var regBtn = $('#regBtn');
            var searchBtn = $('#searchBtn');
            var updateBtn = $('#updateBtn');
            var deleteBtn = $('#deleteBtn');
            var path = window.location.pathname;
            this.$table = $('table.table tbody');
            this.$alertDiv = $('div.alert');
            this.$formName = $('div.formName');
            this.timer = null;
            // event binding for the registration button
            regBtn.click(function (e) {
                var user = {
                    username: $('#formUserName').val(),
                    age: $('#formUserAge').val()
                };
                ajax.post('/register', JSON.stringify(user));
            });
            // event binding for the search button
            searchBtn.click(function (e) {
                var username = $('#formUserName').val();
                ajax.get('/search' + '?username=' + username);
            });
            // event binding for the update button
            updateBtn.click(function (e) {
                var user = {
                    username: $('#formUserName').val(),
                    age: $('#formUserAge').val()
                };
                ajax.post('/update', JSON.stringify(user));
            });
            // event binding for the delete button
            deleteBtn.click(function (e) {
                var username = $('#formUserName').val();
                ajax.get('/delete' + '?username=' + username, true);
            });
            // view route for the / and /spa/html
            if (path === '/' || path === '/spa.html') {
                ajax.get('/all');
            }
        },
        _renderInit: function () {
            this.$alertDiv.removeClass('sr-only').removeClass('alert-success').removeClass('alert-warning').removeClass('alert-danger');
            this.$formName.removeClass('has-error');
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(function () {
                $('div.alert').addClass('sr-only');
                $('div.formName').removeClass('has-error');
            }, 5000);
        },
        renderTable: function (users) {
            var htmlStr = '';
            users.forEach(function (user, index) {
                htmlStr += '<tr>' +
                    '<th scope="row">' + (++index) + '</th>' +
                    '<td>' + user.username + '</td>' +
                    '<td>' + user.age + '</td>' +
                    '</tr>';
            });
            this.$table.html(htmlStr);
        },
        renderSearch: function (user, url) {
            var oUsername = url.replace('/search?username=', '');
            this._renderInit();
            var htmlStr = '';
            if (user && user.age) {
                this.$alertDiv.addClass('alert-success');
                htmlStr = 'As shown in the server, ' + user.username + ' is now ' + user.age + ' years old.';
            } else {
                this.$alertDiv.addClass('alert-warning');
                htmlStr = oUsername + ', whose information is not found in our server, please Try another name.';
                this.$formName.addClass('has-error');
            }
            this.$alertDiv.html(htmlStr);
        },
        renderDelete: function (user, url) {
            var oUsername = url.replace('/delete?username=', '');
            this._renderInit();
            var htmlStr = '';
            if (user && user.age) {
                this.$alertDiv.addClass('alert-success');
                htmlStr = user.username + ' who is now ' + user.age + ' years old, has been deleted in the server.';
            } else {
                this.$alertDiv.addClass('alert-warning');
                htmlStr = oUsername + ', whose information is not found in our server, please Try another name.';
                this.$formName.addClass('has-error');
            }
            this.$alertDiv.html(htmlStr);
        },
        renderRegister: function (user, oUser) {
            var htmlStr = '';
            this._renderInit();
            if (user && user.username) {
                this.$alertDiv.addClass('alert-success');
                htmlStr = user.username + ', who is ' + user.age + ' years old, has been added to the server.';
            } else {
                this.$alertDiv.addClass('alert-warning');
                htmlStr = oUser.username + ', who is ' + oUser.age + ' years old, is has been uploaded in the server, please Try again.';
                this.$formName.addClass('has-error');
            }
            this.$alertDiv.html(htmlStr);
        },
        renderUpdate: function (user, oUser) {
            var htmlStr = '';
            this._renderInit();
            if (user) {
                this.$alertDiv.addClass('alert-success');
                htmlStr = user[0].username + ', who is originally recorded with ' + user[0].age + ' years old, has been changed to ' + user[1].age + ' the server.';
            } else {
                this.$alertDiv.addClass('alert-warning');
                htmlStr = oUser.username + ', who is ' + oUser.age + ' years old, is not recorded in the server, please Try a user who has been recorded in our server.';
                this.$formName.addClass('has-error');
            }
            this.$alertDiv.html(htmlStr);
        },
        renderError: function (str) {
            this._renderInit();
            this.$alertDiv.addClass('alert-danger');
            this.$alertDiv.html(str);
        }
    };

    // start the project
    starter.init();
});