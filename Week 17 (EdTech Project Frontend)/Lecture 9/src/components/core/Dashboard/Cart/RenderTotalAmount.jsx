import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { buyCourse } from '../../../../services/operations/studentFeaturesApi';
import IconBtn from '../../../common/IconBtn';







const RenderTotalAmount = () => {

    const {totalAmount, cart} = useSelector((state)=>state.cart);
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=> state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleBuyCourse = ()=>{
        const courses = cart.map((course)=>course._id);
        console.log("Bought these course : ", courses);

        // TODO: API integrate --> Payment gateway tak leke jaegi  
        buyCourse(token, courses, user, navigate, dispatch);
    }



  return (
    <div className='w-[250px] h-fit flex flex-col space-y-3 rounded-lg bg-richblack-800 p-5'>
        <p className='text-richblack-300'>Total : </p>
        <p className='text-2xl font-semibold text-yellow-100'>Rs {totalAmount}</p>

        <IconBtn
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses={"w-full justify-center"}
        />

    </div>
  )
}

export default RenderTotalAmount