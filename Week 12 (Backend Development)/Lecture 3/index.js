// server instantiate
const express = require("express");
const app = express();


// load config file from env
require("dotenv").config();
const PORT = process.env.PORT ||  4000;


// middleware to parse json request body
app.use(express.json());



// import routes
const todoRoute = require('./routes/TodoRoute');



// mount/add the API route
app.use("/api/v1", todoRoute);




// start server
app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
});



// database connection
const dbConnect = require('./config/DbConnect');
dbConnect();



// default route
app.get("/", (req,res)=>{
    res.send("<h1>This is Home page</h1>");
})




