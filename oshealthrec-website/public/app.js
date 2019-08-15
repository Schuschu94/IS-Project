const serverIp = "http://34.67.49.75:3000";

$(document).ready(async function () {
    let body = $('body');

    // Wird nur auf der Index-Seite ausgeführt
    if (body.hasClass('index')) {
        // Ping Aufruf, um als Antwort den aufrufenden Participant zu erhalten
        const response = await fetch(serverIp + "/api/system/ping", {
            method: 'GET',
            credentials: 'include'
        });

        let participantJson = await response.json();
        // let participantPath = participantJson.participant;
        // Hole Typ des Participants aus dem gesamten Pfad
        // let participantType = participantPath.split("network.").split("#")[0];
        console.log(participantJson);
    }
});

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
