const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5001;
const app = express();

const mongoose = require('mongoose');
const uri = "mongodb+srv://hakifkadriu:admin123@internnexus.xy6a46f.mongodb.net/?retryWrites=true&w=majority&appName=InternNexus"
mongoose.connect(uri)
.then(() => 
        console.log('Connected to MongoDB'))
.catch((error) => 
    console.log("Couldn't connect to MongoDB", error))