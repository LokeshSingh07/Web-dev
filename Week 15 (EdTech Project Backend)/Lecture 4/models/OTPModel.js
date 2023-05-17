const mongoose = require("mongoose");
const mailSender = require("../utils/MailSender");


const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
        required: true,
    },

});




// a function --> to send emails
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verifivation Email from StudyNotion" , otp);
        console.log("Email send successfully ", mailResponse);

    }
    catch(err){
        console.log("Error occured while sending verification Mail ", err)
        throw err;
    }   
}


// pre middleware
OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
});


module.exports = mongoose.model("OTP", OTPSchema);