function Request() {

}

Request.request = function (url, method, data, headers) {
    return new Promise(function (success, fail) {
        var req = new XMLHttpRequest();
        req.open(method, url, true);
        req.addEventListener('load', function () {
            success(req.responseText);
        });
        if(headers) {
            Object.keys(headers).forEach(function (header) {
                req.setRequestHeader(header, headers[header]);
            });
        }
        req.send(data);
    });
};

Request.get = function (url, queryParams) {
    return Request.request(url,'GET');
};

Request.post = function (url, queryParams, data, headers) {
    return Request.request(url,'POST', data, headers);
};