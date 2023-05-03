// Auth, isAdmin, IsStudett

const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req, res, next)=>{
    try{
        // extract JWT token

        console.log("cookies", req.cookies.z);
        console.log("body", req.body.token);
        console.log("Authorization", req.header("Authorization"));

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        // if token is not present
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        // verifying the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        }
        catch(err){
            return res.status(401).json({
                success: false,
                message: "Token is Invalid",
            });
        }

        next();
    }
    catch(err){
        res.status(401).json({
            success: false,
            message: "Something went wrong, while verifying token",
            error: err.message,
        });
    }
}






exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Student, you cannot access",
            });            
        }
        next();
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "User role is not matching",
        });
    }
}

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin, you cannot access",
            });            
        }
        next();
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "User role is not matching",
        });
    }
}






