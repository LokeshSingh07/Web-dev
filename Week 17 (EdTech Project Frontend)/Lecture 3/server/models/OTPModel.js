const mongoose = require("mongoose");
const mailSender = require("../utils/MailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");



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
    },

});




// a function --> to send emails
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verifivation Email from StudyNotion" , emailTemplate(otp));
        console.log("Email send successfully ", mailResponse);

    }
    catch(err){
        console.log("Error occured while sending verification Mail ", err)
        throw err;
    }   
}


// Define a post save hook to send email after the document has been saved
OTPSchema.pre("save", async function(next){
    console.log("New document saved to database");
    
    // Only send an email whan a new document is created
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});


module.exports = mongoose.model("OTP", OTPSchema);