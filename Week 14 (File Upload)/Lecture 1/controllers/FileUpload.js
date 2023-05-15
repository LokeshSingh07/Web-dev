const File = require("../models/FIleSchema");




// localFileUpload  --> handler function
exports.localFileUpload = async (req,res)=>{
    try{
        // fetch file from request
        const file = req.files.File;
        console.log(("File fetched --> ", file));

        // create path where files need to be store on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}` ;
        console.log(("Path: ", path));

        // add path to the move function
        file.mv(path, (err)=>{
            console.log(err);
        });
 
        // return a successful response
        res.json({
            success: true,
            message: "Local file uploaded successfully",
        });
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failure while uploading file",
        });
    }
}













