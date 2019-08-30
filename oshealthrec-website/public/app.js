const serverIp = "https://34.67.49.75:3000";

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
 * Lädt die ausgewählte Datei hoch,
 * erstellt einen Report in der Blockchain
 * und fügt diesen Report zum Reports-Array des Patienten hinzu.
 */
function uploadReport() {
    // hole Daten aus dem SessionStorage
    let participantId = sessionStorage.getItem("participantId");

    // hole InputFelder
    let fileInput = document.getElementById('datei');
    let titelInput = document.getElementById('titel');
    let beschreibungInput = document.getElementById('beschreibung');

    if (fileInput.files.length == 0 || titelInput.value === "" || beschreibungInput.value === "") {
        alert("Bitte alle Felder ausfüllen!")
    } else {
        let storage;
        let patientId = sessionStorage.getItem("chosenPatient");
        let innerProgressbar = $("#innerProgressbar");
        let outerProgressbar = $("#outerProgressbar");

        // Hole Firebase Config aus externer JSON Datei und initialisiere Firebase
        let config = JSON.parse(firebaseConfig);
        firebase.initializeApp(config);

        // Hole hochzuladene Datei
        let file = fileInput.files[0];

        // Erstelle Pfad zur Datei
        let filePath = patientId;
        let fileType = file.name.split(".")[1];
        let fileName = participantId + Date.now();
        let fileString = filePath + "/" + fileName + "." + fileType;

        console.log(fileString);

        // Erstelle Storage Reference
        if (storage == null) {
            storage = firebase.storage();
        }

        outerProgressbar.removeClass("hidden");

        // Lade Datei zu Firebase Storage hoch
        let storageRef = storage.ref(fileString);
        let task = storageRef.put(file);

        // Zeige Fortschritt in der Progressbar
        task.on('state_changed',
            function progress(snapshot) {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 50;
                innerProgressbar.css('width', percentage + '%').attr('aria-valuenow', percentage);
            },
            function error(err) {

            },
            // Wird aufgerufen, wenn die Datei erfolgreich zum Firebase Storage hochgeladen wurde
            async function complete() {
                // Erstelle JSON Objekt zum Erstellen des Reports
                let bodyCRObject = new Object();
                bodyCRObject.$class = "org.oshealthrec.network.Report";
                bodyCRObject.reportID = fileName;
                bodyCRObject.date = new Date();
                bodyCRObject.description = beschreibungInput.value;
                bodyCRObject.ref_location = fileString;
                bodyCRObject.title = titelInput.value;
                bodyCRObject.owner = "resource:org.oshealthrec.network.Patient#" + patientId;
                if (participantId.includes("D")) {
                    bodyCRObject.uploadedby = "resource:org.oshealthrec.network.Doctor#" + participantId;
                    bodyCRObject.uploadedForDr = "resource:org.oshealthrec.network.Doctor#" + participantId;
                } else if (participantId.includes("E")) {
                    bodyCRObject.uploadedby = "resource:org.oshealthrec.network.Employee#" + participantId;
                    bodyCRObject.uploadedForDr = "resource:org.oshealthrec.network.Doctor#" + sessionStorage.getItem("doctorId");
                }

                let bodyCRJson = JSON.stringify(bodyCRObject);

                // Erstelle den Report durch den Rest-Aufruf
                const response = await fetch(serverIp + "/api/org.oshealthrec.network.Report", {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: bodyCRJson
                });
                const doctorCreateReportResponse = await response.json();

                innerProgressbar.css('width', '75%').attr('aria-valuenow', "75");

                // Erstelle JSON Objekt für die Transaktion add_report_for_patient
                let bodyARFPObject = new Object();
                bodyARFPObject.$class = "org.oshealthrec.network.add_report_for_patient";
                bodyARFPObject.report = "resource:org.oshealthrec.network.Report#" + participantId + fileName;
                bodyARFPObject.patient = "resource:org.oshealthrec.network.Patient#" + patientId;

                let bodyARFPJson = JSON.stringify(bodyARFPObject);

                // Füge den Report dem Patienten hinzu
                const arfpResponse = await fetch(serverIp + "/api/org.oshealthrec.network.add_report_for_patient", {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: bodyARFPJson
                });
                const addReportForPatientResponse = await arfpResponse.json();
                console.log(addReportForPatientResponse);

                innerProgressbar.css('width', '100%').attr('aria-valuenow', "100");

                if (participantId.includes("D")) {
                    window.location.href = "/doktor/patient.html?Id=" + patientId;
                } else if (participantId.includes("E")) {
                    window.location.href = "/mitarbeiter/patient.html?Id=" + patientId;
                }

            }
        );


    }
}

async function downloadReport(reportLink) {
    // Hole Firebase Config aus externer JSON Datei und initialisiere Firebase
    // if (firebase == null) {
    //     let config = JSON.parse(firebaseConfig);
    //     firebase.initializeApp(config);
    // }
 if (firebase.apps.length === 0) {
        let config = JSON.parse(firebaseConfig);
        firebase.initializeApp(config);
    }

    // hole Daten aus dem SessionStorage
    let participantId = sessionStorage.getItem("participantId");

    let storage;

    // Erstelle Storage Reference
    if (storage == null) {
        storage = firebase.storage();
    }

    let reportRef = storage.ref(reportLink);

    reportRef.getDownloadURL().then(function (url) {
        window.open(url);
    });

}

/**
 * Fügt einen Mitarbeiter zum ausführenden Doktor hinzu
 *
 * @param employeeId
 *   Id des Mitarbeiters
 */
async function approveEmployee(employeeId) {
    let doctorId = sessionStorage.getItem('participantId');

    // Erstelle JSON Objekt, dass an den Rest Server übertragen wird
    let bodyDAEObject = new Object();
    bodyDAEObject.$class = "org.oshealthrec.network.doctor_add_employee";
    bodyDAEObject.employee = "resource:org.oshealthrec.network.Employee#" + employeeId;
    bodyDAEObject.doctor = "resource:org.oshealthrec.network.Doctor#" + doctorId;

    let bodyDAEJson = JSON.stringify(bodyDAEObject);
    console.log(bodyDAEJson);

    // Füge den Employee zum Employee-Array des Doktors hinzu
    const response = await fetch(serverIp + "/api/org.oshealthrec.network.doctor_add_employee", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyDAEJson
    });
    const doctorAddEmployeeResponse = await response.json();
    console.log(doctorAddEmployeeResponse);

    // Erstelle JSON Objekt, dass an den Rest Server übertragen wird
    let bodyEADObject = new Object();
    bodyEADObject.$class = "org.oshealthrec.network.employee_add_doctor";
    bodyEADObject.employee = "resource:org.oshealthrec.network.Employee#" + employeeId;
    bodyEADObject.doctor = "resource:org.oshealthrec.network.Doctor#" + doctorId;

    let bodyEADJson = JSON.stringify(bodyEADObject);

    // Füge den Doktor zum Doctor-Array des Mitarbeiters hinzu
    const eadResponse = await fetch(serverIp + "/api/org.oshealthrec.network.employee_add_doctor", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyEADJson
    });
    const employeeAddDoctorResponse = await eadResponse.json();
    console.log(employeeAddDoctorResponse);

    // Lösche das doktorProfil aus dem SessionStorage, damit dieses nach dem Reload aktualisiert wird.
    sessionStorage.removeItem('doktorProfil');
    window.location.href = "/doktor/mitarbeiter.html";
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
 * Erteilt dem übergebenen Arzt eine Freigabe für den aufrufenden Patienten
 *
 * @param doctorId
 *   Id des Doktors
 */
async function approveDoctor(doctorId) {
    let patientId = sessionStorage.getItem('participantId');

    // Erstelle JSON Objekt, dass an den Rest Server übertragen wird
    let bodyPADObject = new Object();
    bodyPADObject.$class = "org.oshealthrec.network.patient_add_doctor";
    bodyPADObject.doctor = "resource:org.oshealthrec.network.Doctor#" + doctorId;
    bodyPADObject.patient = "resource:org.oshealthrec.network.Patient#" + patientId;

    let bodyPADJSON = JSON.stringify(bodyPADObject);
    console.log(bodyPADJSON);

    // Füge den Doktor zum Doktor-Array des Patienten hinzu
    const response = await fetch(serverIp + "/api/org.oshealthrec.network.patient_add_doctor", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyPADJSON
    });
    const patientAddDoctorResponse = await response.json();
    console.log(patientAddDoctorResponse);

    // Erstelle JSON Objekt, dass an den Rest Server übertragen wird
    let bodyDAPObject = new Object();
    bodyDAPObject.$class = "org.oshealthrec.network.doctor_add_patient";
    bodyDAPObject.patient = "resource:org.oshealthrec.network.Patient#" + patientId;
    bodyDAPObject.doctor = "resource:org.oshealthrec.network.Doctor#" + doctorId;

    let bodyDAPJson = JSON.stringify(bodyDAPObject);
    console.log(bodyDAPJson);

    // Füge den Patienten zum Patienten-Array des Doktors hinzu
    const dapResponse = await fetch(serverIp + "/api/org.oshealthrec.network.doctor_add_patient", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyDAPJson
    });
    const doctorAddPatientResponse = await dapResponse.json();
    console.log(doctorAddPatientResponse);

    // Lösche das patientProfil aus dem SessionStorage, damit dieses nach dem Reload aktualisiert wird.
    sessionStorage.removeItem('patientProfil');
    window.location.href = "/patient/freigaben.html";
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

    // Erstelle JSON Objekt, dass an den Rest Server übertragen wird
    let bodyDDPObject = new Object();
    bodyDDPObject.$class = "org.oshealthrec.network.doctor_delete_patient";
    bodyDDPObject.patient = "resource:org.oshealthrec.network.Patient#" + patientId;
    bodyDDPObject.doctor = "resource:org.oshealthrec.network.Doctor#" + doctorId;

    let bodyDDPJson = JSON.stringify(bodyDDPObject);
    console.log(bodyDDPJson);

    // Lösche den Patienten aus dem Patienten-Array des Doktors
    const ddpResponse = await fetch(serverIp + "/api/org.oshealthrec.network.doctor_delete_patient", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyDDPJson
    });
    const doctorDeletePatientResponse = await ddpResponse.json();
    console.log(doctorDeletePatientResponse);

    // Lösche das patientProfil aus dem SessionStorage, damit dieses nach dem Reload aktualisiert wird.
    sessionStorage.removeItem('patientProfil');
    location.reload();
}