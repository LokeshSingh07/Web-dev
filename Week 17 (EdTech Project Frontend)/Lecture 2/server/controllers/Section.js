const Section = require("../models/SectionModel");
const SubSection = require("../models/SubSectionModel")
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
            data: updatedCourseDetails,
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Unable to create section, Please try again",
            error: err.message
        });
    }
}








// Update section handler
exports.updateSection = async(req,res)=>{
    try{
        // fetch data from request body
        const {sectionId, sectionName, courseId} = req.body;
        
        // data validation
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        // Update the data 
        const updatedDetails = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true});



        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection" 
            }
        });


        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: course,
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
        // HW --> req.params [test]
        // get Id 
        const {sectionId, courseId} = req.body;
        
        await Course.findByIdAndUpdate(courseId, {
            $pull : {
                courseContent: sectionId
            }
        })
        const section = await Section.findById(sectionId);
        console.log(sectionId, courseId);

        if(!section){
            return res.status(404).json({
                success: false,
                message: "Section Not Found"
            })
        }

        // Delete Sub Section
        await SubSection.deleteMany({_id: {$in: section.subSection}})

        await Section.findByIdAndDelete(sectionId);


        // Find the updated course and return 
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate : {
                path: "subSection"
            }
        })
        .exec();
 

        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data: course,
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



