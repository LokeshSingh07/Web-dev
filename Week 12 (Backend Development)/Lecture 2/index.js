// server instantiate
const express = require('express');
const app = express();


// load config from env
require("dotenv").config();
const PORT = process.env.PORT || 4000;



// middleware to parse json request body
app.use(express.json());



// import routes for ToDo API
const todoRoutes = require('./routes/TodoRoute');



// mount/add the ToDo API Route
app.use("/api/v1",todoRoutes);


// start server
app.listen(PORT, (req,res)=>{
    console.log(`Server started at port ${PORT} `);
});




// connect to the database
const dbConnect = require('./config/dbConnect');
dbConnect();



// default route 
app.get("/", (req,res)=>{
    res.send("<h1>This is HOME Page baby </h1>")
})