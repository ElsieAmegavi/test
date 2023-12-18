const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const emergencyContactSchema = new Schema ({
    name:{
        type: String,
    },

    contact: {
        type: Number,
    },

    relation: {
        type: String
    }
});

//create PatientList Schema & model
const PatientSchema = new Schema({
    patientId: {
        type: String,
        required: [true, 'patientId field is required']
    },
    surname: {
        type: String,
        required: [true, 'surname field is required']
    },
    othernames: {
        type: String,
        required: [true, 'othernames field is required']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'phoneNumber field is required']
    },
    residentialAddress: {
        type: String,
        required: [true, 'residentialAddress field is required']
    },
    emergencyContact:emergencyContactSchema,
});

//specify the actual name of the collection to be created ('patient')
const Patient = mongoose.model('patient', PatientSchema);

module.exports = Patient;