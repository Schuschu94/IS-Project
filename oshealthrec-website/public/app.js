const serverIp = "http://34.67.49.75:3000";

/**
 * Wird beim Laden jeder Seite aufgerufen
 * über "body.hasClass('X') wird abgefragt, um welche Seite es sich handelt
 */
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

        // Speichere Profil Daten im SessionStorage
        let doktorProfil = JSON.stringify(profilJson);
        sessionStorage.setItem("doktorProfil", doktorProfil);

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

        // Gebe Informationen von allen Doktoren aus
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

        // Hole Patienten Profil aus dem SessionStorage
        let patientProfil = JSON.parse(sessionStorage.getItem("patientProfil"));
        // Hole Ärzte, denen der Patient eine Freigabe erteilt hat
        let doctorArray = patientProfil.doctors;

        // Hole Tabelle als jquery Variable
        let arztTabelle = $('#arztTabelle');

        // Falls nur ein Arzt eine Freigabe besitzt
        if (doctorArray.length == 1) {
            // Filter String um nach dem Dokter mit der doctorId zu suchen
            let doctorId = doctorArray[0].split("#")[1];
            let filterString = "?filter=%7B%22where%22%3A%7B%22personID%22%3A%22" + doctorId + "%22%7D%7D";

            // Hole Doktor aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Doctor" + filterString, {
                method: 'GET',
                credentials: 'include'
            });
            let doctorProfileArray = await response.json();
            let doctor = doctorProfileArray[0];

            // Gebe Informationen des Doktors aus
            let appendString = "<tr>" +
                "<td>" + doctor.givenname + " " + doctor.surname + "</td>" +
                "<td>" + doctor.street + "<br />" + doctor.zipcode + " " + doctor.city + "<br />" + doctor.country + "</td>" +
                "<td><input type=\"checkbox\" class=\"form-check-input bigger-checkbox\"></td>" +
                "</tr>";
            arztTabelle.append(appendString);

            // Falls mehrere Ärzte eine Freigabe besitzen
        } else if (doctorArray.length > 1) {
            // Anfang des Filter Strings für mehrere Ärzte
            let filterString = "?filter=%7B%22where%22%3A%7B%22or%22%3A%5B";
            let firstDoctor = true;

            // Füge alle IDs der Ärzte zum Filter String hinzu
            doctorArray.forEach(function (doctor) {
                let doctorId = doctor.split("#")[1];
                if (firstDoctor) {
                    // Beim ersten Arzt gibt es kein Komma am Anfang
                    filterString += "%7B%22personID%22%3A%22" + doctorId + "%22%7D";
                    firstDoctor = false;
                } else {
                    // Bei den folgenden Ärzten gibt es ein Komma am Anfang
                    filterString += "%2C%7B%22personID%22%3A%22" + doctorId + "%22%7D";
                }
            });
            // Füge abschließende Klammern zum Filter String hinzu
            filterString += "%5D%7D%7D";

            // Hole Profile aller Doktoren mit einer Freigabe aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Doctor" + filterString, {
                method: 'GET',
                credentials: 'include'
            });
            let doctorProfileArray = await response.json();

            // Gebe Daten für alle Ärzte aus
            doctorProfileArray.forEach(function (doctor) {
                let appendString = "<tr>" +
                    "<td>" + doctor.givenname + " " + doctor.surname + "</td>" +
                    "<td>" + doctor.street + "<br />" + doctor.zipcode + " " + doctor.city + "<br />" + doctor.country + "</td>" +
                    "<td><input type=\"checkbox\" class=\"form-check-input bigger-checkbox\"></td>" +
                    "</tr>";

                arztTabelle.append(appendString);
            })
        }

        // Wird nur auf der Mitarbeiter-Seite des Doktors ausgeführt
    } else if (body.hasClass('doktor-mitarbeiter')) {
        // Hole ID des Nutzers aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Arzt handelt
        if (participantType != "Doctor") {
            window.location.href = "../index.html";
        }

        // Hole Profil Daten des Doktors aus der Blockchain, falls sie nicht im Session Storage gespeichert sind.
        if (sessionStorage.getItem("doktorProfil") == null) {
            // Hole Profil Daten des Nutzers aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Doktor/" + participantId, {
                method: 'GET',
                credentials: 'include'
            });
            let profilJson = await response.json();

            // Speichere Profil Daten im SessionStorage
            let doktorProfil = JSON.stringify(profilJson);
            sessionStorage.setItem("doktorProfil", doktorProfil);
        }
        // Hole Doktor Profil aus dem SessionStorage
        let doktorProfil = JSON.parse(sessionStorage.getItem("doktorProfil"));

        // Hole MitarbeiterIDs des Doktors
        let employeeArray = doktorProfil.employees;

        // Hole Tabelle als jquery Variable
        let mitarbeiterTabelle = $('#mitarbeiterTabelle');

        // Falls nur ein Mitarbeiter vorhanden ist
        if (employeeArray.length == 1) {
            // Filter String um nach dem Mitarbeiter mit der employeeId zu suchen
            let employeeId = employeeArray[0].split("#")[1];
            let filterString = "?filter=%7B%22where%22%3A%7B%22personID%22%3A%22" + employeeId + "%22%7D%7D";

            // Hole Mitarbeiter aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Employee" + filterString, {
                method: 'GET',
                credentials: 'include'
            });
            let employeeProfileArray = await response.json();
            let employee = employeeProfileArray[0];

            // Gebe Informationen des Doktors aus
            let appendString = "<tr>" +
                "<td>" + employee.givenname + " " + employee.surname + "</td>" +
                "<td>" + employee.birthday + "</td>" +
                "<td><input type=\"checkbox\" class=\"form-check-input bigger-checkbox\"></td>" +
                "</tr>";
            mitarbeiterTabelle.append(appendString);

            // Falls mehrere Mitarbeiter vorhanden sind
        } else if (employeeArray.length > 1) {
            // Anfang des Filter Strings für mehrere Mitarbeiter
            let filterString = "?filter=%7B%22where%22%3A%7B%22or%22%3A%5B";
            let firstEmployee = true;

            // Füge alle IDs der Mitarbeiter zum Filter String hinzu
            employeeArray.forEach(function (employee) {
                let employeeId = employee.split("#")[1];
                if (firstEmployee) {
                    // Beim ersten Mitarbeiter gibt es kein Komma am Anfang
                    filterString += "%7B%22personID%22%3A%22" + employeeId + "%22%7D";
                    firstEmployee = false;
                } else {
                    // Bei den folgenden Mitarbeitern gibt es ein Komma am Anfang
                    filterString += "%2C%7B%22personID%22%3A%22" + employeeId + "%22%7D";
                }
            });
            // Füge abschließende Klammern zum Filter String hinzu
            filterString += "%5D%7D%7D";

            // Hole Profile aller Mitarbeiter mit einer Freigabe aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Employee" + filterString, {
                method: 'GET',
                credentials: 'include'
            });
            let employeeProfileArray = await response.json();

            // Gebe Daten für alle Mitarbeiter aus
            employeeProfileArray.forEach(function (employee) {
                let appendString = "<tr>" +
                    "<td>" + employee.givenname + " " + employee.surname + "</td>" +
                    "<td>" + employee.birthday + "</td>" +
                    "<td><input type=\"checkbox\" class=\"form-check-input bigger-checkbox\"></td>" +
                    "</tr>";

                mitarbeiterTabelle.append(appendString);
            })

        }
    } else if (body.hasClass('doktor-patienten')) {
        // Hole ID des Nutzers aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Arzt handelt
        if (participantType != "Doctor") {
            window.location.href = "../index.html";
        }

        // Hole Profil Daten des Doktors aus der Blockchain, falls sie nicht im Session Storage gespeichert sind.
        if (sessionStorage.getItem("doktorProfil") == null) {
            // Hole Profil Daten des Nutzers aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Doctor/" + participantId, {
                method: 'GET',
                credentials: 'include'
            });
            let profilJson = await response.json();

            // Speichere Profil Daten im SessionStorage
            let doktorProfil = JSON.stringify(profilJson);
            sessionStorage.setItem("doktorProfil", doktorProfil);
        }
        // Hole Doktor Profil aus dem SessionStorage
        let doktorProfil = JSON.parse(sessionStorage.getItem("doktorProfil"));

        // Hole PatientenIDs des Doktors
        let patientArray = doktorProfil.patients;

        // Hole Tabelle als jquery Variable
        let patientenTabelle = $('#patientenTabelle');

        // Falls nur ein Patient eine Freigabe erteilt hat
        if (patientArray.length == 1) {
            // Filter String um nach dem Patienten mit der patientId zu suchen
            let patientId = patientArray[0].split("#")[1];
            let filterString = "?filter=%7B%22where%22%3A%7B%22personID%22%3A%22" + patientId + "%22%7D%7D";

            // Hole Patienten aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Patient" + filterString, {
                method: 'GET',
                credentials: 'include'
            });
            let patientProfileArray = await response.json();
            let patient = patientProfileArray[0];

            // Gebe Informationen des Patienten aus
            let appendString = "<tr>" +
                "<td>" + patient.givenname + " " + patient.surname + "</td>" +
                "<td>" + patient.birthday + "</td>" +
                "<td><input type=\"checkbox\" class=\"form-check-input bigger-checkbox\"></td>" +
                "</tr>";
            patientenTabelle.append(appendString);

            // Falls mehrere Patienten eine Freigabe erteilt haben
        } else if (patientArray.length > 1) {
            // Anfang des Filter Strings für mehrere Patienten
            let filterString = "?filter=%7B%22where%22%3A%7B%22or%22%3A%5B";
            let firstPatient = true;

            // Füge alle IDs der Patienten zum Filter String hinzu
            patientArray.forEach(function (patient) {
                let patientId = patient.split("#")[1];
                if (firstPatient) {
                    // Beim ersten Patienten gibt es kein Komma am Anfang
                    filterString += "%7B%22personID%22%3A%22" + patientId + "%22%7D";
                    firstPatient = false;
                } else {
                    // Bei den folgenden Patienten gibt es ein Komma am Anfang
                    filterString += "%2C%7B%22personID%22%3A%22" + patientId + "%22%7D";
                }
            });
            // Füge abschließende Klammern zum Filter String hinzu
            filterString += "%5D%7D%7D";

            // Hole Profile aller Patienten mit einer Freigabe aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Patient" + filterString, {
                method: 'GET',
                credentials: 'include'
            });
            let patientProfileArray = await response.json();

            // Gebe Daten für alle Patienten aus
            patientProfileArray.forEach(function (patient) {
                let appendString = "<tr>" +
                    "<td>" + patient.givenname + " " + patient.surname + "</td>" +
                    "<td>" + patient.birthday + "</td>" +
                    "<td><input type=\"checkbox\" class=\"form-check-input bigger-checkbox\"></td>" +
                    "</tr>";

                patientenTabelle.append(appendString);
            })
        }
    }
});

/**
 * **********************************************************************************************
 * Funktionen um auf der Seite arzt-suche.html die Ärzte zu filtern
 */

/**
 * Filtert die Ärzte auf der Seite arzt-suche.html
 * Zeigt zunächst alle Ärzte in der Tabelle an.
 * Anschließend werden die einzelnen Filter-Funktionen aufgerufen, um alle nicht gesuchten Ärzte auszublenden.
 */
function filterDoctorTable() {
    // Variablen deklarieren
    var table, tr, td, i, txtValue;
    table = document.getElementById("arztTabelle");
    tr = table.getElementsByTagName("tr");

    // Zeige alle Zeilen an
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }

    // Rufe die einzelnen Filter-Funktionen auf
    filterTable("arztTabelle", "inputVorname", 0);
    filterTable("arztTabelle", "inputNachname", 0);
    filterTable("arztTabelle", "inputStraße", 1);
    filterTable("arztTabelle", "inputOrt", 1);
}

/**
 * Filtert die Ärzte anhand des Vornamens
 */
function filterTable(tableId, inputId, colNr) {
    // Variablen deklarieren
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(inputId);
    filter = input.value.toUpperCase();
    table = document.getElementById(tableId);
    tr = table.getElementsByTagName("tr");

    // Prüfe alle Tabllen Reihen und blende die aus, die nicht dem Filter entsprechen
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[colNr];
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

/**
 * Filtert die Ärzte anhand des Nachnamens
 */
function filterTableBySurname(tableId) {
    // Variablen deklarieren
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputNachname");
    filter = input.value.toUpperCase();
    table = document.getElementById(tableId);
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

/**
 * Filtert die Ärzte anhand der Straße
 */
function filterTableByStreet(tableId) {
    // Variablen deklarieren
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputStraße");
    filter = input.value.toUpperCase();
    table = document.getElementById(tableId);
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

/**
 * Filtert die Ärzte anhand der Stadt
 */
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
