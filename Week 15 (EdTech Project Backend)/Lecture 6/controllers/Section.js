const Section = require("../models/SectionModel");
const Course = require("../models/CourseModel");




// create section handler
exports.createSection = async(req, res)=>{
    try{
        // data fetch
        const {sectionName, courseId} = req.body;
        
        // validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing properties",
            });
        }
        
        // create section
        const newSection = await Section.create({sectionName});
        
        // update course with section ObjectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId, 
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            {new: true},    
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        })
        .exec();
        // TODO  -> use populate to replace secion/subSection both in the updatedCourseDetails
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails,
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Unable to create section, Please try again"
        });
    }
}








// Update section handler
exports.updateSection = async(req,res)=>{
    try{
        // fetch data from request body
        const {sectionId, sectionName} = req.body;
        
        // data validation
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        // Update the data 
        const updatedDetails = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true});


        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            updatedDetails,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to update section, Please try again"
        });
    }
}







// delete Section handler
exports.deleteSection = async(req,res)=>{
    try{
        // get Id  -> assume that we are sending Id in params
        const {sectionId} = req.params;
        
        // use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        // RODO[Testing] --> Do we need to delete the entry from the course schema

        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
        })
    
    }
    catch(err){
        console.log("Error in deleting section: ", error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete section, Please try again"
        });
    }
}



