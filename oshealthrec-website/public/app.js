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

        // Hole Typ und Id des Participants aus dem gesamten Pfad
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
    } else if (body.hasClass('patient-profil')) {

        // Hole ID und Typ des Nutzers aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Patienten handelt
        if (participantType != "Patient") {
            window.location.href = "../index.html";
        }

        // Hole Profil Daten des Nutzers aus der Blockchain
        const response = await fetch(serverIp + "/api/org.oshealthrec.network.Patient/" + participantId, {
            method: 'GET',
            credentials: 'include'
        });
        let profilJson = await response.json();
        // Speichere Profil Daten im SessionStorage
        let patientProfil = JSON.stringify(profilJson);
        sessionStorage.setItem("patientProfil", patientProfil);

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

        // Wird nur auf der Profil Seite des Mitarbeiter ausgeführt
    } else if (body.hasClass('mitarbeiter-profil')) {

        // Hole ID des Nutzers aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Mitarbeiter handelt
        if (participantType != "Employee") {
            window.location.href = "../index.html";
        }

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

        // Wird nur auf der Profil Seite des Doktors ausgeführt
    } else if (body.hasClass('doktor-profil')) {

        // Hole ID des Nutzers aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Arzt handelt
        if (participantType != "Doctor") {
            window.location.href = "../index.html";
        }

        // Hole Profil Daten des Nutzers aus der Blockchain
        const response = await fetch(serverIp + "/api/org.oshealthrec.network.Doctor/" + participantId, {
            method: 'GET',
            credentials: 'include'
        });
        let profilJson = await response.json();

        // Hole Textfelder als jquery Variable
        let vorname = $('#vorname');
        let nachname = $('#nachname');
        let geschlecht = $('#geschlecht');
        let geburtsdatum = $('#geburtsdatum');
        let anschrift = $('#anschrift');

        // Setz Werte der Textfelder
        vorname.text(profilJson.givenname);
        nachname.text(profilJson.surname);
        geschlecht.text(profilJson.sex);
        geburtsdatum.text(profilJson.birthday);
        anschrift.html(profilJson.street + "<br />"
            + profilJson.zipcode + " " + profilJson.city + "<br />"
            + profilJson.country)

        // Wird nur auf der Arzt-Suche Seite des Patienten ausgeführt
    } else if (body.hasClass('patient-arzt-suche')) {

        // Hole ID des Nutzers aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Patienten handelt
        if (participantType != "Patient") {
            window.location.href = "../index.html";
        }

        // Hole Tabelle als jquery Variable
        let arztTabelle = $('#arztTabelle');

        // Rest Aufruf um alle Doktoren zu erhalten
        const response = await fetch(serverIp + "/api/org.oshealthrec.network.Doctor", {
            method: 'GET',
            credentials: 'include'
        });
        const doctorArray = await response.json(); //extract JSON from the http response

        doctorArray.forEach(function (doctor) {
            let appendString = "<tr>" +
                "<td>" + doctor.givenname + " " + doctor.surname + "</td>" +
                "<td>" + doctor.street + "<br />" + doctor.zipcode + " " + doctor.city + "<br />" + doctor.country + "</td>" +
                "<td><input type=\"checkbox\" class=\"form-check-input bigger-checkbox\"></td>" +
                "</tr>";

            arztTabelle.append(appendString);
        });

        // Wird nur auf der Freigaben-Seite des Patienten aufgerufen
    } else if (body.hasClass('patient-freigaben')) {
        // Hole Daten aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");


        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Patienten handelt
        if (participantType != "Patient") {
            window.location.href = "../index.html";
        }

        // Hole Profil Daten des Patienten aus der Blockchain, falls sie nicht im Session Storage gespeichert sind.
        if (sessionStorage.getItem("patientProfil") == null) {
            // Hole Profil Daten des Nutzers aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Patient/" + participantId, {
                method: 'GET',
                credentials: 'include'
            });
            let profilJson = await response.json();
            // Speichere Profil Daten im SessionStorage
            let patientProfil = JSON.stringify(profilJson);
            sessionStorage.setItem("patientProfil", patientProfil);
        }

        let patientProfil = JSON.parse(sessionStorage.getItem("patientProfil"));
        let doctorArray = patientProfil.doctors;

        if(doctorArray.length == 1) {
            let doctorId = doctorArray[0].split("#")[1];
            let filterString = "?filter=%7B%22where%22%3A%7B%22personID%22%3A%22" + doctorId + "%22%7D%7D";

            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Doctor" + filterString, {
                method: 'GET',
                credentials: 'include'
            });
            let doctorJson = await response.json();
            console.log(doctorJson);
        }

    }
});

function filterDoctorTable() {
    // Variablen deklarieren
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputVorname");
    filter = input.value.toUpperCase();
    table = document.getElementById("arztTabelle");
    tr = table.getElementsByTagName("tr");

    // Zeige alle Zeilen an
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }

    // Rufe die einzelnen Filter-Funktionen auf
    filterDoctorTableByGivenname();
    filterDoctorTableBySurname();
    filterDoctorTableByStreet();
    filterDoctorTableByCity();
}

function filterDoctorTableByGivenname() {
    // Variablen deklarieren
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputVorname");
    filter = input.value.toUpperCase();
    table = document.getElementById("arztTabelle");
    tr = table.getElementsByTagName("tr");

    // Prüfe alle Tabllen Reihen und blende die aus, die nicht dem Filter entsprechen
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                // tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterDoctorTableBySurname() {
    // Variablen deklarieren
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputNachname");
    filter = input.value.toUpperCase();
    table = document.getElementById("arztTabelle");
    tr = table.getElementsByTagName("tr");

    // Prüfe alle Tabllen Reihen und blende die aus, die nicht dem Filter entsprechen
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                // tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterDoctorTableByStreet() {
    // Variablen deklarieren
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputStraße");
    filter = input.value.toUpperCase();
    table = document.getElementById("arztTabelle");
    tr = table.getElementsByTagName("tr");

    // Prüfe alle Tabllen Reihen und blende die aus, die nicht dem Filter entsprechen
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                // tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterDoctorTableByCity() {
    // Variablen deklarieren
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputOrt");
    filter = input.value.toUpperCase();
    table = document.getElementById("arztTabelle");
    tr = table.getElementsByTagName("tr");

    // Prüfe alle Tabllen Reihen und blende die aus, die nicht dem Filter entsprechen
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                // tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

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
