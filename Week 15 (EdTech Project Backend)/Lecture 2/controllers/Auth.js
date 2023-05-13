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
        const chechUserPresent = await User.findOne({email});

        // if user already exist , then return a response
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User already registered",
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
            otp = otpGenerator(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
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
        
        // check user already exist or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        // find most recent otp for user
        const recentOtp = await OTP.find({email}).sort({createdAt : -1}).limit(1);
        console.log("recent otp : ", recentOtp);

        // validate OTP
        if(recentOtp.length == 0){
            // OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP Not Found",
            });
        }
        else if(otp !== recentOtp.otp){
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "OTP Not Matching",
            });
        }
        
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // entry create in DB
        const profilDetails = await Profile.create({
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
            additionalDetails: profilDetails._id,
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
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        // check user exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered, Please signUp first",
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
                expiresIn: "2h",
            });

            user.token = token;
            user.password = undefined;
            
            // create cookie & send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000)
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
        // fetch data from request body --> get old password, new password and confirm nnew password
        const {email, oldPassword, password, confirmPassword} = req.body;
        

        // validation
        if(!email || !oldPassword || !password || !confirmPassword){
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password value does not match, Please try again",
            });
        }

        // update pwd in DB
        const matchPassword = await User.find({password: oldPassword});
        if(!matchPassword){
            return res.status(403).json({
                success: false,
                message: "Please fill the correct password",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate(
            {email},
            {password: hashedPassword},
            {new: true}
        );


        // send email -- Password updated 
        const title = "Password change request";
        const body = "Your account password has successfully updated";
        const mailResponse = await mailSender(email, title, body);
        console.log("Email send successfully ", mailResponse);
        
        // return response
        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        })

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error in changing password, Please try again later",
        })
    }
}