const serverIp = "http://34.67.49.75:3000";
let token;
let tokenType;
//
// $(document).ready(function() {
//     var body = $('body');
//
//     // Wird nur auf der Profil-Seite des Patienten ausgeführt
//     if (body.hasClass('patient-profil')) {
//         // Aufruf des Rest-Servers
//         const userAction = async () => {
//             const response = await fetch(serverIp + "/org.oshealthrec.network.Patient");
//             const myJson = await response.json(); //extract JSON from the http response
//             // do something with myJson
//         }
//     }
// });

// function getCookie(cname){
//     let name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(";");
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//
//     return "";
// }

// $(document).ready(async function () {
//
//     let url = window.location.href;
//     let code = url.split("code=")[1];
//     console.log(code);
//
//     const response = await fetch('http://34.67.49.75:8081/token/' + code, {
//         method: 'post'
//     })
//
//     let data = await response.json();
//     token = data.access_token;
//     tokenType = data.token_type;
//
//     console.log(token);
//     console.log(tokenType);

    // $.post('http://34.67.49.75:8081/token/'+code, function(data) {
    //     token = data;
    //     console.log(data)
    // }).then(function () {

    // console.log("TEST");
    // $.getJSON('http://34.67.49.75:3000/api/wallet?access_token='+token, function (walletData) {
    //     console.log('Test im REST Aufruf');
    //     console.log(walletData);
    // })
    // });

    // let access_token = getCookie('access_token');
    // console.log(access_token);

//
//         fetch('https://github.com/login/oauth/access_token', {
//             method: 'POST',
//             body: {
//                 'client_id': '2e80edb9aac1beb5e0cf',
//                 'client_secret': '19409ed971477475776611a5079a34d2ca0cc360',
//                 'code': code },
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(function (response) {
//             return response.json();
//         }).then(function (myJson) {
//             console.log(JSON.stringify(myJson));
//         })
// });


// $(document).ready(function () {
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//             var cred = firebase.auth.OAuthCredential;
//             console.log(cred.accessToken);
//         } else {
//             // No user is signed in.
//         }
//     });
//
// })

// function signIn() {
// }
//
// async function checkWallet() {
//     console.log("Vor REST");
//     const response = await fetch(serverIp + "/api/wallet?access_token=" + token, {
//         method: 'GET',
//         // headers: {
//         //     'X-Access-Token': token
//         // }
//     });
//     const myJson = await response.json(); //extract JSON from the http response
//     // do something with myJson
//     console.log(myJson);

    // fetch(serverIp + "/api/wallet", {
    //     method: 'get',
    //     headers: {
    //         'Authorization': bearer
    //     }
    // }).then(function (response) {
    //     console.log(response);
    // })
    console.log("Nach REST");
// }
//
// function importCard() {
//     console.log("Test");
//
//
//     // Datei Upload
//     const input = document.getElementById('fileInput');
//     const file = input.files[0];
//     console.log(file);
//
//     const upload = (file) => {
//         fetch(serverIp + "/api/wallet/import", {
//             method: 'POST',
//             headers: {
//                 'Authorization': bearer
//             },
//             body: file, // string or object
//         }).then(function (response) {
//             console.log(response);
//         }).then(
//             success => console.log(success) // Handle the success response object
//         ).catch(
//             error => console.log(error) // Handle the error response object
//         );
//     };
//     console.log("Nach dem Rest");
// }

