const Profile = require("../models/ProfileModel");
const User  = require("../models/UserModel");



// Update Profile handler
exports.updateProfile = async (req,res)=>{
    try{
        // fetch data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;

        // get UserId
        const id = req.user.id;
        
        // validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success: false,
                success: "All fields are required",
            });
        }
        
        // find Profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId)
        
        // update the profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
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
        const id = user.id;

        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to fetch Profile data, Please try again"
        });
    }
}




