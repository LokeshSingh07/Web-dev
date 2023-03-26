import React from "react";
import { Outlet } from "react-router-dom";



 function MainHeader(){
    return (
        <div className="text-center text-2xl font-semibold">
            <Outlet/>
        </div>
    );
 }
 export default MainHeader;