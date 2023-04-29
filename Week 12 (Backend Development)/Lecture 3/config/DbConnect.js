const mongoose = require("mongoose");


const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((err)=>{
        console.log("Database connection failed");
        console.error(err.message);

        process.exit(1);
    })
}

module.exports = dbConnect;