import React, { useState } from 'react';
import {FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { toast } from 'react-toastify';



function Card(props){

    let course = props.course;
    let isLiked =  props.isLiked;
    let setIsLiked = props.setIsLiked;
    let description = `${props?.course?.description?.substring(0,100)}...`;


    function likeHandler(){
        if(isLiked.includes(course.id)){
            // phle se like hua padha h
            setIsLiked((prev)=>(prev.filter((cid)=>(cid!==course.id))));
            toast.warning("like removed");
        }
        else{
            // phle se like nhi h
            if(isLiked.length ===0){
                setIsLiked([course.id]);
            }
            else{
                // non empty
                setIsLiked((prev) => [...prev, course.id]);
            }
            toast.success("Like successfully");
        }
    }

    return (
        <div className='w-[300px] bg-bgDark bg-opacity-90 rounded-md overflow-hidden'>
            <div className='relative'>
                <img src={course.image.url}></img>
                <div className='w-[35px] h-[35px] bg-white rounded-full absolute -bottom-3 right-2 flex place-content-center'>
                    <button onClick={likeHandler}>
                        {   
                            !isLiked.includes(course.id) ? (<FcLikePlaceholder fontSize={"1.65rem"}/>) : (<FcLike fontSize='1.65rem'/>)
                            
                        }
                    </button>
                </div>
            </div>

            <div className='p-4'>
                <p className='text-white font-semibold text-lg leading-6'>{course.title}</p>
                <p className='text-white mt-2'>{description}</p>
            </div>

        </div>
    )
}
export default Card;