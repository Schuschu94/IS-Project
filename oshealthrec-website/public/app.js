const serverIp = "http://34.67.49.75:3000";
let token;
let bearer;
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

$(document).ready(function() {

        let url = window.location.href;
        let code = url.split("code=")[1];
        console.log(code);

    $.getJSON('http://34.67.49.75:9999/authenticate/'+code, function(data) {
        token = data.token;
        console.log(data.token);
    });

    fetch(serverIp + "/api/wallet", {
        method: 'get',
        headers: {
            'Authorization': token
        }
    }).then(function (response) {
        console.log(response);
    })
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
});



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
// function checkWallet() {
//     console.log("Vor REST");
//     const userAction = async () => {
//         const response = await fetch(serverIp + "/api/wallet", {
//             method: 'GET',
//             headers: {
//                 'Authorization': bearer
//             }
//         });
//         const myJson = await response.json(); //extract JSON from the http response
//         // do something with myJson
//         console.log(myJson);
//     }
//
//     fetch(serverIp + "/api/wallet", {
//         method: 'get',
//         headers: {
//             'Authorization': bearer
//         }
//     }).then(function (response) {
//         console.log(response);
//     })
//     console.log("Nach REST");
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

