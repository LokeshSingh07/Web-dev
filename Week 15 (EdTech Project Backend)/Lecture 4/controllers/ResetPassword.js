const User = require("../models/UserModel");
const mailSender = require("../utils/MailSender");
const bcrypt = require("bcrypt");


// Reset password token
exports.resetPasswordToken = async(req,res)=>{
    try{
        // get email from request body
        const {email} = req.body;

        // check user for this email , email validation
        const user = await User.findOne({email: email});
        if(!user){
            return res.json({
                success: false,
                message: "Your Email is not registered with us",
            });
        }

        // generate Token
        const token = crypto.randomUUID();

        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email: email}, 
                                            {
                                                token: token,
                                                resetPasswodExpires: Date.now() + 5*60*1000,
                                            }, 
                                            {new: true});

        // create url
        const url = `http://localhost:3000/updatePassword/${token}`;


        // send email containing the url    
        await mailSender(email, "Password reset link", `Password Reset link : ${url}`);

        // return res
        res.status(200).json({
            success: true,
            message: "Email sent successfully, Please check email and change password",
        })


    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset password",
        });
    }
}



// Reset password
exports.resetPassword = async(req, res)=>{
    try{
        // fetch data from request body
        const {password, confirmPassword, token} = req.body;
    
        // validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message : "Password not matching",
            });
        }
    
        // get user details from DB using token
        const userDetails = await User.findOne({token: token});
    
        // if no entry - Invalid token
        if(!userDetails){
            return res.status(401).json({
                success: false,
                message : "Token is Invalid",
            })
        }
    
        // check token expiration time
        if(userDetails.resetPasswodExpires < Date.now()){
            return res.status(403).json({
                success:  false,
                message: "Token is Expired, Please regenerate your token",
            });
        }
    
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Update the password
        await User.findOneAndUpdate(
            {token : token},
            {password : hashedPassword},
            {new: true},
        );
    
        // return response
        return res.status(200).json({
            success: true,
            message: "Password reset Successfully",
        })
            
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong while reset password",
        });
    }
}


