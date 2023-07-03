const SubSection = require("../models/SubSectionModel");
const CourseProgress = require("../models/CourseProgress");






exports.updateCourseProgress = async(req, res)=>{
    try{
        const {courseId, subSectionId} = req.body;
        const userId = req.user.id;

        // check if the subSection is valid
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({success:false, message:"Invalid SubSection"})
        }

        // check for old entry
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userID: userId,
        })
        if(!courseProgress){
            return res.status(404).json({success:false, message:"Course progress does not exist"})
        }
        else{
            // check for re-completing video/sub-section
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(404).json({success:false, message:"Sub section already completed"})
            }
    
            // push into completed videos
            courseProgress.completedVideos.push(subSectionId);
        }

        
        await courseProgress.save();

        return res.status(200).json({
            success: true,
            message: "Course Progress updated successfully",
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false, 
            message:"Internal server error",
        })
    }
}













