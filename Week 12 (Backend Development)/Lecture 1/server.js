// Server Instantiate
const express = require("express");
const app = express();

// used to parse req.body in express -> PUT or POST 
const bodyParser = require("body-parser");
// specifically parse JSON data & add it to the req.body object
app.use(bodyParser.json());



// Activate the server at port 8000
app.listen(8000, ()=>{
    console.log("Server started at 8000 port");
});



// Routes
app.get('/', (req,res)=>{
    res.send("Hello mitarooo");
});


app.post('/post', (req,res)=>{
    const {name, brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("Car submitted successfully");
});





// use to connect express and mongodb
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology : true
})
.then(()=>{
    console.log("Successfully connected");
})
.catch(()=>{
    console.log("Connection failed");
})