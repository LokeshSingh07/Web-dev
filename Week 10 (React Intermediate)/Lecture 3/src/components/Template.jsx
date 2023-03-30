import React from "react";
import Frame from '../assets/frame.png'
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";



function Template({title, desc1, desc2, image, formType, setIsLoggedIn}){
    return (
        <div className="w-10/12 max-w-[1080px] h-full  flex justify-between mx-auto mt-[2rem]">
            <div>
                <h1>{title}</h1>
                <p>
                    <span>{desc1}</span>
                    <span>{desc2}</span>
                </p>

                {
                    formType==='signup' ? 
                    (<SignupForm setIsLoggedIn={setIsLoggedIn}/>) : 
                    (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)
                }

                <div>
                    <div></div>
                    <p>OR</p>
                    <div></div>
                </div>

                <button>
                    <p>Sign Up with Google</p>
                </button>
            </div>

            <div className="relative">
                <img src={Frame} width={325} height={504} loading="lazy"
                    className="absolute top-3 left-3 -z-[1]"
                />
                <img src={image} width={325} height={504} loading="lazy"/>
            </div>


        </div>
    )
}
export default Template;