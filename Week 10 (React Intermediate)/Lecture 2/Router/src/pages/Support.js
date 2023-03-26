import React from "react";
import { useNavigate } from "react-router-dom";



function Support(){

    const navigate = useNavigate();

    function clickHandler(){
        navigate("/labs")
    }

    function backHandler(){
        // to go back use -1
        navigate(-1);
    }



   return (
    <div className="max-w-max flex flex-col text-center text-2xl font-semibold mx-auto">
        <div>
            Support page
        </div>

        <button onClick={clickHandler} className="text-[15px] font-normal rounded-md py-1 px-5 mt-8 bg-slate-400 text-white">
            Go to labs page
        </button>

        <button onClick={backHandler} className="text-[15px] font-normal rounded-md py-1 px-5 mt-4 bg-slate-400 text-white">
            Go back
        </button>

    </div>
   );
}
export default Support;