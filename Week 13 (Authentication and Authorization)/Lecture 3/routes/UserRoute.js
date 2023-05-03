const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");



// import controleer
const {login, signup} = require("../controllers/Auth");
const {auth, isAdmin, isStudent} = require("../middlewares/AuthMw");


// define API routes
router.post("/signup", signup);
router.post("/login", login);







// testing protected route
router.get("/test", auth, (req,res)=>{
    res.json({
        success: true,
        message: "Welcome to the protected route for TEST",
    });
})


// protected routes
router.get("/student", auth, isStudent, (req,res)=>{
    res.json({
        success: true,
        message: "Welcome to the Protected route for STUDENT",
    });
});
router.get("/admin", auth, isAdmin, (req,res)=>{
    res.json({
        success: true,
        message: "Welcome to the Protected route for ADMIN",
    });
});




/*
router.get("/getEmail", auth, async (req,res)=>{
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            user: user,
            message: "Welcome to the Email route",
        });
    }
    catch(err){
        res.json({
            success: true,
            error :err.message,
            message: "error in email route",
        });
    }
})
*/



// export
module.exports = router;