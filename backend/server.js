
const express = require('express');
// require('dotenv').config(); //Kta e perdorum kur e kem .env edhe dojm mi perdor nbaz tsaj portin, mongoUri etj..
const cors = require('cors');
const port = process.env.PORT || 5001;
const app = express();
const connectDB = require('./connectdb');
const path = require('path');



const mongoURI = "mongodb+srv://hakifkadriu:admin123@internnexus.xy6a46f.mongodb.net/?retryWrites=true&w=majority&appName=InternNexus"



app.use(cors());
app.use(express.json());

//Routes
const internshipRouter = require('./Routes/internshipRouter');
app.use('/internships', internshipRouter);
const internshipApplicationRouter = require('./Routes/internshipApplicationRouter');
app.use('/internshipapplication',  internshipApplicationRouter);
const userRouter = require('./Routes/userRouter');
app.use('/user',  userRouter);
const skillsRouter = require('./Routes/skillsRouter');
app.use('/skills',  skillsRouter);

app.use(express.static('public'))
app.use('/userimages', express.static(path.join(__dirname, 'public/userimages')));

// app.get("/check-token", verifyToken /* Middleware*/, (req, res) => {
//   res.json(req.user);
// });


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