const express = require('express'); // library for making the app a REST API app
const bodyParser = require('body-parser'); // library for retrieving json data from requests 
const mongoose = require('mongoose'); // MongoDB Library for nodejs 
const RegisterPatients = require('.models/registerpatients');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/cinema');
mongoose.Promise = global.Promise;

//for retrieving json data from requests 
app.use(bodyParser.json());



app.get("/get_patient_details/:patientId", async function(req, res){


    //get patient details from the collection
    const PatientList = await Patient.find({ });

    //return the patients to the user requesting for it
    return res.status(200).json({
        PatientListList
    });
});

app.get("/get_info_by", async function(req, res){
    //write your logic here

    console.log(req.query);
    console.log(req.query.year);

    //connect to the database and get the movies from the collection
    const PatientList = await PatientList.find({  });

    //return the movies to the user requesting for it
    return res.status(200).json({
        PatientList
    });
});





app.post("/save_info", async function(req, res) {
    //write your logic here
    console.log("save movie request. request body is :", req.body);

    const { patientId, surname, othernames,phoneNumber,residentialAddress,emergencyContact } = req.body; //This is how you extract or retrieve the individual request body
    console.log(patientId, surname, othernames, phoneNumber,residentialAddress,emergencyContact);

    //validations: if all the fields are not provided or even if one field is empty, then return an error message
    if (!(patientId && surname && othernames && phoneNumber && residentialAddress && emergencyContact)) {
        res.status(400).json({
            message: "Kindly provide all necessary fields"
        }); 
    }

    // save the movie in the collection
    const patientListCreated = await PatientList.create({ patientId: id, surname: surname, othernames: othernames , phoneNumber: number ,residentialAddress: address ,emergencyContact: name});

     //return the movies to the user requesting for it
    res.status(200).json({
        message: "Your info was created successfully",
        patientListCreated
    }); 
});






// listen for request
app.listen(4000, function () {
    console.log("now listening for requests");
});