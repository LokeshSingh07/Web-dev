import React from "react";
import { useNavigate } from "react-router-dom";



function Labs(){

    const navigate = useNavigate();

    function clickHandler(){
        navigate("/about")
    }



    return (
        <div className="text-center text-2xl font-semibold">
           <div>
                Labs page
           </div>
           <button onClick={clickHandler} className="text-[15px] font-normal rounded-md py-1 px-5 mt-8 bg-slate-400 text-white">
                Go to about page
            </button>
        </div>
   );
}
export default Labs;