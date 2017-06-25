var ramlMocker = require('raml-1-mocker');
var options = {
    path: '.'
};


var callback = function (ramlRequests){
    var express = require('express')
    var app = express()
    app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });

    ramlRequests.forEach(function(reqToMock){
        app[reqToMock.method](reqToMock.uri, function(req,res){
            let code;
            if (reqToMock.defaultCode) {
                code = reqToMock.defaultCode;
            }
            console.log(reqToMock);
            if(reqToMock.example)
                res.status(code).send(reqToMock.example());
            else res.status(code).end();
        });
    });

    let port = process.env.PORT || 3000;
    app.listen(port, function () {
      console.log(`Mock server started at port ${port}`)
    })
};
ramlMocker.generate(options, callback);
