const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");



// SignUp route handler
exports.signup = async(req,res)=>{
    try{
        // fetch data from request body
        const {name, email, password, role} = req.body;

        // check for already existing user
        const existingUser = await User.findOne({email});

        // if user exist then return a response
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already have an account",
            });
        }

        // Secure a Password -- (user not exist)
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: "Error is hashin Password",
            });
        }

        // Create a entry for user into a Database
        const user = await User.create({
            name, email, password:hashedPassword, role
        });

        // return a response
        res.status(200).json({
            success: true,
            message: "User Account created successfully"
        })

    }
    catch(err){
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: "User can't be register, Please try again later",
        })
    }
}






