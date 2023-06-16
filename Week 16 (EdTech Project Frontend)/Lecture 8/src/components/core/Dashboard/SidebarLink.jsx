import React from 'react';
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';






const SidebarLink = ({link, iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname);
    }



  return (
    <NavLink to={link.path} 
        // onClick={}
        className={`relative px-8 py-2 text-sm  ${matchRoute(link.path) ? "bg-yellow-700" : "bg-opacity-0" }`}
    >
        <span className={`absolute top-0 left-0 h-full w-[0.2rem] bg-yellow-50
            ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}
        `}>
        </span>
        

        <div className={`flex items-center gap-x-2 ${matchRoute(link.path) ? "text-yellow-50 font-semibold" : "text-richblack-300"} `}>
            <Icon className="text-lg"/>
            <span>{link.name}</span>
        </div>

    </NavLink>
  )
}

export default SidebarLink