const SubSection = require("../models/SubSectionModel");
const Section = require("../models/SectionModel");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


// create subSection handler
exports.createSubSection = async(req,res)=>{
    try{
        // fetch data
        const {sectionId, title, description} = req.body;
        
        // extract file/video
        const video = req.files.videoFile;

        // validation
        if(!sectionId || !title || !description || !video){
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
            timeDuration: `${uploadDetails.duration}`,
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
        .populate("subSection");
        
        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection created successfully",
            data: updatedSection,
        })

    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Unable to create subSection, Please try again"
        });
    }
}






// HW -> update subSection handler
exports.updateSubSection = async (req, res)=>{
    try{
        // fetch data
        const {sectionId, title, description} = req.body;
        const subSection = await SubSection.findById(sectionId);

        if(!subSection){
            return res.status(404).json({
                success: false,
                message: "SubSection Not Found",
            })
        }

        if(title !== undefined){
            subSection.title = title
        }
        if(description !== undefined){
            subSection.description = description
        }

        // upload video to cloudinary
        if(req.files && req.files.videoFile !== undefined){
            const video = req.files.videoFile;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
        }

        // update the data
        await subSection.save();
        

        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
        })

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Unable to update subSection, Please try again"
        });
    }
}







// HW -> Delete subSection handler
exports.deleteSubSection = async(req,res)=>{
    try{
        // get sectionId and subSectionId
        const {subSectionId, sectionId} = req.body;
        await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $pull: {
                    subSection: subSectionId,
                }
            },
            {new: true}
        )

        const subSection = await SubSection.findByIdAndUpdate({_id: subSectionId});
        
        if(!subSection){
            return res.status(404).json({
                success: false,
                message: "SubSection Not Found",
            })
        }

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


