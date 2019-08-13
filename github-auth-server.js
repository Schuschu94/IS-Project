var express = require('express');
var app = express();
var cors = require('cors')
const fetch = require("node-fetch");
const request = require('request');

app.use(cors())

app.post('/token/:code', async function (req, res) {
    let code = req.params.code;

    res.set('Content-Type', 'application/json');
    options = {
        method: 'POST',
        uri: 'https://github.com/login/oauth/access_token',
        formData: {
            client_id: '2e80edb9aac1beb5e0cf',
            client_secret: '19409ed971477475776611a5079a34d2ca0cc360',
            code: code
        },
        headers: {
            accept: 'application/json'
        }
    };

    const accessToken = request(options, function (e, r, b) {
        if (b) {
            const jb = JSON.parse(b);
            console.log(jb);
            res.json(jb);
            return jb.access_token;
        }
    })

    // res.redirect('http://34.67.49.75/access_token:'+accessToken);

    // const response = await fetch('https://github.com/login/oauth/access_token', {
    //     method: 'post',
    //     formData: {
    //         client_id: '2e80edb9aac1beb5e0cf',
    //         client_secret: '19409ed971477475776611a5079a34d2ca0cc360',
    //         code: code
    //     },
    //     headers: {
    //         accept: 'application/json'
    //     },
    // });
    //
    // const token = await JSON.stringify(response.body);
    // console.log(token);
    //
    // res.send(token);


    // fetch('https://github.com/login/oauth/access_token', {
    //     method: 'post',
    //     body: {
    //         client_id: '2e80edb9aac1beb5e0cf',
    //         client_secret: '19409ed971477475776611a5079a34d2ca0cc360',
    //         code: code
    //     },
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(function (response) {
    //     const data = JSON.stringify(response.body);
    //     console.log(data);
    //     res.send(data);
    //     return response;
    // }).catch(function () {
    //     console.log("Token nicht erhalten");
    // });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});