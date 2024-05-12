const express = require('express');
// require('dotenv').config(); //Kta e perdorum kur e kem .env edhe dojm mi perdor nbaz tsaj portin, mongoUri etj..
const cors = require('cors');
const port = process.env.PORT || 5001;
const router = express.Router();
const companyRouter = require('./Routes/companyRouter');
const internshipRouter = require('./Routes/internshipRouter');
const internshipApplicationRouter = require('./Routes/internshipApplicationRouter');
const mentorRouter = require('./Routes/mentorRouter');


//Routes
router.use('/api/companies', companyRouter);
router.use('/api/internshipApplications', internshipApplicationRouter);
router.use('/api/internships', internshipRouter);
router.use('/api/mentors', mentorRouter);

//Connecting to MongoDB
const mongoose = require('mongoose');
const uri = "mongodb+srv://hakifkadriu:admin123@internnexus.xy6a46f.mongodb.net/?retryWrites=true&w=majority&appName=InternNexus"
mongoose.connect(uri)
.then(() => 
        console.log('Connected to MongoDB'))
.catch((error) => 
    console.log("Couldn't connect to MongoDB", error))