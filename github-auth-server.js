
var express = require('express');
var app = express();
var cors = require('cors')
const fetch = require("node-fetch");

app.use(cors())

app.post('/token/:code', async function (req, res) {
    let code = req.params.code;

    // const response = await fetch('https://github.com/login/oauth/access_token', {
    //     method: 'post',
    //     body: {
    //         client_id: '2e80edb9aac1beb5e0cf',
    //         client_secret: '19409ed971477475776611a5079a34d2ca0cc360',
    //         code: code
    //     },
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // });
    //
    // const token = await JSON.stringify(response.body);
    // console.log(token);
    //
    // res.end(token);


    fetch('https://github.com/login/oauth/access_token', {
        method: 'post',
        body: {
            client_id: '2e80edb9aac1beb5e0cf',
            client_secret: '19409ed971477475776611a5079a34d2ca0cc360',
            code: code
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        const data = response.body;
        console.log(data);
        res.send(data);
        return response;
    }).catch(function () {
        console.log("Token nicht erhalten");
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});