import { toast } from "react-hot-toast";
import { profileEndpoints } from "../APIS";
import { APIConnector } from "../APIConnector";
import { setLoading, setUser } from '../../slices/profileSlice';
import { logout } from './authAPI';




const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
} = profileEndpoints;






// getUserDetails
export function getUserDetails(token, navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await APIConnector("GET", GET_USER_DETAILS_API, null, 
                {Authorization: `Bearer ${token}`}
            );
            console.log("GET_USER_DETAILS_API RESPONSE...", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            const userImage = response.data.data.image ? 
            response.data.data.image : 
            `https://api.dicebar.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`

            dispatch(setUser({...response.data.data, image:userImage}));
        }
        catch(err){
            dispatch(logout(navigate));
            console.log("GET_USER_DETAILS_API ERROR....", err);
            toast.error("Could not Get User Details");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(true));
    }
}








// getUserEnrolledCourses
export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        console.log("BEFORE CALLING BACKEND API FOR ENROLLED COURSES");
        const response = await APIConnector("GET", GET_USER_ENROLLED_COURSES_API, null, 
            {Authorization: `Bearer ${token}`}
        );
        console.log("AFTER CALLING BACKEND API FOR ENROLLED COURSES");

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data;
    }
    catch(err){
        console.log("GET_USER_ENROLLED_COURSES_API ERROR...", err);
        toast.error("Could not get Enrolled Courses");
    }
    toast.dismiss(toastId);
    return result;
}