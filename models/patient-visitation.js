
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create patient visitation Schema & model
const PatientVisitationSchema = new Schema({
    patientId: {
        type: String,
        required: [true, 'patientId field is required']
    },
        // Date and Time
    visitDateAndTime: {
        type: Date,
        required: [true, 'Surname field is required']
    },
    typeOfEncounter: {
        type: String,
        required: [true, 'type Of Encounter field is required']
    },
    bloodPressure: {
        type: String,
    },
    temperature: {
        type: String,
    },
    pulse: {
        type: String,
    },
    spo2: {
        type: String,
    },
 
});

//specify the actual name of the collection to be created ('patient')
const PatientVisitation = mongoose.model('patient_visitation', PatientVisitationSchema);

module.exports = PatientVisitation;