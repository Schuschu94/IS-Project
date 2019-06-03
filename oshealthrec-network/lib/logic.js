/**
 * 
 * Die Logik hinter den Transaktionen implementieren
 * 
 * 
 * 
 * 
 * 
 * 
 */


 /**
  * 
  *  @param {org.oshealthrec.network.patient_add_doctor} patient_add_doctor 
  * @transaction
  * 
  */

 async function patient_add_doctor(patient_add_doctor) {

    //if(patient_add_doctor.patient == getCurrentPatient){                      // Nur angemeldete Participant kann den Befehl ausführen
    patient_add_doctor.patient.doctors.push(patient_add_doctor.doctor);         // Doctor array patient hinzugefügen
        let participantRegistry = await                                         // Der await Ausdruck lässt async Funktionen pausieren, bis
       getParticipantRegistry('org.oshealthrec.network.Patient');               // ein Promise erfüllt oder abgewiesen ist, und führt die async
        await participantRegistry.update(patient_add_doctor.patient);           // danach weiter aus.
      }
    // }

 /**
  * 
  * @param {org.oshealthrec.network.patient_delete_doctor} patient_delete_doctor 
  * @transaction
  * 
  */

async function patient_delete_doctor(patient_delete_doctor) {

    let doctorarray = patient_delete_doctor.patient.doctors;
    let index = doctorarray.indexOf(patient_delete_doctor.doctor);       
    if(index >-1){
        doctorarray.splice(index, 1);
      
    }

    let participantRegistry = await
    getParticipantRegistry('org.oshealthrec.network.Patient');
    await participantRegistry.update(patient_delete_doctor.patient);    
}
    

/**
  * 
  * @param {org.oshealthrec.network.get_all_reports} get_all_reports 
  * @transaction
  * ERST MONTAG
  * 
  *  
  */


/**
  * 
  * @param {org.oshealthrec.network.employee_add_doctor} employee_add_doctor 
  * @transaction
  * Jan
  * 
  */
 async function employee_add_doctor(employee_add_doctor) {
   // Füge den übergebenen Doctor dem doctors-Array des Employees zu
   employee_add_doctor.employee.doctors.push(employee_add_doctor.doctor);

   // Schreibe Änderungen in die Registry
   let participantRegistry = await                                         
       getParticipantRegistry('org.oshealthrec.network.Employee');        
        await participantRegistry.update(employee_add_doctor.employee);
 }

 
/**
  * 
  * @param {org.oshealthrec.network.employee_delete_doctor} employee_delete_doctor
  * @transaction
  * Shafig
  */
 async function employee_delete_doctor(employee_delete_doctor) {
  //Suche und lösche den Arzt aus dem Array employee.doctors
  let doctorarray = employee_delete_doctor.employee.doctors;
  let index = doctorarray.indexOf(employee_delete_doctor);
  if(index >-1) {
    doctorarray.splice(index,1);
  }
  
  // Schreibe Änderungen in die Registry
  let participantRegistry = await                                         
      getParticipantRegistry('org.oshealthrec.network.Employee');        
       await participantRegistry.update(employee_add_doctor.employee);



/**
  * 
  * @param {org.oshealthrec.network.add_report_for_patient} add_report_for_patient
  * @transaction
  * ERST MONTAG
  */



/**
  * 
  * @param {org.oshealthrec.network.get_reports_from_patient} get_reports_from_patient
  * @transaction
  * ERST MONTAG
  */

/**
  * 
  * @param {org.oshealthrec.network.employee_get_patients_from_doctor} employee_get_patients_from_doctor
  * @transaction
  * Feipeng
  */

/**
  * 
  * @param {org.oshealthrec.network.add_employee} add_employee
  * @transaction
  * Linshan
  */

}
async funktion add_employee (add_employee) {
   // Anlege den übergebenen employee aus dem Employees-Array des Doctors 
    let employeearray = new employee (add_employee);
    try {
        await employeearray.connection();
        let participantRegistry = await employeeray.getParticipantRegistry('org.oshealthrec.network.doctor');
        let factory = employeearray.getFactory();
        let participant = factory.nameReasource();
        participant.surname = "";
        participant.givenname = "";
        await participantRegistry.add(participant);
        await employeearray.disconnetcion();
    }catch(error){
        console.error (error);
        process.exit(1):
    }
}
addParticipant();

/**
  * 
  * @param {org.oshealthrec.network.add_patient} add_patient
  * @transaction
  * Timo
  */

/**
  * 
  * @param {org.oshealthrec.network.delete.employee} delete_employee
  * @transaction
  * Feipeng
  */

/**
  * 
  * @param {org.oshealthrec.network.delete.patient} delete_patient
  * @transaction
  * Jan
  */
 async function delete_patient(delete_patient) {
  // Entferne den übergebenen Patienten aus dem patients-Array des Doctors
  let patientarray = delete_patient.doctor.patients;
  let index = patientarray.indexOf(delete_patient.patient);       
  if(index >-1){
      patientarray.splice(index, 1);
  }

  // Schreibe Änderungen in die Registry
  let participantRegistry = await
  getParticipantRegistry('org.oshealthrec.network.doctor');
  await participantRegistry.update(delete_patient.doctor); 
 }

