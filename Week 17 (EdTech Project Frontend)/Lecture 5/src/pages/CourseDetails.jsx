import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesApi';





const CourseDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=> state.profile);
    const {courseId} = useParams();


    const handleBuyCourse = ()=>{
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            console.log("inside");
            return;
        }
        console.log("handle Buy course");
    }


  return (
    <div className='flex items-center mt-5'>

        <button 
            onClick={handleBuyCourse}   
            className="bg-yellow-50 font-semibold px-5 py-2"
        >
            Buy Now
        </button>


    </div>
  )
}

export default CourseDetails