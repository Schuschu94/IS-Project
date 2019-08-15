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
        let participantPath = participantJson.participant;

        // Hole Typ des Participants aus dem gesamten Pfad
        let participantType = participantPath.split("network.")[1].split("#")[0];
        let participantId = participantPath.split("network.")[1].split("#")[1];

        // Speichere Infos im Session Storage
        sessionStorage.setItem("participantType", participantType);
        sessionStorage.setItem("participantId", participantId);

        // Leite den Nutzer auf die entsprechende Seite weiter
        if (participantType == 'Patient') {
            window.location.href = "patient/profil.html";
        } else if (participantType == 'Employee') {
            window.location.href = "mitarbeiter/profil.html";
        } else if (participantType == 'Doctor') {
            window.location.href = "doktor/profil.html";
        }

    // Wird nur auf der Profil Seite des Patienten ausgeführt
    } else if (body.hasClass('patient-profil')){

        // Hole ID des Nutzers aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");

        // Hole Profil Daten des Nutzers aus der Blockchain
        const response = await fetch(serverIp + "/api/org.oshealthrec.network.Patient/" + participantId, {
            method: 'GET',
            credentials: 'include'
        });
        let profilJson = await response.json();

        // Hole Textfelder als jquery Variable
        let vorname = $('#vorname');
        let nachname = $('#nachname');
        let geschlecht = $('#geschlecht');
        let geburtsdatum = $('#geburtsdatum');
        let blutgruppe = $('#blutgruppe');

        // Setz Werte der Textfelder
        vorname.text(profilJson.givenname);
        nachname.text(profilJson.surname);
        geschlecht.text(profilJson.sex);
        geburtsdatum.text(profilJson.birthday);
        blutgruppe.text(profilJson.bloodType);
    } else if (body.hasClass('mitarbeiter-profil')){

        // Hole ID des Nutzers aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");

        // Hole Profil Daten des Nutzers aus der Blockchain
        const response = await fetch(serverIp + "/api/org.oshealthrec.network.Employee/" + participantId, {
            method: 'GET',
            credentials: 'include'
        });
        let profilJson = await response.json();

        // Hole Textfelder als jquery Variable
        let vorname = $('#vorname');
        let nachname = $('#nachname');
        let geschlecht = $('#geschlecht');
        let geburtsdatum = $('#geburtsdatum');

        // Setz Werte der Textfelder
        vorname.text(profilJson.givenname);
        nachname.text(profilJson.surname);
        geschlecht.text(profilJson.sex);
        geburtsdatum.text(profilJson.birthday);
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
