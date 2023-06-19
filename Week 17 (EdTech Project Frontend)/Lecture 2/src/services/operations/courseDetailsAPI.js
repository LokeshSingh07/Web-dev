import { toast } from 'react-hot-toast';
import { courseEndpoints } from '../APIS';
import { APIConnector } from '../APIConnector';





const {
    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    EDIT_COURSE_API,                            //
    COURSE_CATEGORIES_API,  
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,             //
    DELETE_SECTION_API, 
    DELETE_SUBSECTION_API,
    DELETE_COURSE_API,                          //
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,      //
    LECTURE_COMPLETION_API,                     //
    CREATE_RATING_API,
} = courseEndpoints;










// get All Courses
export const getAllCourses = async()=>{
    const toastId = toast.loading("Loading....");
    let result = [];
    try{
        const response = await APIConnector("GET", GET_ALL_COURSE_API);
        console.log("GET_ALL_COURSES_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error("Could not fetch course categories");
        }

        result = response?.data?.data;
    }
    catch(err){
        console.log("GET_ALL_COURSES_API ERROR...",err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}









// fetch Course Details
export const fetchCourseDetails = async(courseId)=>{
    const toastId = toast.loading("Loading....");
    let result = null;
    try{
        const response = await APIConnector("POST", COURSE_DETAILS_API, {courseId} );
        console.log("COURSE_DETAILS_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error(response.data.message);
        }

        result = response?.data;
    }
    catch(err){
        console.log("COURSE_DETAILS_API ERROR...",err);
        // toast.error(err.message);
        result = err.response.data;
    }
    toast.dismiss(toastId);
    return result;
}











// fetch Course Categories  --> fetching the avalable course categories
export const fetchCourseCategories = async()=>{
    // const toastId = toast.loading("Loading....");
    let result = [];
    try{
        const response = await APIConnector("GET", COURSE_CATEGORIES_API);
        console.log("COURSE_CATEGORIES_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error(response.data.message);
        }

        result = response?.data?.data
    }
    catch(err){
        console.log("COURSE_CATEGORIES_API ERROR...",err);
        toast.error(err.message);
    }
    // toast.dismiss(toastId);
    return result;
}











// add the Course Details
export const addCourseDetails = async(data, token)=>{
    const toastId = toast.loading("Loading....");
    let result = null;
    try{
        const response = await APIConnector("POST", CREATE_COURSE_API, data, 
            {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        );
        console.log("CREATE_COURSE_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error("Could Not Add Course Details");
        }

        toast.success("Course details added successfully");
        result = response?.data?.data
    }
    catch(err){
        console.log("CREATE_COURSE_API ERROR...",err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}











// edit the course details
export const editCourseDetails = async(data, token)=>{
    const toastId = toast.loading("Loading....");
    let result = null;
    try{
        const response = await APIConnector("POST", EDIT_COURSE_API, data, 
            {
                "Content-Type" : "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        );
        console.log("EDIT_COURSE_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error("Could Not Update Course Details");
        }

        toast.success("Course details updated successfully");
        result = response?.data?.data
    }
    catch(err){
        console.log("EDIT_COURSE_API ERROR...",err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}










// create a section
export const createSection = async(data, token)=>{
    const toastId = toast.loading("Loading....");
    let result = null;
    try{
        const response = await APIConnector("POST", CREATE_SECTION_API, data, 
            {Authorization : `Bearer ${token}`}
        );
        console.log("CREATE_SECTION_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error("Could Not Create Section");
        }

        toast.success("Course section created");
        result = response?.data?.data
    }
    catch(err){
        console.log("CREATE_SECTION_API ERROR...",err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}











// create a subSection
export const createSubSection = async(data, token)=>{
    const toastId = toast.loading("Loading....");
    let result = null;
    try{
        const response = await APIConnector("POST", CREATE_SUBSECTION_API, data, 
            {Authorization : `Bearer ${token}`}
        );
        console.log("CREATE_SUBSECTION_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error("Could Not Add Lecture");
        }

        toast.success("Lecture Added");
        result = response?.data?.data
    }
    catch(err){
        console.log("CREATE_SUBSECTION_API ERROR...",err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}










// update a section
export const updateSection = async(data, token)=>{
    const toastId = toast.loading("Loading....");
    let result = null;
    try{
        const response = await APIConnector("POST", UPDATE_SECTION_API, data, 
            {Authorization : `Bearer ${token}`}
        );
        console.log("UPDATE_SECTION_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error("Could Not Update Section");
        }

        toast.success("Course Section Updated");
        result = response?.data?.data;
    }
    catch(err){
        console.log("UPDATE_SECTION_API ERROR...",err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}










// update a subSection
export const updateSubSection = async(data, token)=>{
    const toastId = toast.loading("Loading....");
    let result = null;
    try{
        const response = await APIConnector("POST", UPDATE_SUBSECTION_API, data, 
            {Authorization : `Bearer ${token}`}
        );
        console.log("UPDATE_SUBSECTION_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error("Could Not Update Lecture");
        }

        toast.success("Lecture Updated");
        result = response?.data?.data;
    }
    catch(err){
        console.log("UPDATE_SUBSECTION_API ERROR...",err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}









// delete a section
export const deleteSection = async(data, token)=>{
    const toastId = toast.loading("Loading....");
    let result = null;
    try{
        const response = await APIConnector("POST", DELETE_SECTION_API, data, 
            {Authorization : `Bearer ${token}`}
        );
        console.log("DELETE_SECTION_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error("Could Not Delete Section");
        }

        toast.success("Course Section Deleted");
        result = response?.data?.data;
    }
    catch(err){
        console.log("DELETE_SECTION_API ERROR...",err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}









// delete a subSection
export const deleteSubSection = async(data, token)=>{
    const toastId = toast.loading("Loading....");
    let result = null;
    try{
        const response = await APIConnector("POST", DELETE_SUBSECTION_API, data, 
            {Authorization : `Bearer ${token}`}
        );
        console.log("DELETE_SUBSECTION_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error("Could Not Delete Lecture");
        }

        toast.success("Lecture Deleted");
        result = response?.data?.data;
    }
    catch(err){
        console.log("DELETE_SUBSECTION_API ERROR...",err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}









// fetching all courses under a specific Instructor
export const fetchInstructorCourses = async(token)=>{
    const toastId = toast.loading("Loading....");
    let result = [];
    try{
        const response = await APIConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, 
            {Authorization : `Bearer ${token}`}
        );
        console.log("GET_ALL_INSTRUCTOR_COURSES_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error("Could Not Fetch Instructor Courses");
        }

        // toast.success("Instructor Course fetched successfully");
        result = response?.data?.updatedCourse
    }
    catch(err){
        console.log("GET_ALL_INSTRUCTOR_COURSES_API ERROR...",err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}










// delete a course
export const deleteCourse = async(data, token)=>{
    const toastId = toast.loading("Loading....");
    try{
        const response = await APIConnector("POST", DELETE_COURSE_API, data, 
            {Authorization : `Bearer ${token}`}
        );
        console.log("DELETE_COURSE_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error("Could Not Delete Course");
        }

        toast.success("Course Deleted");
    }
    catch(err){
        console.log("DELETE_COURSE_API ERROR...",err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
}









// get full details of a course
export const getFullDetailsOfCourse = async(courseId, token)=>{
    const toastId = toast.loading("Loading....");
    let result = null;
    try{
        const response = await APIConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, courseId, 
            {Authorization : `Bearer ${token}`}
        );
        console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error(response.data.message);
        }

        // toast.success("Course Details fetched successfully");
        result = response?.data?.data
    }
    catch(err){
        console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED ERROR...",err);
        toast.error(err.message);
        result = err.response.data;
    }
    toast.dismiss(toastId);
    return result;
}










// mark a lecture as completed
export const markLectureAsComplete = async(data, token)=>{
    const toastId = toast.loading("Loading....");
    let result = null;
    try{
        const response = await APIConnector("POST", LECTURE_COMPLETION_API, data, 
            {Authorization : `Bearer ${token}`}
        );
        console.log("LECTURE_COMPLETION_API RESPONSE...",response);

        if(!response?.data?.message){
            throw new Error(response.data.error);
        }

        toast.success("Lecture completed");
        result = true;
    }
    catch(err){
        console.log("LECTURE_COMPLETION_API ERROR...",err);
        toast.error(err.message);
        result = false;
    }
    toast.dismiss(toastId);
    return result;
}









// create a rating for course
export const createRating = async(data, token)=>{
    const toastId = toast.loading("Loading....");
    let result = false;
    try{
        const response = await APIConnector("POST", CREATE_RATING_API, data, 
            {Authorization : `Bearer ${token}`}
        );
        console.log("CREATE_RATING_API RESPONSE...",response);

        if(!response?.data?.success){
            throw new Error("Could Not Create Rating");
        }

        toast.success("Rating Created");
        result = true;
    }
    catch(err){
        console.log("CREATE_RATING_API ERROR...",err);
        toast.error(err.message);
        result = false;
    }
    toast.dismiss(toastId);
    return result;
}







