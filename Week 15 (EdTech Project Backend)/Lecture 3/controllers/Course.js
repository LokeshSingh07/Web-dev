const Course = require("../models/CourseModel");
const Tag = require("../models/TagsModel");
const User =require("../models/UserModel");
const {uploadImageToCloudinary} = require("../utils/imageUploader");





// createCourse handler function
exports.createCourse = async(req,res)=>{
    try{
        // fetch data from req body
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

        // fetch file
        const thumbnail = req.files.thumbnailImage;
        
        // Validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        // Instructor validation --> (store instructor objectId)
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details : ", instructorDetails);
        // TODO : verify that userId and instructor._id are same or different?
        
        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor details Not Found",
            });
        }

        // Check given Tag is valid or not 
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success: false,
                message: "Tag details Not Found",
            });
        }
        
        // Image --> clodinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnailImage, process.env.FOLDER_NAME);
        
        // create an entry for new course 
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        });
        
        
        // add the new course to the User Schema of Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse_id,
                }
            },
            {new: true}
        );
        
        // add course entry in Tag
        // TODO --> HW
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        })

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: err.message,
        });
    }
}










// getAllCourse handler function
exports.showAllCourses = async (req,res)=>{
    try{
        const allCourses = await Course.find({},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }
        ).populate("Instructor").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        });


    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
            error: err.message,
        });
    }
}