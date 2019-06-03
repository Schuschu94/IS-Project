/**
 * 
 * Die Logik hinter den Transaktionen implementieren
 */


/**
  * 
  *  @param {org.oshealthrec.network.createPatient} createPatient
  * @transaction
  * 
  */
 async function createPatient(createPatient){

  return getParticipantRegistry('org.oshealthrec.network.Patient')
  .then(function(userRegistry){
    var factory = getFactory();
    var newPatient = factory.newResource(
      'org.oshealthrec.network',
      'Patient',
      createPatient.personID);
      newPatient.birthday = createPatient.birthday;
      newPatient.email = createPatient.email;
      newPatient.givenname = createPatient.givenname;
      newPatient.surname = createPatient.surname;
      newPatient.sex = createPatient.sex;
      newPatient.doctors = createPatient.doctors;
      newPatient.reports = createPatient.reports;

      return userRegistry.add(newPatient);

  });  
}

/**
  * 
  *  @param {org.oshealthrec.network.createEmployee} createEmployee
  * @transaction
  * 
  */
 async function createEmployee(createEmployee){

  return getParticipantRegistry('org.oshealthrec.network.Employee')
  .then(function(userRegistry){
    var factory = getFactory();
    var newEmployee = factory.newResource(
      'org.oshealthrec.network',
      'Employee',
      createEmployee.personID);
      newEmployee.birthday = createEmployee.birthday;
      newEmployee.email = createEmployee.email;
      newEmployee.givenname = createEmployee.givenname;
      newEmployee.surname = createEmployee.surname;
      newEmployee.sex = createEmployee.sex;
      newEmployee.doctors = createEmployee.doctors;

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

  return getParticipantRegistry('org.oshealthrec.network.Doctor')
  .then(function(userRegistry){
    var factory = getFactory();
    var newDoctor = factory.newResource(
      'org.oshealthrec.network',
      'Doctor',
      createDoctor.personID);
      newDoctor.birthday = createDoctor.birthday;
      newDoctor.email = createDoctor.email;
      newDoctor.givenname = createDoctor.givenname;
      newDoctor.surname = createDoctor.surname;
      newDoctor.sex = createDoctor.sex;
      newDoctor.employees = createDoctor.employees;
      newDoctor.patients = createDoctor.patiens;

      newDoctor.street = createDoctor.street;
      newDoctor.city = createDoctor.city;
      newDoctor.country = createDoctor.country;
      newDoctor.zipcode = createDoctor.zipcode;

      return userRegistry.add(newDoctor);
  });  
}

  

/**
  * 
  *  @param {org.oshealthrec.network.patient_add_doctor} patient_add_doctor 
  * @transaction
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

 async function patient_add_doctor(pad) {

  let doctorArray = pad.patient.doctors;
  let index = doctorArray.indexOf(pad.doctor);

  if (index > -1) {
    alert('You have added this doctor!');
    //throw new Error('you have already this Doctor!');
  }
  else {

    pad.patient.doctors.push(pad.doctor);
    let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Patient');
    await participantRegistry.update(pad.patient);
  }
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
* @param {org.oshealthrec.network.employee_add_doctor} employee_add_doctor 
* @transaction
* Jan
* 
*/

async function employee_add_doctor(ead) {

  let doctorArray = ead.employee.doctors;
  let index = doctorArray.indexOf(ead.doctor);

  if (index > -1) {
    alert('You have added this doctor!');
  }
  else {

    ead.employee.doctors.push(ead.doctor);
    let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Employee');
    await participantRegistry.update(ead.employee);
  }

}


/**
* 
* @param {org.oshealthrec.network.employee_delete_doctor} employee_delete_doctor
* @transaction
* Shafig
*/
async function employee_delete_doctor(edd) {
  let doctorArray = edd.employee.doctors;
  let index = doctorArray.indexOf(edd.doctor);

  if (index > -1) {
    doctorArray.splice(index, 1);
  } 

  let participantRegistry = await
    getParticipantRegistry('org.oshealthrec.network.Employee');
  await participantRegistry.update(edd.employee);
}

/**
* 
* @param {org.oshealthrec.network.doctor_add_employee} doctor_add_employee
* @transaction
* Linshan
*/
async function doctor_add_employee(dae){
  let employeeArray = dae.doctor.employees;
  let index = employeeArray.indexOf(dae.employee);

  if (index > -1) {
    alert('You have added this employee!');
  }
  else {

    dae.doctor.employees.push(dae.employee);
    let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Doctor');
    await participantRegistry.update(dae.doctor);
  }

}


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
* @param {org.oshealthrec.network.doctor_delete_employee} doctor_delete_employee
* @transaction
* Feipeng 
*/
async function doctor_delete_employee(dde) {

  let employeeArray = dde.doctor.employees;
  let index = employeeArray.indexOf(dde.employee);

  if (index > -1) {
    employeeArray.splice(index, 1);
  } 

  let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Doctor');
  await participantRegistry.update(dde.doctor);
}


/**
*
* @param {org.oshealthrec.network.doctor_delete_patient} doctor_delete_patient
* @transaction
* Jan
*/
async function doctor_delete_patient(ddp){
  let patientArray = ddp.doctor.patients;
  let index = patientArray.indexOf(ddp.patient);

  if (index > -1) {
    patientArray.splice(index, 1);
  }
  
  let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Doctor');
  await participantRegistry.update(ddp.doctor);
}




/**
*
* @param {org.oshealthrec.network.add_report_for_patient} add_report_for_patient
* @transaction
*/
async function add_report_for_patient(arfp){
  
  let reportArray = arfp.patient.reports;
  let index = reportArray.indexOf(arfp.doctor);

  if (index > -1) {
    alert('You have added this report!');
    }
      else {
             arfp.patient.reports.push(arfp.report);
             let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Patient');
             await participantRegistry.update(arfp.patient);
     }
}


/**
*
* @param {org.oshealthrec.network.get_all_reports} get_all_reports
* @transaction
*
*/
async function get_all_reports(){

 return getAssetRegistry('org.oshealthrec.network.Report')
 .then(function(asstRegistry) {
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
*
* @param {org.oshealthrec.network.get_report} get_report
* @transaction
*/
async function get_report(gr){

  return getAssetRegistry('org.oshealthrec.network.Report')
  .then(function(asstRegistry) {
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
*
* @param {org.oshealthrec.network.employee_get_patients_from_doctor} employee_get_patients_from_doctor
* @transaction
* Feipeng
*/
async function employee_get_patients_from_doctor(egpfd){
  
  let patientArray = egpfd.doctor.patients;
  
  if(patientArray!=0){
   for(patient in patientArray ){
       console.log(patient.personID);
     }
     return patientArray;
   }else{
     console.log('the Doctor do not have a patient!');
  }
 }


/**
*
* @param {org.oshealthrec.network.get_reports_from_patient} get_reports_from_patient
* @transaction
* ERST MONTAG
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


