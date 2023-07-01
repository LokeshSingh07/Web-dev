import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

 


export default function Cart(){

    const {totalAmount, totalItems} = useSelector((state)=>state.cart);



    return (
        <div className="text-richblack-5">
            <h1 className="mb-14 text-3xl font-medium">Cart</h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Courses in Cart</p>

            {
                totalAmount > 0 ? 
                (<div className="mt-8 flex flex-col-reverse lg:flex-row gap-x-10 gap-y-6">
                    <RenderCartCourses/> 
                    <RenderTotalAmount/>
                </div>) : 
                (<p className="mt-14 text-center text-3xl text-richblack-100">
                    Your Cart is Empty
                </p>) 
            }

        </div>
    )
}





