// Funktionen um die Profile der Participants zu aktualisieren 

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