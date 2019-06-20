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
      newDoctor.patients = createDoctor.patients;

      newDoctor.street = createDoctor.street;
      newDoctor.city = createDoctor.city;
      newDoctor.country = createDoctor.country;
      newDoctor.zipcode = createDoctor.zipcode;

      return userRegistry.add(newDoctor);
  });  
}

  
/**
 * 
 * @param {org.oshealthrec.network.patient_update_profile} patient_update_profile
 * @transaction 
 */
async function patient_update_profile(pup) {
  let birthday = pup.birthday;
  let email = pup.email;
  let givenname = pup.givenname;
  let surname = pup.surname;
  let sex = pup.sex;
  let bloodType = pup.bloodType;
  let intolerances = pup.intolerances;

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
  
    let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Patient');
    await participantRegistry.update(pup.patient);
}

/**
 * 
 * @param {org.oshealthrec.network.employee_update_profile} employee_update_profile
 * @transaction 
 */
async function employee_update_profile(eup) {
  let birthday = eup.birthday;
  let email = eup.email;
  let givenname = eup.givenname;
  let surname = eup.surname;
  let sex = eup.sex;

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

  let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Employee');
  await participantRegistry.update(eup.employee);

}

/**
 * 
 * @param {org.oshealthrec.network.doctor_update_profile} doctor_update_profile
 * @transaction 
 */
async function doctor_update_profile(dup) {
  let birthday = dup.birthday;
  let email = dup.email;
  let givenname = dup.givenname;
  let surname = dup.surname;
  let sex = dup.sex;
  let street = dup.street;
  let city = dup.city;
  let country = dup.country;
  let zipcode = dup.zipcode;

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
  let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Doctor');
  await participantRegistry.update(dup.doctor);
}

/**
  * 
  *  @param {org.oshealthrec.network.patient_add_doctor} patient_add_doctor 
  * @transaction
  * 
  */

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
* @param {org.oshealthrec.network.patient_delete_doctor} patient_delete_doctor 
* @transaction
* 
*/

async function patient_delete_doctor(pdd) {

  let doctorArray = pdd.patient.doctors;
  let index = doctorArray.indexOf(pdd.doctor);

  if (index > -1) {
    doctorArray.splice(index, 1);
  } 

  let participantRegistry = await
    getParticipantRegistry('org.oshealthrec.network.Patient');
  await participantRegistry.update(pdd.patient);
}


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
* @param {org.oshealthrec.network.doctor_add_patient} doctor_add_patient
* @transaction
* Timo
*/
async function doctor_add_patient(dap){
  let patientArray = dap.doctor.patients;
  let index = patientArray.indexOf(dap.patient);

  if (index > -1) {
    alert('You have added this patient!');
  }
  else {

    dap.doctor.patients.push(dap.patient);
    let participantRegistry = await getParticipantRegistry('org.oshealthrec.network.Doctor');
    await participantRegistry.update(dap.doctor);
  }
}

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
* @param {org.oshealthrec.network.create_report} create_report
* @transaction
* ERST MONTAG
*/
async function create_report(cr){
  
  return getAssetRegistry('org.oshealthrec.network.Report')
  .then(function(reportRegistry) {
    var factory = getFactory();
    var newReport = factory.newResource(
      'org.oshealthrec.network',
      'Report',
      cr.reportID);
      newReport.description = cr.description
      newReport.ref_location = cr.ref_location
      newReport.date = cr.date
      newReport.title = cr.title
      newReport.owner = cr.patient
      newReport.uploadedby = cr.uploadedby

      return reportRegistry.add(newReport);
    });
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


async function get_reports_from_patient(grfp){


  let reportArray = grfp.patient.reports;
  
  if(reportArray!=0){
   for(report in reportArray ){
       console.log(report.reportID);
     }
     return reportArray;
   }else{
     console.log('patient not have report!');
  }



}
  





