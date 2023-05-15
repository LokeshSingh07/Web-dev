const mongoose = require("mongoose");
require("dotenv").config();




exports.DbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((err)=>{
        console.log("Database connecton failed");
        console.error(err);
        process.exit(1);
    })
}
