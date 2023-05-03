// Server Instantiate
const express = require("express");
const app = express();


// Load config file from env
require("dotenv").config();
const PORT = process.env.PORT || 4000;


// Middleware
app.use(express.json());


// Import & mount API route
const user = require("./routes/UserRoute");
app.use("/api/v1", user);


// Database connection
const dbConnect = require("./config/DbConnect");
dbConnect();


// Start server
app.listen(PORT, (req,res)=>{
    console.log(`Server started at ${PORT} port`);
})


// Default route
app.get("/", (req,res)=>{
    res.send("<h1>This is Home page</h1>");
})