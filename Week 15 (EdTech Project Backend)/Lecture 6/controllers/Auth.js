const User = require("../models/UserModel");
const OTP = require("../models/OTPModel");
const Profile = require("../models/ProfileModel");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/MailSender");
require("dotenv").config();



// _____________________ send OTP
exports.sendOTP = async (req,res)=>{
    try{
        // fetch email from request body
        const {email} = req.body;
        
        // check if user already exist
        const checkUserPresent = await User.findOne({email});

        // if user already exist , then return a response
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User is already registered",
            });
        }

        // generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("Otp generated ", otp);


        // check unique otp or not
        let result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
            });
            console.log("Otp generated ", otp);
        }


        const otpPayload = {email, otp};

        // create an entry in DB for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // return response
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error in generating OTP",
        });
    }
}




// _____________________ signUp
exports.signUp = async (req,res)=>{
    try{
        // fetch data from request body
        const {
            firstName, 
            lastName,
            email,
            password, 
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        // validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        // 2 password match
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password value does not match, Please try again",
            });
        }
        
        // check if user already exist or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User is already registered, Please sign in to continue",
            });
        }

        // find most recent otp for user
        const recentOtp = await OTP.find({email}).sort({createdAt : -1}).limit(1);
        console.log("recent otp : ", recentOtp);

        // validate OTP
        if(recentOtp.length === 0){
            // OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP Not Found",
            });
        }
        else if(otp !== recentOtp[0].otp){
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "OTP Not Matching",
            });
        }
        
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);
        
        // entry create in DB
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        
        
        // return response
        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, Please try again later",
        });
    }
}



// _____________________ Login
exports.login = async (req,res)=>{
    try{
        // fetch data from request body
        const {email, password} = req.body;
        
        // validation
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        // check user exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered, Please signUp to continue",
            });
        }

        // create JWT token after password matching  -- (if user exist)
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email : user.email,
                id: user._id,
                accountType : user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            user.token = token;
            user.password = undefined;
            
            // create cookie & send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            } 
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged in successfully",
            });
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password is Incorrect",
            });
        }

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User cannot login, Please try again later",
        });
    }
}





// _____________________ change Password
exports.changePassword = async (req, res)=>{
    try{
        // Get user data from req.user
        const userDetails = await User.findById(req.user.id);

        // Fetch data from request body --> get old password, new password and confirm new password
        const {oldPassword, newPassword, confirmNewPassword} = req.body;
        

        // Validation old Password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password,
        )
        if(!isPasswordMatch){
            // if old password does not match, return 401 (unauthorized) error
            return res.status(401).json({
                success: false,
                message: "The password is incorrect"
            })
        }

        // Match new password and confirm new password
        if(newPassword !== confirmNewPassword){
            // if new password and confirm new password does not match, return a 400 (Bad request) error
            return res.status(400).json({
                success: false,
                message: "The Password and confirm Password does not match",
            });
        }

        // update pwd in DB
        const encryptedPassword  = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            {password: encryptedPassword},
            {new: true}
        )


        // send email -- Password updated 
        try{
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email sent successfully", emailResponse.response);
        }
        catch(err){
            // If there's an error sending the email, log the error and return 500
            console.log("Error occured while sending Email : ", err);
            return res.status(500).json({
                success: false,
                message: "Error occured while sending Email",
            });
        }

        
        // return response
        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        })

    }
    catch(err){
        console.error("Error while updating password", err);
        res.status(500).json({
            success: false,
            message: "Error in updating password, Please try again later",
        })
    }
}