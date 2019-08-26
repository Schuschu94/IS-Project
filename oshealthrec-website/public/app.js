const serverIp = "http://34.67.49.75:3000";

/**
 * Wird beim Laden jeder Seite aufgerufen
 * über "body.hasClass('X') wird abgefragt, um welche Seite es sich handelt
 */
$(document).ready(async function () {
    let body = $('body');

    /**************************************************************************************************************
     * Wird nur auf der Seite index.html ausgeführt
     */
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

        /**************************************************************************************************************
         * Wird nur auf der Seite patient/profil.html ausgeführt
         */
    } else if (body.hasClass('patient-profil')) {

        // Hole ID und Typ des Nutzers aus dem Session Storage
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

        // Hole Textfelder als jquery Variable
        let vorname = $('#vorname');
        let nachname = $('#nachname');
        let geschlecht = $('#geschlecht');
        let geburtsdatum = $('#geburtsdatum');
        let blutgruppe = $('#blutgruppe');
        let notfallkontakt = $('#notfallkontakt')

        // Setz Werte der Textfelder
        vorname.text(patientProfil.givenname);
        nachname.text(patientProfil.surname);
        geschlecht.text(patientProfil.sex);
        geburtsdatum.text(patientProfil.birthday);
        blutgruppe.text(patientProfil.bloodType);
        blutgruppe.text(patientProfil.emergency_contact);

        /**************************************************************************************************************
         * Wird nur auf der Seite mitarbeiter/profil.html ausgeführt
         */
    } else if (body.hasClass('mitarbeiter-profil')) {

        // Hole ID des Nutzers aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Mitarbeiter handelt
        if (participantType != "Employee") {
            window.location.href = "../index.html";
        }

        // Hole Profil Daten des Mitarbeiters aus der Blockchain, falls sie nicht im Session Storage gespeichert sind.
        if (sessionStorage.getItem("mitarbeiterProfil") == null) {
            // Hole Profil Daten des Nutzers aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Employee/" + participantId, {
                method: 'GET',
                credentials: 'include'
            });
            let profilJson = await response.json();

            // Speichere Profil Daten im SessionStorage
            let mitarbeiterProfil = JSON.stringify(profilJson);
            sessionStorage.setItem("mitarbeiterProfil", mitarbeiterProfil);
        }

        // Hole Mitarbeiter Profil aus dem SessionStorage
        let mitarbeiterProfil = JSON.parse(sessionStorage.getItem("mitarbeiterProfil"));

        // Hole Textfelder als jquery Variable
        let vorname = $('#vorname');
        let nachname = $('#nachname');
        let geschlecht = $('#geschlecht');
        let geburtsdatum = $('#geburtsdatum');

        // Setz Werte der Textfelder
        vorname.text(mitarbeiterProfil.givenname);
        nachname.text(mitarbeiterProfil.surname);
        geschlecht.text(mitarbeiterProfil.sex);
        geburtsdatum.text(mitarbeiterProfil.birthday);

        /**************************************************************************************************************
         * Wird nur auf der Seite doktor/profil.html ausgeführt
         */
    } else if (body.hasClass('doktor-profil')) {

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

        // Hole Textfelder als jquery Variable
        let vorname = $('#vorname');
        let nachname = $('#nachname');
        let geschlecht = $('#geschlecht');
        let geburtsdatum = $('#geburtsdatum');
        let anschrift = $('#anschrift');

        // Setz Werte der Textfelder
        vorname.text(doktorProfil.givenname);
        nachname.text(doktorProfil.surname);
        geschlecht.text(doktorProfil.sex);
        geburtsdatum.text(doktorProfil.birthday);
        anschrift.html(doktorProfil.street + "<br />"
            + doktorProfil.zipcode + " " + doktorProfil.city + "<br />"
            + doktorProfil.country)

        /**************************************************************************************************************
         * Wird nur auf der Seite patient/arzt-suche.html ausgeführt
         */
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
        const doctorArray = await response.json();

        // Gebe Informationen von allen Doktoren aus
        doctorArray.forEach(function (doctor) {
            let appendString = "<tr>" +
                "<td>" + doctor.title + " " + doctor.givenname + " " + doctor.surname + "</td>" +
                "<td>" + doctor.street + "<br />" + doctor.zipcode + " " + doctor.city + "<br />" + doctor.country + "</td>" +
                "<td>" + doctor.medical_specialty + "</td>" +
                "<td><input type=\"checkbox\" class=\"form-check-input bigger-checkbox\"></td>" +
                "</tr>";

            arztTabelle.append(appendString);
        });

        /**************************************************************************************************************
         * Wird nur auf der Seite patient-freigaben.html ausgeführt
         */
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
                "<td>" + doctor.title + " " + doctor.givenname + " " + doctor.surname + "</td>" +
                "<td>" + doctor.street + "<br />" + doctor.zipcode + " " + doctor.city + "<br />" + doctor.country + "</td>" +
                "<td>" + doctor.medical_specialty + "</td>" +
                "<td align='right'><button type=\"button\" class=\"btn btn-outline-primary btn-block button-table\" onclick='withdrawDoctor(\"" + doctorId + "\")'>Berechtigung entziehen</button></td>" +
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
                    "<td>" + doctor.medical_specialty + "</td>" +
                    "<td align='right'><button type=\"button\" class=\"btn btn-outline-primary btn-block button-table\" onclick='withdrawDoctor(\"" + doctor.personID + "\")'>Berechtigung entziehen</button></td>" +
                    "</tr>";

                arztTabelle.append(appendString);
            })
        }

        /**************************************************************************************************************
         * Wird nur auf der Seite doktor/mitarbeiter.html ausgeführt
         */
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
                "<td align='right'><button type=\"button\" class=\"btn btn-outline-primary btn-block button-table\" onclick='withdrawEmployee(\"" + employeeId + "\")'>Berechtigung entziehen</button></td>" +
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
                    "<td align='right'><button type=\"button\" class=\"btn btn-outline-primary btn-block button-table\" onclick='withdrawEmployee(\"" + employeeId + "\")'>Berechtigung entziehen</button></td>" +
                    "</tr>";

                mitarbeiterTabelle.append(appendString);
            })

        }

        /**************************************************************************************************************
         * Wird nur auf der Seite doktor/patienten.html ausgeführt
         */
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

            // Schreibe Array mit allen Patienten des Doktors in den SessionStorage
            let patientProfileArrayJson = JSON.stringify(patientProfileArray);
            sessionStorage.setItem("patientProfileArray", patientProfileArrayJson);

            let patient = patientProfileArray[0];

            // Gebe Informationen des Patienten aus
            let appendString = "<tr class='clickable-row' data-href='/doktor/patient.html?Id=" + patient.personID + "'>" +
                "<td>" + patient.givenname + " " + patient.surname + "</td>" +
                "<td>" + patient.birthday + "</td>" +
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

            // Schreibe Array mit allen Patienten des Doktors in den SessionStorage
            let patientProfileArrayJson = JSON.stringify(patientProfileArray);
            sessionStorage.setItem("patientProfileArray", patientProfileArrayJson);

            // Gebe Daten für alle Patienten aus
            patientProfileArray.forEach(function (patient) {
                let appendString = "<tr class='clickable-row' data-href='/doktor/patient.html?Id=" + patient.personID + "'>" +
                    "<td>" + patient.givenname + " " + patient.surname + "</td>" +
                    "<td>" + patient.birthday + "</td>" +
                    "</tr>";

                patientenTabelle.append(appendString);
            })
        }

        /**************************************************************************************************************
         * Wird nur auf der Seite doktor/mitarbeiter-suche.html ausgeführt
         */
    } else if (body.hasClass("doktor-mitarbeiter-suche")) {
        // Hole ID des Nutzers aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Doktor handelt
        if (participantType != "Doctor") {
            window.location.href = "../index.html";
        }

        // Hole Tabelle als jquery Variable
        let mitarbeiterTabelle = $('#mitarbeiterTabelle');

        // Rest Aufruf um alle Mitarbeiter zu erhalten
        const response = await fetch(serverIp + "/api/org.oshealthrec.network.Employee", {
            method: 'GET',
            credentials: 'include'
        });
        const employeeArray = await response.json(); //extract JSON from the http response

        // Gebe Informationen von allen Mitarbeitern aus
        employeeArray.forEach(function (employee) {
            let appendString = "<tr>" +
                "<td>" + employee.givenname + " " + employee.surname + "</td>" +
                "<td>" + employee.birthday + "</td>" +
                "<td><input type=\"checkbox\" class=\"form-check-input bigger-checkbox\"></td>" +
                "</tr>";

            mitarbeiterTabelle.append(appendString);
        });

        /**************************************************************************************************************
         * Wird nur auf der Seite mitarbeiter/dokumentenverwaltung.html ausgeführt
         */
    } else if (body.hasClass("mitarbeiter-dokumentenverwaltung")) {
        // Hole ID des Nutzers aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Mitarbeiter handelt
        if (participantType != "Employee") {
            window.location.href = "../index.html";
        }

        // Hole Profil Daten des Mitarbeiters aus der Blockchain, falls sie nicht im Session Storage gespeichert sind.
        if (sessionStorage.getItem("mitarbeiterProfil") == null) {
            // Hole Profil Daten des Nutzers aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Employee/" + participantId, {
                method: 'GET',
                credentials: 'include'
            });
            let profilJson = await response.json();

            // Speichere Profil Daten im SessionStorage
            let mitarbeiterProfil = JSON.stringify(profilJson);
            sessionStorage.setItem("mitarbeiterProfil", mitarbeiterProfil);
        }

        // Hole Mitarbeiter Profil aus dem SessionStorage
        let mitarbeiterProfil = JSON.parse(sessionStorage.getItem("mitarbeiterProfil"));
        // Hole Ärzte, denen der Mitarbeiter zugeteilt ist
        let doctorArray = mitarbeiterProfil.doctors;

        // Hole Tabelle als jquery Variable
        let doktorTabelle = $('#doktorTabelle');

        // Falls der Mitarbeiter nur einem Doktor zugeteilt ist
        if (doctorArray.length == 1) {
            // Filter String um nach dem Doktor mit der doctorId zu suchen
            let doctorId = doctorArray[0].split("#")[1];
            let filterString = "?filter=%7B%22where%22%3A%7B%22personID%22%3A%22" + doctorId + "%22%7D%7D";

            // Hole Doktor aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Doctor" + filterString, {
                method: 'GET',
                credentials: 'include'
            });
            let doctorProfileArray = await response.json();

            // Schreibe Array mit allen Ärzten des Mitarbeiters in den SessionStorage
            let doctorProfileArrayJson = JSON.stringify(doctorProfileArray);
            sessionStorage.setItem("doctorProfileArray", doctorProfileArrayJson);

            let doctor = doctorProfileArray[0];

            // Gebe Informationen des Doktors aus
            let appendString = "<tr class='clickable-row' data-href='/mitarbeiter/patienten-suche.html?Id=" + doctor.personID + "'>" +
                "<td>" + doctor.givenname + " " + doctor.surname + "</td>" +
                "<td>" + doctor.street + "<br />" + doctor.zipcode + " " + doctor.city + "<br />" + doctor.country + "</td>" +
                "<td>" + doctor.medical_specialty + "</td>" +
                "</tr>";
            doktorTabelle.append(appendString);

            // Falls der Mitarbeiter mehreren Ärzten zugeteilt ist
        } else if (doctorArray.length > 1) {
            // Anfang des Filter Strings für mehrere Ärzte
            let filterString = "?filter=%7B%22where%22%3A%7B%22or%22%3A%5B";
            let firstDoctor = true;

            // Füge alle IDs der Ärzte zum Filter String hinzu
            doctorArray.forEach(function (doctor) {
                let doctorId = doctor.split("#")[1];
                if (firstDoctor) {
                    // Beim ersten Doktor gibt es kein Komma am Anfang
                    filterString += "%7B%22personID%22%3A%22" + doctorId + "%22%7D";
                    firstDoctor = false;
                } else {
                    // Bei den folgenden Ärzten gibt es ein Komma am Anfang
                    filterString += "%2C%7B%22personID%22%3A%22" + doctorId + "%22%7D";
                }
            });
            // Füge abschließende Klammern zum Filter String hinzu
            filterString += "%5D%7D%7D";

            // Hole Profile aller Ärzte, denen der Mitarbeiter zugeteilt ist, aus der Blockchain
            const response = await fetch(serverIp + "/api/org.oshealthrec.network.Doctor" + filterString, {
                method: 'GET',
                credentials: 'include'
            });
            let doctorProfileArray = await response.json();

            // Schreibe Array mit allen Ärzten des Mitarbeiters in den SessionStorage
            let doctorProfileArrayJson = JSON.stringify(doctorProfileArray);
            sessionStorage.setItem("doctorProfileArray", doctorProfileArrayJson);

            // Gebe Daten für alle Ärzte aus
            doctorProfileArray.forEach(function (doctor) {
                let appendString = "<tr class='clickable-row' data-href='/mitarbeiter/patienten-suche.html?Id=" + doctor.personID + "'>" +
                    "<td>" + doctor.givenname + " " + doctor.surname + "</td>" +
                    "<td>" + doctor.street + "<br />" + doctor.zipcode + " " + doctor.city + "<br />" + doctor.country + "</td>" +
                    "<td>" + doctor.medical_specialty + "</td>" +
                    "</tr>";

                doktorTabelle.append(appendString);
            })
        }

        /**************************************************************************************************************
         * Wird nur auf der Seite doktor/patient.html ausgeführt
         */
    } else if (body.hasClass('doktor-patient')) {
        // Hole Daten aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");
        let patientProfileArrayJSON = sessionStorage.getItem("patientProfileArray");
        let patientProfileArray = JSON.parse(patientProfileArrayJSON);

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Arzt handelt
        if (participantType != "Doctor") {
            window.location.href = "../index.html";
        }

        // Hole Id des ausgewählten Patienten aus der URL
        let searchParams = new URLSearchParams(window.location.search);
        let patientId = searchParams.get('Id');

        // Hole Patienten mit der übergebenen Id aus dem PatientenArray
        let patient = patientProfileArray.find(p => p.personID === patientId);

        // Hole Textfelder als jquery Variable
        let vorname = $('#vorname');
        let nachname = $('#nachname');
        let geschlecht = $('#geschlecht');
        let geburtsdatum = $('#geburtsdatum');
        let blutgruppe = $('#blutgruppe');
        let notfallkontakt = $('#notfallkontakt');
        let reportTabelle = $('#reportTabelle');

        // Setz Werte der Textfelder
        vorname.text(patient.givenname);
        nachname.text(patient.surname);
        geschlecht.text(patient.sex);
        geburtsdatum.text(patient.birthday);
        blutgruppe.text(patient.bloodType);
        notfallkontakt.text(patient.emergency_contact);

        // Rest Aufruf um alle Doktoren zu erhalten
        const doctorResponse = await fetch(serverIp + "/api/org.oshealthrec.network.Doctor", {
            method: 'GET',
            credentials: 'include'
        });
        const doctorArray = await doctorResponse.json();

        // Rest Aufruf um alle Mitarbeiter zu erhalten
        const employeeResponse = await fetch(serverIp + "/api/org.oshealthrec.network.Employee", {
            method: 'GET',
            credentials: 'include'
        });
        const employeeArray = await employeeResponse.json();

        // Erstelle Filter um nur die Reports des ausgewählten Patienten anzuzueigen
        let patientPath = "org.oshealthrec.network.Patient";
        let filterString = "?filter=%7B%22where%22%3A%7B%22owner%22%3A%22resource%3A" + patientPath + "%23" + patientId + "%22%7D%7D";

        // Hole Reports aus der Blockchain
        const response = await fetch(serverIp + "/api/org.oshealthrec.network.Report" + filterString, {
            method: 'GET',
            credentials: 'include'
        });
        let reportArray = await response.json();

        // Gebe Daten für alle Reports aus
        reportArray.forEach(function (report) {

            // Hole Ids des Arztes und des Doktors des Reports
            let doctorId = report.uploadedForDr.split("#")[1];
            let uploadedById = report.uploadedby.split('#')[1];
            let uploadedBy;

            // Hole Doktor und Employee, für den der Report hochgeladen wurde, aus dem Arrays
            let doctor = doctorArray.find(d => d.personID === doctorId);
            if (doctorId != uploadedById) {
                uploadedBy = employeeArray.find(e => e.personID === uploadedById);
            } else {
                uploadedBy = doctor;
            }

            let date = report.date.split('T')[0];

            let appendString = "<tr>" +
                "<td>" + report.reportID + "</td>" +
                "<td>" + report.title + "</td>" +
                "<td>" + report.description + "</td>" +
                "<td>" + date + "</td>" +
                "<td>" + doctor.title + " " + doctor.givenname + " " + doctor.surname + "</td>";
            if (sessionStorage.getItem("participantId") === doctorId) {
                appendString += "<td>" + uploadedBy.givenname + " " + uploadedBy.surname + "</td>" + "</tr>";
            } else {
                appendString += "<td>" + " " + "</td>" + "</tr>";
            }

            reportTabelle.append(appendString);
        });

        /**************************************************************************************************************
         * Wird nur auf der Seite mitarbeiter/patienten-suche.html ausgeführt
         */
    } else if (body.hasClass('mitarbeiter-patienten-suche')) {

        // Hole Daten aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");
        let doctorProfileArrayJSON = sessionStorage.getItem("doctorProfileArray");
        let doctorProfileArray = JSON.parse(doctorProfileArrayJSON);

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Mitarbeiter handelt
        if (participantType != "Employee") {
            window.location.href = "../index.html";
        }

        // Hole Id des ausgewählten Arztes aus der URL
        let searchParams = new URLSearchParams(window.location.search);
        let doctorId = searchParams.get('Id');

        // Hole Doktor mit der übergebenen Id aus dem DoctorArray
        let doktorProfil = doctorProfileArray.find(d => d.personID === doctorId);

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

            // Schreibe Array mit allen Patienten des Doktors in den SessionStorage
            let patientProfileArrayJson = JSON.stringify(patientProfileArray);
            sessionStorage.setItem("patientProfileArray", patientProfileArrayJson);

            let patient = patientProfileArray[0];

            // Gebe Informationen des Patienten aus
            let appendString = "<tr class='clickable-row' data-href='/mitarbeiter/patient.html?Id=" + patient.personID + "'>" +
                "<td>" + patient.givenname + " " + patient.surname + "</td>" +
                "<td>" + patient.birthday + "</td>" +
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

            // Schreibe Array mit allen Patienten des Doktors in den SessionStorage
            let patientProfileArrayJson = JSON.stringify(patientProfileArray);
            sessionStorage.setItem("patientProfileArray", patientProfileArrayJson);

            // Gebe Daten für alle Patienten aus
            patientProfileArray.forEach(function (patient) {
                let appendString = "<tr class='clickable-row' data-href='/mitarbeiter/patient.html?Id=" + patient.personID + "'>" +
                    "<td>" + patient.givenname + " " + patient.surname + "</td>" +
                    "<td>" + patient.birthday + "</td>" +
                    "</tr>";

                patientenTabelle.append(appendString);
            })
        }

        /**************************************************************************************************************
         * Wird nur auf der Seite mitarbeiter/patient.html ausgeführt
         */
    } else if (body.hasClass('mitarbeiter-patient')) {
        // Hole Daten aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");
        let patientProfileArrayJSON = sessionStorage.getItem("patientProfileArray");
        let patientProfileArray = JSON.parse(patientProfileArrayJSON);

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Mitarbeiter handelt
        if (participantType != "Employee") {
            window.location.href = "../index.html";
        }

        // Hole Id des ausgewählten Patienten aus der URL
        let searchParams = new URLSearchParams(window.location.search);
        let patientId = searchParams.get('Id');

        // Hole Patienten mit der übergebenen Id aus dem PatientenArray
        let patient = patientProfileArray.find(p => p.personID === patientId);

        // Hole Textfelder als jquery Variable
        let vorname = $('#vorname');
        let nachname = $('#nachname');
        let geschlecht = $('#geschlecht');
        let geburtsdatum = $('#geburtsdatum');
        let blutgruppe = $('#blutgruppe');
        let notfallkontakt = $('#notfallkontakt');
        let reportTabelle = $('#reportTabelle');

        // Setz Werte der Textfelder
        vorname.text(patient.givenname);
        nachname.text(patient.surname);
        geschlecht.text(patient.sex);
        geburtsdatum.text(patient.birthday);
        blutgruppe.text(patient.bloodType);
        notfallkontakt.text(patient.emergency_contact);

        // Rest Aufruf um alle Doktoren zu erhalten
        const doctorResponse = await fetch(serverIp + "/api/org.oshealthrec.network.Doctor", {
            method: 'GET',
            credentials: 'include'
        });
        const doctorArray = await doctorResponse.json();

        // Rest Aufruf um alle Mitarbeiter zu erhalten
        const employeeResponse = await fetch(serverIp + "/api/org.oshealthrec.network.Employee", {
            method: 'GET',
            credentials: 'include'
        });
        const employeeArray = await employeeResponse.json();

        // Erstelle Filter um nur die Reports des ausgewählten Patienten anzuzueigen
        let patientPath = "org.oshealthrec.network.Patient";
        let filterString = "?filter=%7B%22where%22%3A%7B%22owner%22%3A%22resource%3A" + patientPath + "%23" + patientId + "%22%7D%7D";

        // Hole Reports aus der Blockchain
        const response = await fetch(serverIp + "/api/org.oshealthrec.network.Report" + filterString, {
            method: 'GET',
            credentials: 'include'
        });
        let reportArray = await response.json();

        // Gebe Daten für alle Reports aus
        reportArray.forEach(function (report) {

            // Hole Ids des Arztes und des Doktors des Reports
            let doctorId = report.uploadedForDr.split("#")[1];
            let uploadedById = report.uploadedby.split('#')[1];
            let uploadedBy;

            // Hole Doktor und Employee, für den der Report hochgeladen wurde, aus dem Arrays
            let doctor = doctorArray.find(d => d.personID === doctorId);
            if (doctorId != uploadedById) {
                uploadedBy = employeeArray.find(e => e.personID === uploadedById);
            } else {
                uploadedBy = doctor;
            }

            let date = report.date.split('T')[0];

            let appendString = "<tr>" +
                "<td>" + report.reportID + "</td>" +
                "<td>" + report.title + "</td>" +
                "<td>" + report.description + "</td>" +
                "<td>" + date + "</td>" +
                "<td>" + doctor.title + " " + doctor.givenname + " " + doctor.surname + "</td>";
            if (sessionStorage.getItem("participantId") === doctorId) {
                appendString += "<td>" + uploadedBy.givenname + " " + uploadedBy.surname + "</td>" + "</tr>";
            } else {
                appendString += "<td>" + " " + "</td>" + "</tr>";
            }

            reportTabelle.append(appendString);
        });

        /**************************************************************************************************************
         * Wird nur auf der Seite patient/dokumente.html ausgeführt
         */
    } else if (body.hasClass('patient-dokumente')) {
        // Hole Daten aus dem Session Storage
        let participantId = sessionStorage.getItem("participantId");
        let participantType = sessionStorage.getItem("participantType");

        // Leite Nutzer zurück auf die Startseite, wenn es sich nicht um einen Patienten handelt
        if (participantType != "Patient") {
            window.location.href = "../index.html";
        }

        // Hole Tabelle als jquery Variable
        let reportTabelle = $('#reportTabelle');

        // Rest Aufruf um alle Doktoren zu erhalten
        const doctorResponse = await fetch(serverIp + "/api/org.oshealthrec.network.Doctor", {
            method: 'GET',
            credentials: 'include'
        });
        const doctorArray = await doctorResponse.json();

        /*
        Rest Aufruf um alle Reports des Patienten zu erhalten.
        Aufgrund der Regeln in der Blockchain werden hier nur die Reports zurückgegeben, die dem Aufrufer zugeordnet sind.
         */
        const response = await fetch(serverIp + "/api/org.oshealthrec.network.Report", {
            method: 'GET',
            credentials: 'include'
        });
        const reportArray = await response.json(); //extract JSON from the http response

        // Gebe Informationen von allen Reports aus
        reportArray.forEach(function (report) {
            // Hole Id des Doktors, der den Report hochgeladen hat
            let doctorId = report.uploadedForDr.split('Doctor#')[1];

            // Hole Doktor mit der übergebenen Id aus dem DoktorArray
            let doctor = doctorArray.find(d => d.personID === doctorId);

            let date = report.date.split('T')[0];

            let appendString = "<tr>" +
                "<td>" + report.reportID + "</td>" +
                "<td>" + report.title + "</td>" +
                "<td>" + report.description + "</td>" +
                "<td>" + date + "</td>" +
                "<td>" + doctor.title + " " + doctor.givenname + " " + doctor.surname + "</td>"
            "</tr>";

            reportTabelle.append(appendString);
        });
    }

    // Funktion um ganze Reihe einer Tabelle als Link klickbar zu machen
    $(".clickable-row").click(function () {
        window.location = $(this).data("href");
    })
});

/**
 * Loggt den aktuellen Nutzer aus.
 */
function logout() {
    // Lösche den SessionStorage
    sessionStorage.clear();

    /*
    Leite auf die Logout-Seite des Rest-Servers weiter.
    Dort werden die Cookies (z.B. der Token) gelöscht.
     */
    window.location.replace("http://34.67.49.75:3000/auth/logout");
}

/**
 * **********************************************************************************************
 * Funktionen um Inhalte von Tabellen zu filtern
 */

/**
 * Filtert die Ärzte auf der Seite patient/arzt-suche.html
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
    filterTable("arztTabelle", "inputName", 0);
    filterTable("arztTabelle", "inputAdresse", 1);
}

/**
 * Filtert die Patienten in der Übersicht aller Patienten
 * Zeigt zunächst alle Patienten des Arztes in der Tabelle an.
 * Anschließend werden die einzelnen Filter-Funktionen aufgerufen, um alle nicht gesuchten Patienten auszublenden.
 */
function filterPatientTable() {
    // Variablen deklarieren
    var table, tr, i;
    table = document.getElementById("patientenTabelle");
    tr = table.getElementsByTagName("tr");

    // Zeige alle Zeilen an
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }

    // Rufe die einzelnen Filter-Funktionen auf
    filterTable("patientenTabelle", "inputName", 0);
    filterTable("patientenTabelle", "inputGeburtsdatum", 1);
}

/**
 * Filtert die Patienten in der Übersicht aller Patienten
 * Zeigt zunächst alle Patienten des Arztes in der Tabelle an.
 * Anschließend werden die einzelnen Filter-Funktionen aufgerufen, um alle nicht gesuchten Patienten auszublenden.
 */
function filterReportTable() {
    // Variablen deklarieren
    var table, tr, i;
    table = document.getElementById("reportTabelle");
    tr = table.getElementsByTagName("tr");

    // Zeige alle Zeilen an
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }

    // Rufe die einzelnen Filter-Funktionen auf
    filterTable("reportTabelle", "inputTitel", 1);
    filterTable("reportTabelle", "inputBeschreibung", 2);
    filterTable("reportTabelle", "inputDatum", 3);
    filterTable("reportTabelle", "inputHochgeladenVon", 4);
}

/**
 * Filtert die Mitarbeiter auf der Seite doktor/mitarbeiter-suche.html
 * Zeigt zunächst alle Mitarbeiter in der Tabelle an.
 * Anschließend werden die einzelnen Filter-Funktionen aufgerufen, um alle nicht gesuchten Mitarbeiter auszublenden.
 */
function filterEmployeeTable() {
    // Variablen deklarieren
    var table, tr, i;
    table = document.getElementById("mitarbeiterTabelle");
    tr = table.getElementsByTagName("tr");

    // Zeige alle Zeilen an
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }

    // Rufe die einzelnen Filter-Funktionen auf
    filterTable("mitarbeiterTabelle", "inputName", 0);
    filterTable("mitarbeiterTabelle", "inputGeburtsdatum", 1);
}

/**
 * Filtert die Ärzte anhand der übergebenen Werte
 *
 * @param {string} tableId
 *   Id der Tabelle deren Inhalt gefiltert werden soll
 * @param {string} inputId
 *   Id des Inputfelds, indem der Filter-Wert steht
 * @param {int} colNr
 *   Nummer der Spalte, deren Inhalt gefiltert werden soll
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
 * Entzieht einem Employee die Zugehörigkeit zu einem Doktor.
 *
 * @param {string} employeeId
 *   Id des Employees
 */
async function withdrawEmployee(employeeId) {
    let doctorId = sessionStorage.getItem('participantId');

    // Erstelle JSON Objekt, dass an den Rest Server übertragen wird
    let bodyDDEObject = new Object();
    bodyDDEObject.$class = "org.oshealthrec.network.doctor_delete_employee";
    bodyDDEObject.employee = "resource:org.oshealthrec.network.Employee#" + employeeId;
    bodyDDEObject.doctor = "resource:org.oshealthrec.network.Doctor#" + doctorId;

    let bodyDDEJson = JSON.stringify(bodyDDEObject);
    console.log(bodyDDEJson);

    // Lösche den Employee aus dem Employee-Array des Doktors
    const response = await fetch(serverIp + "/api/org.oshealthrec.network.doctor_delete_employee", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyDDEJson
    });
    const doctorDeleteEmployeeResponse = await response.json();
    console.log(doctorDeleteEmployeeResponse);

    // Erstelle JSON Objekt, dass an den Rest Server übertragen wird
    let bodyEDDObject = new Object();
    bodyEDDObject.$class = "org.oshealthrec.network.employee_delete_doctor";
    bodyEDDObject.doctor = "resource:org.oshealthrec.network.Doctor#" + doctorId;
    bodyEDDObject.employee = "resource:org.oshealthrec.network.Employee#" + employeeId;

    let bodyEDDJson = JSON.stringify(bodyEDDObject);

    // Lösche den Doktor aus dem Doctor-Array des Mitarbeiters
    const ddeResponse = await fetch(serverIp + "/api/org.oshealthrec.network.employee_delete_doctor", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyEDDJson
    });
    const employeeDeleteDoctorResponse = await ddeResponse.json();
    console.log(employeeDeleteDoctorResponse);

    // Lösche das doktorProfil aus dem SessionStorage, damit dieses nach dem Reload aktualisiert wird.
    sessionStorage.removeItem('doktorProfil');
    location.reload();
}

/**
 * Entzieht einem Doktor die Freigabe eines Patienten.
 *
 * @param {string} doctorId
 *   Id des Doktors
 */
async function withdrawDoctor(doctorId) {
    let patientId = sessionStorage.getItem('participantId');

    // Erstelle JSON Objekt, dass an den Rest Server übertragen wird
    let bodyPDDObject = new Object();
    bodyPDDObject.$class = "org.oshealthrec.network.patient_delete_doctor";
    bodyPDDObject.patient = "resource:org.oshealthrec.network.Patient#" + patientId;
    bodyPDDObject.doctor = "resource:org.oshealthrec.network.Doctor#" + doctorId;

    let bodyPDDJson = JSON.stringify(bodyPDDObject);
    console.log(bodyPDDJson);

    // Lösche den Doktor aus dem Doktor-Array des Patienten
    const response = await fetch(serverIp + "/api/org.oshealthrec.network.patient_delete_doctor", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyPDDJson
    });
    const patientDeleteDoctorResponse = await response.json();
    console.log(patientDeleteDoctorResponse);

    / Erstelle JSON Objekt, dass an den Rest Server übertragen wird
    let bodyDDPObject = new Object();
    bodyDDPObject.$class = "org.oshealthrec.network.doctor_delete_patient";
    bodyDDPObject.patient = "resource:org.oshealthrec.network.Patient#" + patientId;
    bodyDDPObject.doctor = "resource:org.oshealthrec.network.Doctor#" + doctorId;

    let bodyDDPJson = JSON.stringify(bodyDDpObject);
    console.log(bodyDDPJson);

    // Lösche den Patienten aus dem Patienten-Array des Doktors
    const ddeResponse = await fetch(serverIp + "/api/org.oshealthrec.network.doctor_delete_patient", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyDDPJson
    });
    const doctorDeletePatientResponse = await ddeResponse.json();
    console.log(doctorDeletePatientResponse);

    // Lösche das patientProfil aus dem SessionStorage, damit dieses nach dem Reload aktualisiert wird.
    sessionStorage.removeItem('patientProfil');
    location.reload();
}

/**
 * !!!Wird wahrscheinlich nicht mehr benötigt!!!
 *
 * Schreibt den Inhalt der Wallet des Nutzers in die Konsolle
 */
async function checkWallet() {


    // Rest Aufruf um die Wallet des Users zu erhalten
    const response = await fetch(serverIp + "/api/wallet", {
        method: 'GET',
        credentials: 'include',
    });
    const myJson = await response.json(); //extract JSON from the http response

    // Schreibe Inhalt der Wallet in die Konsole
    console.log(myJson);

}
