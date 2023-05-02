const express = require("express");
const router = express.Router();



// import controleer
const {signup} = require("../controllers/Auth");




// define API routes
router.post("/signup", signup);




// export
module.exports = router;