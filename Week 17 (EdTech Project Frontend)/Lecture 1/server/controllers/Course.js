const Course = require("../models/CourseModel");
const Category = require("../models/CategoryModel");
const User =require("../models/UserModel");
const {uploadImageToCloudinary} = require("../utils/imageUploader");





// createCourse handler function
exports.createCourse = async(req,res)=>{
    try{
        // Get userId from request object
        const userId = req.user.id

        // fetch data from req body
        let {courseName, courseDescription, whatYouWillLearn, price, category, tag, status, instructions} = req.body;

        // fetch file
        const thumbnail = req.files.thumbnailImage;
        
        // Validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        if(!status || status === undefined){
            status = 'Draft'
        }
        
        // Instructor validation --> Check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });
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
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        
        // create an entry for new course 
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
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
        
        // TODO [HW] --> Add course entry in Category Schema
        // const categoryId = await findById(category);
        await Category.findByIdAndUpdate(
            {_id: categoryDetails._id},
            {
                $push: {
                    Courses: newCourse._id
                }
            },
            {new: true}
        )

        
        // return the new course and a success response
        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: err.message,
        });
    }
}







// getAllCourse handler function
exports.getAllCourses = async (req,res)=>{
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
        ).populate("Instructor")
        .exec();

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






// getCourseDetails handler function
exports.getCourseDetails = async(req,res)=>{
    try{
        // get id
        const {courseId} = req.body;

        // find course details
        const courseDetails = await Course.find({_id: courseId})
                                                .populate({
                                                    path: "instructor",
                                                    populate: {
                                                        path: "additionalDetails"
                                                    }
                                                })
                                                .populate({
                                                    path: "courseContent",
                                                    populate: {
                                                        path: "subSection"
                                                    }
                                                })
                                                .populate("ratingAndReviews")
                                                .populate("category")
                                                .exec();

        // validation
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            });
        }

        // return response
        return res.status(200).json({
            success: true,
            message: `Course details fetched successfully`,
            data: courseDetails,
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

