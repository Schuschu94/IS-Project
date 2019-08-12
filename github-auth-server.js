const express = require('express')
const app = express()

// Import the axios library, to make HTTP requests
const axios = require('axios')

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = '2e80edb9aac1beb5e0cf'
const clientSecret = '19409ed971477475776611a5079a34d2ca0cc360'


// Declare the redirect route
app.get('/home', (req, res) => {

    // The req.query object has the query params that were sent to this route.
    const requestToken = req.query.code

    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        // Set the content type header, so that we get the response in JSON
        headers: {
            accept: 'application/json'
        }

    }).then((response) => {

        const accessToken = response.data.access_token
        console.log(response.data)

        // redirect the user to the home page, along with the access token
        res.redirect(`/index.html?access_token=${accessToken}`)
    })
})

app.use(express.static(__dirname))
app.listen(8081,()=>{
    console.log("Server listening on port : 8081")
})

// var express = require('express');
// var app = express();
// const fetch = require("node-fetch");
//
//
// app.post('/token/:code', async function (req, res) {
//     let code = req.params.code;
//
//     const response = await fetch('https://github.com/login/oauth/access_token', {
//         method: 'post',
//         body: {
//             'client_id': '2e80edb9aac1beb5e0cf',
//             'client_secret': '19409ed971477475776611a5079a34d2ca0cc360',
//             'code': code
//         },
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     });
//
//     const token = await response.toString();
//     console.log(token);
//
//     res.end(token);
//
//     // fetch('https://github.com/login/oauth/access_token', {
//     //     method: 'post',
//     //     body: {
//     //         'client_id': '2e80edb9aac1beb5e0cf',
//     //         'client_secret': '19409ed971477475776611a5079a34d2ca0cc360',
//     //         'code': code
//     //     },
//     //     headers: {
//     //         'Content-Type': 'application/json'
//     //     }
//     // }).then(function (response) {
//     //     return response;
//     // }).then(function (tokenData) {
//     //     console.log(tokenData);
//     //     res.end(token);
//     // }).catch(function () {
//     //     console.log("Token nicht erhalten");
//     // });
// });
//
// var server = app.listen(8081, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log("Example app listening at http://%s:%s", host, port)
// });