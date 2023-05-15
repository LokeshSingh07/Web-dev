const express = require("express");
const router =  express.Router();



// import controller
const {localFileUpload} = require("../controllers/FileUpload");



// API route
router.post("/localFileUpload", localFileUpload);


// export
module.exports = router;
