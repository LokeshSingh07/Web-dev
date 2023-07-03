// Import the required modules
const express = require("express")
const router = express.Router()



// import constroller
const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payment")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/AuthMw")


// routes
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment",auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);



module.exports = router;