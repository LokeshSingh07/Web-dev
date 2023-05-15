// Server instantiate
const express = require("express");
const app = express();

// load config file from env
require("dotenv").config();
const PORT = process.env.PORT || 4000;


// middleware --> express.json() & express-fileUpload
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

// Database connection krnah
const db = require("./config/DbConnect");
db.DbConnect();

// cloud se connect 
const cloudinary = require("./config/Cloudinary");
cloudinary.cloudinaryConnect();


// API route mount add krna h 
const file = require("./routes/FileUploadRoute");
app.use("/api/v1/upload", file);


// activate server
app.listen(PORT, (req,res)=>{
    console.log(`App is running at ${PORT} PORT`);
});


// defauly route
app.get("/", (req,res)=>{
    res.send("<h1>This is Home Page<h1>");
})








