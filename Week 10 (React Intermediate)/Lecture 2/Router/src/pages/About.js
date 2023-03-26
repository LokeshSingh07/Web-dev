import React from "react";
import { useNavigate } from "react-router-dom";


function About(){
    const navigate = useNavigate();

    function clickHandler(){
        navigate("/support");
    }


   return (
        <div className="text-center text-2xl font-semibold">
            <div>
                About page
            </div>
            <button onClick={clickHandler} className="text-[15px] font-normal rounded-md py-1 px-5 mt-8 bg-slate-400 text-white">
                Go to support page
            </button>
        </div>
   );
}
export default About;