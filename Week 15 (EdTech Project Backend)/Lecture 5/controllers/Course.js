const Course = require("../models/CourseModel");
const Category = require("../models/CategoryModel");
const User =require("../models/UserModel");
const {uploadImageToCloudinary} = require("../utils/imageUploader");





// createCourse handler function
exports.createCourse = async(req,res)=>{
    try{
        // fetch data from req body
        const {courseName, courseDescription, whatYouWillLearn, price, category, tag} = req.body;

        // fetch file
        const thumbnail = req.files.thumbnailImage;
        
        // Validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        // Instructor validation --> (store instructor objectId)
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details : ", instructorDetails);
        
        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor details Not Found",
            });
        }

        // Check given Category is valid or not 
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category details Not Found",
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
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
        });
        
        
        // add the new course to the User Schema of Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new: true}
        );
        
        // Add course entry in Category Schema
        // TODO --> HW
        // const categoryId = await findById(category);
        await Category.findByIdAndUpdate(
            {_id: categoryDetails._id},
            {
                $push: {
                    Course: newCourse._id
                }
            },
            {new: true}
        )

        
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