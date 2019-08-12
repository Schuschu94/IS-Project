var express = require('express');
var app = express();
const fetch = require("node-fetch");


app.post('/token/:code', function (req, res) {
    let code = req.param('code');
    fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        body: {
            'client_id': '2e80edb9aac1beb5e0cf',
            'client_secret': '19409ed971477475776611a5079a34d2ca0cc360',
            'code': code
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        console.log("Token gesendet: " +response.json());
        res.end(response.json());
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});