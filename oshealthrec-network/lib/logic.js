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

 
/**
  * 
  * @param {org.oshealthrec.network.employee_delete_doctor} employee_delete_doctor
  * @transaction
  * Shafig
  */


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
  * Feipeng  noch nicht machen
  */

/**
  * 
  * @param {org.oshealthrec.network.delete.patient} delete_patient
  * @transaction
  * Jan
  */

