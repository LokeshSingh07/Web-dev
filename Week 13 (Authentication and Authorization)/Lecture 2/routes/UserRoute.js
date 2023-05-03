const express = require("express");
const router = express.Router();



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


// protected routes for Student & Admin
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




// export
module.exports = router;