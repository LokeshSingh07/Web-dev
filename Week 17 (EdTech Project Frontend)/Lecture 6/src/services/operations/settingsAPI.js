import { toast } from "react-hot-toast";
import { settingEndpoints } from "../APIS";
import { APIConnector } from "../APIConnector";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";








const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingEndpoints;





// Update display picture 
export function updateDisplayPicture(token, formData){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await APIConnector("PUT", UPDATE_DISPLAY_PICTURE_API, 
                formData, {
                    "Content-Type" : "multipart/form-data",
                    Authorization : `Bearer ${token}`
                }
            )
            console.log("UPDATE_DISPLAY_PICTURE_API RESPONSE... ", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.data));
            toast.success("Display picture updated successfully");

        }
        catch(err){
            console.log("UPDATE_DISPLAY_PICTURE_API ERROR...", err);
            toast.error("Could not update Display Picture");
        }
        toast.dismiss(toastId);
    }
}






// Update profile
export function updateProfile(token, formData){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        try{
            const response = await APIConnector("PUT", UPDATE_PROFILE_API, formData, 
                {Authorization : `Bearer ${token}`}
            )
            console.log("UPDATE_PROFILE_API RESPONSE ... ", response)

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            // [ Something is wrong here ]
            const userImage = response?.data?.data?.userDetails?.image ?
            response?.data?.data?.userDetails?.image : 
            `https://api.dicebar.com/5.x/initials/svg?seed=${response?.data?.data?.userDetails?.firstName} ${response?.data?.data?.userDetails?.lastName}`

            dispatch(setUser({...response.data.data.userDetails, image: userImage}));
            // localStorage.setItem("user", JSON.stringify(response.data.data.userDetails));
            toast.success("Profile updated successfully")
        }
        catch(err){
            console.log("UPDATE_PROFILE_API ERROR...", err);
            toast.error("Could not update Profile");
        }
        toast.dismiss(toastId);
    }
}








// Change password
export async function changePassword(token, formData){
    const toastId = toast.loading("Loading...");
    try{
        const response = await APIConnector("POST", CHANGE_PASSWORD_API, formData , 
            {Authorization: `Bearer ${token}`}
        );
        console.log("CHANGE_PASSWORD_RESPONSE...", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Password changed successfully");
    }
    catch(err){
        console.log("CHANGE_PASSWORD_API ERROR....", err);
        toast.error("Could not change password");
    }
    toast.dismiss(toastId);
}





// delete Profile
export function deleteProfile(token, navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        try{
            const response = await APIConnector("DELETE", DELETE_PROFILE_API, null, 
                {Authorization: `Bearer ${token}`}
            )
            console.log("DELETE_PROFILE_API ERROR...", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
    
            toast.success("Profile Deleted successfully");
            dispatch(logout(navigate))
        }
        catch(err){
            console.log("DELETE_ACCOUNT_API ERROR....", err);
            toast.error("Unable to delete your Account");
        }
        toast.dismiss(toastId)
    }
}