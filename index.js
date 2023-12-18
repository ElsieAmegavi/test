const express = require('express'); // library for making the app a REST API app
const bodyParser = require('body-parser'); // library for retrieving json data from requests 
const mongoose = require('mongoose'); // MongoDB Library for nodejs 
const Patient = require('./models/patient');
const PatientVisitation = require('./models/patient-visitation');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/electronic_medical_record');
mongoose.Promise = global.Promise;

//for retrieving json data from requests 
app.use(bodyParser.json());






app.post("/register_patient", async function(req, res) {
    //logic here
    console.log(req.body);

    const { surname, otherNames, gender, phoneNumber, residentialAddress, emergencyName, emergencyContact, emergencyContactRelationship } = req.body; //This is how you extract or retrieve the individual request body

    //validations: if all three fields are not provided or even if one field is empty, then return an error message
    if (!(surname && otherNames && gender && phoneNumber)) {
        res.status(400).json({
            message: "Kindly provide the surname, otherNames, gender and phoneNumber as they are required"
        }); 
    }

    //auto generate the patient ID
    const patientId = 'id' + (new Date()).getTime();


    // save the patient in the collection
    const patientCreated = await Patient.create({ patientId, surname, otherNames, gender, phoneNumber, residentialAddress, emergencyName, emergencyContact, emergencyContactRelationship});

     //return the movies to the user requesting for it
    res.status(200).json({
        message: "Patient was created successfully",
        patientCreated
    }); 
});


app.post("/save_patient_vitals", async function(req, res) {
    //logic here
    console.log(req.body);

    const { patientId, typeOfEncounter, bloodPressure, temperature, pulse, spo2 } = req.body; //This is how you extract or retrieve the individual request body

    //validations: if all three fields are not provided or even if one field is empty, then return an error message
    if (!(patientId && typeOfEncounter && bloodPressure && temperature && pulse)) {
        res.status(400).json({
            message: "Kindly provide the patientId, typeOfEncounter, bloodPressure, temperature, pulse as they are required"
        }); 
    }

    const visitDateAndTime = new Date(); //current date and time wil be saved as the visiation date and time
    // save the patient vitals in the collection
    const patientVitalsCreated = await PatientVisitation.create({ patientId, typeOfEncounter, bloodPressure, temperature, pulse, spo2, visitDateAndTime});

     //return the movies to the user requesting for it
    res.status(200).json({
        message: "Patient was created successfully",
        patientVitalsCreated
    }); 
});




app.get("/get_all_patients", async function(req, res){
    //write your logic here

    // get all patients from the collection
    const patientList = await Patient.find({ });

    //return the patients to the user requesting for it
    return res.status(200).json({
        patientList
    });
});


app.get("/get_patient_details/:patientId", async function(req, res){
    //write your logic here

    // get the patient details from the collection
    const patientDetails = await Patient.find({ patientId: req.params.patientId });

    //return the patients to the user requesting for it
    return res.status(200).json({
        patientDetails
    });
});







// listen for request
app.listen(4000, function () {
    console.log("now listening for requests");
});