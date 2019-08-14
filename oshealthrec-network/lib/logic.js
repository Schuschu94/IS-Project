// Funktionen zum Erstellen der participants und assets.

/**
  * Erstellt einen Patienten
  *  @param {org.oshealthrec.network.createPatient} createPatient
  * @transaction
  */
 async function createPatient(createPatient){
  // Hole Registry in der alle Participants gespeichert sind
  return getParticipantRegistry('org.oshealthrec.network.Patient')
  .then(function(userRegistry){
    var factory = getFactory();

    // Erstelle neuen Patient
    var newPatient = factory.newResource(
      'org.oshealthrec.network',
      'Patient',
      createPatient.personID);

      // Setze Variablen des Patient
      newPatient.birthday = createPatient.birthday;
      newPatient.email = createPatient.email;
      newPatient.givenname = createPatient.givenname;
      newPatient.surname = createPatient.surname;
      newPatient.sex = createPatient.sex;
      newPatient.doctors = createPatient.doctors;
      newPatient.reports = createPatient.reports;

      // Füge Patient der Registry hinzu
      return userRegistry.add(newPatient);
  });  
}

/**
  * Erstellt einen Employee
  * @param {org.oshealthrec.network.createEmployee} createEmployee
  * @transaction
  */
 async function createEmployee(createEmployee){
  // Hole Registry in der alle Participants gespeichert sind
  return getParticipantRegistry('org.oshealthrec.network.Employee')
  .then(function(userRegistry){
    var factory = getFactory();
    var newEmployee = factory.newResource(
      'org.oshealthrec.network',
      'Employee',
      
      // Erstelle neuen Employee
      createEmployee.personID);

      // Setze Variablen des Employee
      newEmployee.birthday = createEmployee.birthday;
      newEmployee.email = createEmployee.email;
      newEmployee.givenname = createEmployee.givenname;
      newEmployee.surname = createEmployee.surname;
      newEmployee.sex = createEmployee.sex;
      newEmployee.doctors = createEmployee.doctors;

      // Füge Employee der Registry hinzu
      return userRegistry.add(newEmployee);
  });  
 }

 /**
  * 
  *  @param {org.oshealthrec.network.createDoctor} createDoctor
  * @transaction
  * 
  */
   async function createDoctor(createDoctor){
  // Hole Registry in der alle Participants gespeichert sind
  return getParticipantRegistry('org.oshealthrec.network.Doctor')
  .then(function(userRegistry){
    var factory = getFactory();

    // Erstelle neuen Doctor
    var newDoctor = factory.newResource(
      'org.oshealthrec.network',
      'Doctor',
      createDoctor.personID);

      // Setze Variablen des Doctors
      newDoctor.birthday = createDoctor.birthday;
      newDoctor.email = createDoctor.email;
      newDoctor.givenname = createDoctor.givenname;
      newDoctor.surname = createDoctor.surname;
      newDoctor.sex = createDoctor.sex;
      newDoctor.employees = createDoctor.employees;
      newDoctor.patients = createDoctor.patients;
      newDoctor.street = createDoctor.street;
      newDoctor.city = createDoctor.city;
      newDoctor.country = createDoctor.country;
      newDoctor.zipcode = createDoctor.zipcode;

      // Füge Doctor der Registry hinzu
      return userRegistry.add(newDoctor);
  });  
}

/**
 * Erstellt einen neuen Report
 * @param {org.oshealthrec.network.create_report} create_report
 * @transaction
 */
async function create_report(cr){
  // Hole Registry, in der alle Assets gespeichert sind
  return getAssetRegistry('org.oshealthrec.network.Report')
  .then(function(reportRegistry) {
    var factory = getFactory();

    // Erstelle neuen Report
    var newReport = factory.newResource(
      'org.oshealthrec.network',
      'Report',
      cr.reportID);

      // Setze Werte des Reports
      newReport.description = cr.description
      newReport.ref_location = cr.ref_location
      newReport.date = cr.date
      newReport.title = cr.title
      newReport.owner = cr.patient
      newReport.uploadedby = cr.uploadedby
      newReport.uploadedForDr = cr.uploadedForDr

      // Füge Report der Registry hinzu
      return reportRegistry.add(newReport);
    });
}

// Funktionen um die Profile der Participants zu aktualisieren 
/**
 * Gibt den aufrufenden Participant zurück.
 * @param {org.oshealthrec.network.getCurrentParticipant} gcp 
 * @transaction
 */
async function getCurrentParticipant(gcp) {
  let currentParticipant = getCurrentParticipant();

  return currentParticipant;
}
/**
 * Aktualisiert das Profil des Patient
 * @param {org.oshealthrec.network.patient_update_profile} patient_update_profile
 * @transaction 
 */
async function patient_update_profile(pup) {
  // Hole Werte aus der transaction (pup)
  let birthday = pup.birthday;
  let email = pup.email;
  let givenname = pup.givenname;
  let surname = pup.surname;
  let sex = pup.sex;
  let bloodType = pup.bloodType;
  let intolerances = pup.intolerances;

  // Prüfe welche Werte in der Transaction gesetzt wurden
  // und aktualisiere nur die gesetzten Werte
  if (birthday != "") {
    pup.patient.birthday = birthday;
  }
  if (email != "") {
    pup.patient.email = email;
  }
  if (givenname != "") {
    pup.patient.givenname = givenname;
  }
  if (surname != "") {
    pup.patient.surname = surname;
  }
  if (sex != "") {
    pup.patient.sex = sex;
  }
  if (bloodType != "") {
    pup.patient.bloodType = bloodType;
  }
  if (intolerances.length > 1){
    pup.patient.intolerances = intolerances;
  }
  
  // Schreibe Updates in die Registry
  let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Patient');
  await participantRegistry.update(pup.patient);
}

/**
 * Aktualisiert das Profil des Employees
 * @param {org.oshealthrec.network.employee_update_profile} employee_update_profile
 * @transaction 
 */
async function employee_update_profile(eup) {
  // Hole Werte aus der Transaction (eup)
  let birthday = eup.birthday;
  let email = eup.email;
  let givenname = eup.givenname;
  let surname = eup.surname;
  let sex = eup.sex;

  // Prüfe welche Werte in der Transaction gesetzt wurden
  // und aktualisiere nur die gesetzten Werte
  if (birthday != "") {
    eup.employee.birthday = birthday;
  }
  if (email != "") {
    eup.employee.email = email;
  }
  if (givenname != "") {
    eup.employee.givenname = givenname;
  }
  if (surname != "") {
    eup.employee.surname = surname;
  }
  if (sex != "") {
    eup.employee.sex = sex;
  }

  // Schreibe Updates in die Registry
  let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Employee');
  await participantRegistry.update(eup.employee);

}

/**
 * Aktualisiert das Profil des Doctors
 * @param {org.oshealthrec.network.doctor_update_profile} doctor_update_profile
 * @transaction 
 */
async function doctor_update_profile(dup) {
  // Hole Werte aus der Transaction (dup)
  let birthday = dup.birthday;
  let email = dup.email;
  let givenname = dup.givenname;
  let surname = dup.surname;
  let sex = dup.sex;
  let street = dup.street;
  let city = dup.city;
  let country = dup.country;
  let zipcode = dup.zipcode;

  // Prüfe welche Werte in der Transaction gesetzt wurden
  // und aktualisiere nur die gesetzten Werte
  if (birthday != "") {
    dup.doctor.birthday = birthday;
  }
  if (email != "") {
    dup.doctor.email = email;
  }
  if (givenname != "") {
    dup.doctor.givenname = givenname;
  }
  if (surname != "") {
    dup.doctor.surname = surname;
  }
  if (sex != "") {
    dup.doctor.sex = sex;
  }
  if (street != "") {
    dup.doctor.street = street;
  }
  if (city != "") {
    dup.doctor.city = city;
  }
  if (country != "") {
    dup.doctor.country = country;
  }
  if (zipcode != "") {
    dup.doctor.zipcode = zipcode;
  }

  // Schreibe Updates in die Registry
  let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Doctor');
  await participantRegistry.update(dup.doctor);
}


// Funktionen um die Freigabe eines Patienten für einen Doctor zu erteilen
/**
  * Fügt den Doctor zu dem Doctors-Array des Patients hinzu
  * @param {org.oshealthrec.network.patient_add_doctor} patient_add_doctor 
  * @transaction
  * 
  */
 async function patient_add_doctor(pad) {

  let doctorArray = pad.patient.doctors;

  // Prüfe, ob der Doctor bereits hinzugefügt wurde
  let index = doctorArray.indexOf(pad.doctor);
  if (index > -1) {
    alert('You have already added this doctor!');
  }
  else {
    // Füge Doctor zum Doctors-Array hinzu
    pad.patient.doctors.push(pad.doctor);

    // Schreibe Update in die Registry
    let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Patient');
    await participantRegistry.update(pad.patient);
  }
}

/**
 * Fügt den Patient zum Patients-Array des Doctor hinzu.
 * @param {org.oshealthrec.network.doctor_add_patient} doctor_add_patient
 * @transaction
 */
async function doctor_add_patient(dap){
  let patientArray = dap.doctor.patients;

  // Prüfe, ob der Patient bereits im Array ist.
  let index = patientArray.indexOf(dap.patient);
  if (index > -1) {
    alert('You have already added this patient!');
  }
  else {
    // Füge Patient zum Array hinzu
    dap.doctor.patients.push(dap.patient);

    // Schreibe Update in die Registry
    let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Doctor');
    await participantRegistry.update(dap.doctor);
  }
}

// Funktoinen um die Freigabe eines Patienten für einen Doctor zu entfernen
/**
* Löscht den Doctor aus dem Doctors-Array des Patient
* @param {org.oshealthrec.network.patient_delete_doctor} patient_delete_doctor 
* @transaction
*/
async function patient_delete_doctor(pdd) {
  let doctorArray = pdd.patient.doctors;

  // Prüfe, ob der Doctor im Array vorhanden ist
  let index = doctorArray.indexOf(pdd.doctor);
  if (index > -1) {
    // Entferne Doctor aus dem Array
    doctorArray.splice(index, 1);
  } 

  // Schreibe Update in die Registry
  let participantRegistry = await
    getParticipantRegistry('org.oshealthrec.network.Patient');
  await participantRegistry.update(pdd.patient);
}

/**
 * Löscht den Patient aus dem Patients-Array des Doctors
 * @param {org.oshealthrec.network.doctor_delete_patient} doctor_delete_patient
 * @transaction
 */
async function doctor_delete_patient(ddp){
  let patientArray = ddp.doctor.patients;

  // Prüfe, ob der Patient im Array vorhanden ist
  let index = patientArray.indexOf(ddp.patient);
  if (index > -1) {
    // Entferne Patient aus dem Array
    patientArray.splice(index, 1);
  }
  
  // Schreibe Update in die Registry
  let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Doctor');
  await participantRegistry.update(ddp.doctor);
}

// Funktionen um einen employee einem Doctor zuzuordnen
/**
 * Fügt den Doctor zum Doctors-Array des Employee hinzu. 
 * @param {org.oshealthrec.network.employee_add_doctor} employee_add_doctor 
 * @transaction
 */
async function employee_add_doctor(ead) {
  let doctorArray = ead.employee.doctors;

  // Prüfe, ob der Doctor bereits im Array vorhanden ist
  let index = doctorArray.indexOf(ead.doctor);
  if (index > -1) {
    alert('You have already added this doctor!');
  }
  else {
    // Füge Doctor zum Array hinzu
    ead.employee.doctors.push(ead.doctor);

    // Schreibe Update in die Registry
    let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Employee');
    await participantRegistry.update(ead.employee);
  }

}

/**
 * Fügt den Employee zum Employees-Array des Doctors hinzu 
 * @param {org.oshealthrec.network.doctor_add_employee} doctor_add_employee
 * @transaction
 */
async function doctor_add_employee(dae){
  let employeeArray = dae.doctor.employees;

  // Prüfe, ob der Employee bereits im Array ist
  let index = employeeArray.indexOf(dae.employee);
  if (index > -1) {
    alert('You have already added this employee!');
  }
  else {
    // Füge Employee zum Array hinzu
    dae.doctor.employees.push(dae.employee);

    // Schreibe Update in die Registry
    let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Doctor');
    await participantRegistry.update(dae.doctor);
  }

}

// Funktionen um die Zuordnung eines Employees zu einem Doctor zu entfernen
/**
 * Entfernt den Doctor aus dem Doctors-Array des Employee 
 * @param {org.oshealthrec.network.employee_delete_doctor} employee_delete_doctor
 * @transaction
 */
async function employee_delete_doctor(edd) {
  let doctorArray = edd.employee.doctors;

  // Prüfe, ob der Doctor im Array vorhanden ist
  let index = doctorArray.indexOf(edd.doctor);
  if (index > -1) {
    // Lösche den Doctor aus dem Array
    doctorArray.splice(index, 1);
  } 

  // Schreibe Update in die Registry
  let participantRegistry = await
    getParticipantRegistry('org.oshealthrec.network.Employee');
  await participantRegistry.update(edd.employee);
}

/**
 * Entferne den Employee aus dem Employees-Array des Doctors 
 * @param {org.oshealthrec.network.doctor_delete_employee} doctor_delete_employee
 * @transaction
 */
async function doctor_delete_employee(dde) {
  let employeeArray = dde.doctor.employees;

  // Prüfe, ob der Employee im Array vorhanden ist
  let index = employeeArray.indexOf(dde.employee);
  if (index > -1) {
    // Lösche Employee aus dem Array
    employeeArray.splice(index, 1);
  } 

  // Schreibe Update in die Registry
  let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Doctor');
  await participantRegistry.update(dde.doctor);
}

// Funktionen zum Management der Reports
/**
 * Fügt Report zum Reports-Array des Patient hinzu
 * @param {org.oshealthrec.network.add_report_for_patient} add_report_for_patient
 * @transaction
 */
async function add_report_for_patient(arfp){  
  let reportArray = arfp.patient.reports;

  // Prüfe, ob der Report bereits im Array vorhanden ist
  let index = reportArray.indexOf(arfp.doctor);
  if (index > -1) {
    alert('You have already added this report!');
  } else {
    // Füge Report dem Array hinzu
    arfp.patient.reports.push(arfp.report);

    // Schreibe Update in die Datenbank
    let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Patient');
    await participantRegistry.update(arfp.patient);
  }
}

/**
 * Gibt die Reports eines Patients zurück
 * @param {org.oshealthrec.network.get_reports_from_patient} get_reports_from_patient
 * @transaction
 */
async function get_reports_from_patient(grfp){
  let reportArray = grfp.patient.reports;
  if(reportArray!=0){
    for(report in reportArray ){
       console.log(report.reportID);
    }
    return reportArray;
  } else {
     console.log('Patient doesnt have any reports!');
  }
}

/**
 * Gibt Report mit bestimmter ReportID zurück
 * @param {org.oshealthrec.network.get_report} get_report
 * @transaction
 */
async function get_report(gr){
  // Hole Registry in der alle Assets gespeichert sind
  return getAssetRegistry('org.oshealthrec.network.Report')
  .then(function(asstRegistry) {
    // Gib Report zurück
    return asstRegistry.get(gr.reportID);
  })
  .then(function(report){
      console.log(report.reportID);
  })
  .catch(function (error){
    alert('You can not get the report!');
  });
}

/**
 * Gibt alle Reports zurück
 * @param {org.oshealthrec.network.get_all_reports} get_all_reports
 * @transaction
 */
async function get_all_reports(){
  // Holle Asset-Registry
  return getAssetRegistry('org.oshealthrec.network.Report')
  .then(function(asstRegistry) {
    // Gebe alle Reports in der Registry zurück
    return asstRegistry.getAll();
  })
  .then(function(reports){
    reports.forEach(function(report){
      console.log(report.reportID);
    });
  })
  .catch(function (error){
      alert('You can not get the reports!');
  });
 }

/**
 * Gibt alle Patienten züruck, die einem bestimmten Doctor eine Freigabe erteilt haben.
 * @param {org.oshealthrec.network.employee_get_patients_from_doctor} employee_get_patients_from_doctor
 * @transaction
 */
async function employee_get_patients_from_doctor(egpfd){  
  let patientArray = egpfd.doctor.patients;  
  if(patientArray!=0){
   for(patient in patientArray ){
       console.log(patient.personID);
     }
     // Gibt Patient-Array des Doctors zurück
     return patientArray;
   }else{
     console.log('the Doctor does not have any patients!');
  }
 }