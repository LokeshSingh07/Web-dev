const Profile = require("../models/ProfileModel");
const User  = require("../models/UserModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");



// Update Profile handler
exports.updateProfile = async (req,res)=>{
    try{
        // fetch data
        const {dateOfBirth="", about="", contactNumber} = req.body;

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

        // save the updated profile
        await profileDetails.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        })

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to update Profile, Please try again"
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
        })

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to delete Profile, Please try again"
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
            message: "Unable to fetch Profile data, Please try again"
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
        const userDetails  = await User.findOne({_id: userId})
                                                    .populate("courses")
                                                    .exec();
        
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

