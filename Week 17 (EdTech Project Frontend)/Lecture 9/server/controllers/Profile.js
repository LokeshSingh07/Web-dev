const Course = require("../models/CourseModel");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/ProfileModel");
const User  = require("../models/UserModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const {convertSecondsToDuration} = require("../utils/secToDuration")






// Update Profile handler
exports.updateProfile = async (req,res)=>{
    try{
        // fetch data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;

        // get UserId
        const id = req.user.id;
        
        // validation
        if(!contactNumber || !id){
            return res.status(400).json({
                success: false,
                success: "All fields are required",
            });
        }
        
        // find Profile by id
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId)
        
        // update the profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;

        // save the updated profile
        await profileDetails.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                profileDetails,
                userDetails,
            }
        })

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to update Profile, Please try again",
            error: err.message,
        });
    }
}






// Delete account handler
exports.deleteAccount = async(req,res)=>{
    try{
        // TODO -> Find more on job scheduling
        // const job = schedule.scheduleJob("10 * * * * *", function(){
        //     console.log("The answer to life, the universe, and everything!");
        // });
        // console.log(job);


        // get id
        const id = req.user.id;
        
        // validation -> valid user or not
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            }); 
        }
        
        // delete Profile
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});

        // TODO HW  -> unenroll user from all erolled course
        
        // delete user
        await User.findByIdAndDelete({_id: id});

        // return response
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
            data: userDetails,
        })

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to delete Profile, Please try again",
            error: err.message,
        });
    }
}








// getAllUserDetails
exports.getAllUserDetails = async(req,res)=>{
    try{
        // get id
        const id = req.user.id;

        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            data: userDetails,
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to fetch Profile data, Please try again",
            error: err.message,
        });
    }
}





// update display picture
exports.updateDisplayPicture = async (req,res)=>{
    try{
        // fetch data
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;

        // upload to cloudinary
        const image = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000);
        console.log("Image", image);

        // update the image/data in user model
        const updatedProfile = await User.findByIdAndUpdate(
            {_id: userId},
            {image: image.secure_url},
            {new: true}
        );
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Image updated successfully",
            data: updatedProfile,
        })


    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        })

    }
}





// getEnrolledCourses
exports.getEnrolledCourses = async(req,res)=>{
    try{
        // fetch data
        const userId = req.user.id;

        // db call
        let userDetails  = await User.findOne({_id: userId})
                                                    .populate({
                                                        path: "courses",
                                                        populate: {
                                                            path: "courseContent",
                                                            populate: {
                                                                path: "subSection"
                                                            }
                                                        }
                                                    })
                                                    .exec();

        // extra code --> Review
        userDetails = userDetails.toObject()
        var subSectionLength = 0;

        for(var i=0; i<userDetails.courses.length; i++){
            let totalDurationInSeconds = 0;
            subSectionLength = 0;

            for(var j=0; j<userDetails.courses[i].courseContent.length; j++){
                totalDurationInSeconds += userDetails.courses[i].courseContent[j]
                    .subSection.reduce((acc, curr)=> acc + parseInt(curr.timeDuration), 0);

                
                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);

                subSectionLength += userDetails.courses[i].courseContent[j].subSection.length;
            }

            // console.log("Course progress", userDetails.courses[i]._id);

            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userID: userId,
            })


            courseProgressCount = courseProgressCount?.completedVideos.length;
            if(subSectionLength === 0){
                userDetails.courses[i].progressPercentage = 100
            }
            else{
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progressPercentage = Math.round(
                    (courseProgressCount / subSectionLength) * 100 * multiplier
                ) / multiplier
            }

        }



        
        // validation
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find uset with id : ${userDetails}`,
            });
        }

        // return resposne
        return res.status(200).json({
            success:  true,
            message: "Enrolled courses fetched successfully",
            data: userDetails.courses,
        })

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}






// InstructorDashboard
exports.instructorDashboard = async(req,res)=>{
    try{
        const courseDetails = await Course.find({instructor: req.user.id});

        // calculate the required data
        const courseData = courseDetails.map((course)=>{
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            // create an new object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStats
        })


        // response
        return res.status(200).json({
            success: true,
            courses: courseData,
        })

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            data: success,
            message:"Internal server error"
        })
    }
}