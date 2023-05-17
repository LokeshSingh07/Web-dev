const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
require("dotenv").config();





// auth
exports.auth = async (req, res, next)=>{
    try{
        // extract token
        const token = req.body.token || req.cookies.token || req.header("Authorisation").replace("Bearer ", "");

        // if token missing, the return response
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // verify the Token
        try{
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err){
            // verification issue
            return res.status(401).json({
                success: false,
                message: "Token is Invalid",
            });
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the Token",
        });
    }
}




// isStudent
exports.isStudent = async (req, res, next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Student only, You cannot access",
            });
        }
        next();
    }
    catch(err){
        console.error("Error in Student authorization",err);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, Please try again",
        });
    }
}



// isIntructor
exports.isInstructor = async (req, res, next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Instructor only, You cannot access",
            });
        }
        next();
    }
    catch(err){
        console.error("Error in Instructor authorization",err);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, Please try again",
        });
    }
}



// isAdmin
exports.isAdmin = async (req, res, next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin only, You cannot access",
            });
        }
        next();
    }
    catch(err){
        console.error("Error in Admin authorization",err);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, Please try again",
        });
    }
}


