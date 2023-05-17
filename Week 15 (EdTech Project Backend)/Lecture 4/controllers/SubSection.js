const SubSection = require("../models/SubSectionModel");
const Section = require("../models/SectionModel");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


// create subSection handler
exports.createSubSection = async(req,res)=>{
    try{
        // fetch data
        const {sectionId, title, timeDuration, description} = req.body;
        
        // extract file/video
        const video = req.files.videoFile;

        // validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // create subSection
        const subSectionDetails = await SubSection.create({
            title: title, 
            timeDuration: description ,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });
        
        // update the section with subSection ObjectId
        const updatedSection = await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $push :{
                    SubSection: subSectionDetails._id,
                }
            },
            {new: true}
        )
        // HW -> log updated section here, after adding populate query
        
        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection created successfully",
            updatedSection,
        })

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to create subSection, Please try again"
        });
    }
}






// HW -> update subSection handler
exports.updateSubSection = async(req,res)=>{
    try{
        // fetch data
        const {subSectionId, title, timeDuration, description} = req.body;

        // extract file
        const video = req.files.videoFile;
        
        // validation
        if(!subSectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                successs: false,
                message: "All fields are required",
            })
        }
        
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        
        // update the data
        const updatedDetails = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title,
                timeDuration,
                description,
                videoUrl: uploadDetails.secure_url,
            }
        )
        
        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            updatedDetails,
        })

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to update subSection, Please try again"
        });
    }
}







// HW -> Delete subSection handler
exports.deleteSubSection = async(req,res)=>{
    try{
        // get Id  -> assume that we are sending Id in params
        const {subSectionId} = req.params;
        
        // use findByIdAndDelete
        await findByIdAndDelete(subSectionId);

        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to delete subSection, Please try again"
        });
    }
}


