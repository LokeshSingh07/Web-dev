import { toast } from 'react-hot-toast';
import { setLoading, setToken} from '../../slices/authSlice';
import { setUser } from '../../slices/profileSlice';
import { resetCart } from '../../slices/cartSlice'
import { APIConnector } from '../APIConnector';
import { endpoints } from '../APIS';


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints;




// send OTP
export function sendOtp(email, navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await APIConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent : true,
            })
            console.log("SENDOTP API RESPONSE...", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Otp sent successfully");
            navigate("/verify-email");
        }
        catch(err){
            console.log("SEND OTP API ERROR...",err);
            toast.error("Could not send OTP")
        }
        dispatch(setLoading(false));
    }
}





// signUp
export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await APIConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            })
            console.log("SIGNUP API RESPONSE...", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Account created successfully");
            navigate("/login");
        }
        catch(err){
            console.log("SIGNUP API ERROR...",err);
            toast.error("SignUp Failed")
        }
        dispatch(setLoading(false));
    }
}







// Login
export function login(email, password, navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            // call backend API
            const response = await APIConnector("POST", LOGIN_API, {email, password});
            console.log("LOGIN API RESPONSE...", response);

            console.log(response.data.success)

            // check success
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Login Successfully");

            // set token data
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image ?
            response.data.user.image : 
            `https://api.dicebar.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            // set user details
            dispatch(setUser({...response.data.user, image:userImage}));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/dashboard/my-profile")
        }
        catch(err){
            console.log("LOGIN API ERROR...",err);
            toast.error("Login failed")
        }
        dispatch(setLoading(false));
    }
}








// logout
export function logout(navigate){
    return (dispatch)=>{
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(resetCart());

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out");
        navigate('/');
    }
}






// getPasswordResetToken
export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            // call backend API
            const response  = await APIConnector("POST", RESETPASSTOKEN_API, {email});
            console.log("RESET PASSWORD TOKEN RESPONSE...", response)

            // check success
            if(!response.data.success){
                throw new Error(response.data.message);
            } 

            // successfull
            toast.success("Reset Email sent");
            setEmailSent(true);
        }
        catch(err){
            console.log("RESET PASSWORD TOKEN ERROR..", err);
            toast.error("Failed to send email for reseting password");
        }

        dispatch(setLoading(false));
    }
}







// resetPassword
export function resetPassword(password, confirmPassword, token){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            // call backend API 
            const response = await APIConnector("POST", RESETPASSWORD_API, {password,confirmPassword, token});
            console.log("RESET PASSWORD RESPONSE...", response);

            // check success
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            // successful toast
            toast.success("Password has been reset successfully");
        }
        catch(err){
            console.log("RESET PASSWORD ERROR..", err);
            toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}


















