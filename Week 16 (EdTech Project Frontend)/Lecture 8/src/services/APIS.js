const BASE_URL = process.env.REACT_APP_BASE_URL



// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}



// SETTINGS PAGE API
export const settingEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile"
}




// PROFILE Endpoint
export const profileEndpoints = {
    GET_USER_DETAILS_API : BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses"
}
















// CATGORIES 
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories"
};




// CONTACT US Endpoint
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}



