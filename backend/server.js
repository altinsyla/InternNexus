const express = require('express');
// require('dotenv').config(); //Kta e perdorum kur e kem .env edhe dojm mi perdor nbaz tsaj portin, mongoUri etj..
const cors = require('cors');
const port = process.env.PORT || 5001;
const app = express();
const connectDB = require('./connectdb');

const mongoURI = "mongodb+srv://hakifkadriu:admin123@internnexus.xy6a46f.mongodb.net/?retryWrites=true&w=majority&appName=InternNexus"

app.use(cors());

//Routes
const internshipRouter = require('./Routes/internshipRouter');
app.use('/internships', internshipRouter);
const internshipApplicationRouter = require('./Routes/internshipApplicationRouter');
app.use('/internshipapplication',  internshipApplicationRouter);
app.use(express.static('public'))


//Connecting to MongoDB
const start = async () => {
        try {
          await connectDB(mongoURI);
          console.log("Connected to DB");
          app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
          }).on('error', (err) => {
            console.error('Server error:', err.message);
          });
        } catch (error) {
          console.error('Database connection error:', error.message);
        }
      };
      
      start();