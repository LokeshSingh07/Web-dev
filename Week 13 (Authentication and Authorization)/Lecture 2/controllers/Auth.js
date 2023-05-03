const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




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








// Login route handler
exports.login = async (req,res)=>{
    try{
        // fetch data
        const {email, password} = req.body;

        // validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill the details carefully",
            })
        }

        // check for registered user
        const user = await User.findOne({email});

        // if not a registered user
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered"
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        }

        // verify password and generate a JWT token
        if(await bcrypt.compare(password, user.password)){
            // password match
            const token = jwt.sign(payload, process.env.JWT_SECRET, 
                                    {
                                        expiresIn: "2h",
                                    });
            
            // user = user.toObject();
            user.token = token;
            user.password = undefined;
            
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }

            res.cookie("biscuit", token, options).status(200).json({
                success:true,
                token, 
                user,
                message: "User logged in successfully",
            });

        }
        else{
            // password do not match
            return res.status(403).json({
                success: false,
                message: "Password incorrect",
            })
        }


    }
    catch(err){
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: "User can't be login, Please try again later",
        })
    }
}