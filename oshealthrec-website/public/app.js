const serverIp = "http://34.67.49.75:3000";
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
//     let url = window.location.href;
//     let code = url.split("code=")[1];
//     console.log(code);

async function checkWallet() {

    // Rest Aufruf um die Wallet des Users zu erhalten
    const response = await fetch(serverIp + "/api/wallet", {
        method: 'GET',
        credentials: 'include'
    });
    const myJson = await response.json(); //extract JSON from the http response

    // Schreibe Inhalt der Wallet in die Konsole
    console.log(myJson);

}
