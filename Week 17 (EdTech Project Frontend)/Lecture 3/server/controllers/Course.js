const Course = require("../models/CourseModel");
const Category = require("../models/CategoryModel");
const User = require("../models/UserModel");
const Section = require("../models/SectionModel");
const SubSection = require("../models/SubSectionModel");
const CourseProgress = require("../models/CourseProgress")
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration")




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

        console.log("Category : ", category);

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
            {_id: category},
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
            data: newCourse,
            message: "Course created successfully",
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






// editCourse handler function
exports.editCourse = async(req,res)=>{
    try{
        const {courseId} = req.body;
        const updates = req.body;
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course Not Found",
            });
        }

        // If thumbnail image is found update it
        if(req.files){
            console.log("Thumbnail updated");
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
         
            course.thumbnail = thumbnailImage.secure_url;
        }


        // Update only the fields that are present in the request body
        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instructions"){
                    course[key] = JSON.parse(updates[key]);
                }
                else{
                    course[key] = updates[key];
                }
            }
        }

        await course.save();

        const updatedCourse = await Course.findOne({_id: courseId})
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
        .exec();


        res.status(200).json({
            success: true,
            message: "Course Updated Successfully",
            data: updatedCourse,
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: true,
            message: "Unable to update Course",
            error: err.message,
        })
    }
}






// deleteCourse
exports.deleteCourse = async(req, res)=>{
    try{
        const {courseId} = req.body;
        
        // find the course
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).jaon({
                success: false,
                message: "Course not found",
            });
        }

        //unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled;
        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId, {
                $pull: {courses: courseId}
            });
        }


        // delete sections and subSections
        const courseSections = course.courseContent;
        for(const sectionId of courseSections){
            // Delete sub-section of the section 
            const section = await Section.findById(sectionId);
            if(section){
                const subSections = section.subSection;
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }

            // delete the section
            await Section.findByIdAndDelete(sectionId);
        }


        // delete the course
        await Course.findByIdAndDelete(courseId);


        // resonse
        return res.status(200).json({
            success: true,
            message: "Course Deleted successfully",
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to delete course",
            error: err.message,
        });
    }
}







// getAllCourse handler function
exports.getAllCourses = async (req,res)=>{
    try{
        const allCourses = await Course.find(
            {status: "Published"},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }
        ).populate("instructor")
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
                                                        path: "subSection",
                                                        select: "-videoUrl",
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


        // find the total duration of Course
        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content)=>{
            content.subSection.forEach((subSection)=>{
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            })
        })

        const totalDuration  = convertSecondsToDuration(totalDurationInSeconds);


        // return response
        return res.status(200).json({
            success: true,
            message: `Course details fetched successfully`,
            data: {
                courseDetails,
                totalDuration,
            },
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}







// getFullCourseDetails handler function
exports.getFullCourseDetails = async(req, res)=>{
    try{
        const {courseId} = req.body;
        const userId = req.user.id;

        // console.log("courseId", courseId);
        
        // find course details
        const courseDetails = await Course.findOne({_id: courseId})
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
        .exec();


        let courseProgressCount = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        })

        // console.log("courseProgressCount : ", courseProgressCount);


        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find Course with id: ${courseId}`,
            });
        }


        // find the total duration of Course
        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content)=>{
            content.subSection.forEach((subSection)=>{
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);


        // response
        return res.status(200).json({
            success: true,
            message: "Course Details Fetched successfully",
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : [],
            }
        })

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to fetch Instructor course Details",
            error: err.message,
        });
    }
}







// getInstructorCourse
exports.getInstructorCourses = async(req, res)=>{
    try{
        // get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id;

        // find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({createdAt: -1});

        // return the instructor course
        res.status(200).json({
            success: true,
            message: "Instructor Courses fetched successfully",
            data: instructorCourses
        })

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: err.message,
        });
    }
}





