require('dotenv').config(); //for dotenv files- install npm i dotenv fjrst
const express=require('express');
const mongoose= require("mongoose");
const cors = require('cors');

const {userRouter}=require("./routes/user")
const {courseRouter}=require("./routes/course")
const {adminRouter}=require("./routes/admin")
const {googleAuthRouter}=require("./routes/googleAuth")

const app=express();

// CORS middleware - allow requests from your React frontend
const allowedOrigins = ['http://localhost:5173', 'https://courser-a-course-selling-app-actual.onrender.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
// createUserroutes(app);
// createCourseroutes(app); can be rewritten as... production efficient 
app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);  
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/auth", googleAuthRouter);

async function dbconnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL); //from the .env file
        console.log("Connected to MongoDB successfully");
        
        //now we're shifting focus such that the backend only connects if the db connects
        app.listen(3000,()=>{
            console.log("server is running on port 3000");
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}
dbconnect();
