function Request() {

}

Request.get = function (url, queryParams) {
    return new Promise(function (success, fail) {
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.addEventListener('load', function () {
            success(req.responseText);
        });
        req.send(null);
    });
};