const express=require('express');
require("dotenv").config();
const cors=require('cors');
const connectDB = require('./config/mongodb');
const connectCloudinary = require('./config/cloudinary');
const cookieParser = require("cookie-parser");

connectDB();
connectCloudinary();
const app = express();
app.use(express.json());  

// Middleware must be before routes
const allowedOrigins = [
    "http://localhost:5174",
  "https://outpass-z1a9.vercel.app",
  
];
app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server or curl/postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false); // ❌ no crash
    },
    credentials: true,
  })
);


app.use(cookieParser());


app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/outpass',require('./routes/outpassroutes'));
app.use('/api/admin',require('./routes/Adminroutes'));
app.use('/api/student',require('./routes/Studentroutes'))



const PORT = process.env.PORT || 7000;  // Set a fallback port
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
