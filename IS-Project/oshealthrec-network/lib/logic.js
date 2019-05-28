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
    