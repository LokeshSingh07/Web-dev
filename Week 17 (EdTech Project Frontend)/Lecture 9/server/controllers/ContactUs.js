const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/MailSender");
 


exports.contactUsController = async(req, res)=>{
    try{
        const {email, firstName, lastName, message, phoneNumber, countryCode} = req.body;
        console.log(req.body);
        
        const emailRes = await mailSender(email, "Your Data send successfully", 
            contactUsEmail(email, firstName, lastName, message, phoneNumber, countryCode)
        );
        console.log("Email Response ", emailRes);

        return res.status(200).json({
            success: true,
            message: "Email send successfully",
        })

    }
    catch(err){
        console.log("Error ", err);
        console.log("Error message", err.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong...",
        })
    }
}