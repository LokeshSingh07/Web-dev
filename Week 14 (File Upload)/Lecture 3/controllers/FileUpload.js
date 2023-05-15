const File = require("../models/FIleSchema");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();



// localFileUpload  --> handler function
exports.localFileUpload = async(req,res)=>{
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







function isFileTypeSupported(fileType, supportedTypes){
    return supportedTypes.includes(fileType);
}
async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


// Image upload  --> handler function
exports.imageUpload = async(req,res)=>{
    try{
        // fetch data from request 
        const {name, email, tags} = req.body;
        console.log(name, email, tags);

        // fetch file 
        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("File type  ->", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }


        // upload to cloudinary  -> file format supported
        console.log("Uploading to cloudinary");
        const response = await uploadFileToCloudinary(file, process.env.FOLDER_NAME);
        console.log(response);

        // db save   ->  create an entry in database 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        // return response
        res.status(200).json({
            success: true,
            message: "Image successfully uploaded to cloudinary",
            imageUrl: response.secure_url,
        });


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong, while uploading Image",
        });
    }
}






// video upload  --> handler function
exports.videoUpload = async(req,res)=>{
    try{
        // fetch data from rquest 
        const {name, email, tags} = req.body;
        console.log(name, email, tags);

        // fetch video 
        const file = req.files.videoFile;
        console.log(file);

        // validation
        const supportedTypes = ["mov", "mp4", "mkv"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("File type --> ", fileType);

        // TOD0 : add a upper limit of 5mb for video
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }


        // upload to cloudinary  -> file format supported
        console.log("Uploading to Cloudinary");

        const response = await uploadFileToCloudinary(file, process.env.FOLDER_NAME);
        console.log(response);

        // db save   ->  create an entry in database 
        const fileData  = await File.create({
            name, 
            email, 
            tags,
            imageUrl: response.secure_url,
        });

        // return successful resonse
        res.status(200).json({
            success: true,
            message: "video successfully uploaded to cloudinary",
            imageUrl: response.secure_url,
        });


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong, while uploading Video",
        });
    }
}










// Image Size Reducer  --> handler function
exports.imageSizeReducer = async(req,res)=>{
    try{
        // fetch data from request 
        const {name, email, tags} = req.body;
        console.log(name, email, tags);

        // fetch file 
        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("File type --> ", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        // upload to cloudinary  -> file format supported
        console.log("Uploading to cloudinary");
        const quality = 50;
        const response = await uploadFileToCloudinary(file, process.env.FOLDER_NAME, quality);
        console.log(response);

        // db save   ->  create an entry in database 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        // return response
        res.status(200).json({
            success: true,
            message: "Reduce Image successfully uploaded to cloudinary",
            imageUrl: response.secure_url,
        });


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong, while uploading reduced Image",
        });
    }
}


