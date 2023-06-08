import React, { useEffect, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import {NavbarLinks} from '../../data/navbar-links';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { useSelector } from 'react-redux';
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { APIConnector } from '../../services/APIConnector';
import { categories } from '../../services/APIS';
import {IoIosArrowDropdownCircle} from 'react-icons/io'



const subLinks = [
  {
    title: "Python",
    link: "/catalog/python"
  },
  {
    title: "Web dev",
    link: "/catalog/web-dev"
  },
]


const Navbar = () => {

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart);
  const location = useLocation();
  // const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async() => {
    try{
      const result = await APIConnector("GET", categories.CATEGORIES_API);
      console.log("Printing SubLinks result : ", result);
      setSubLinks(result.data.data);

    }
    catch(err){
      console.log("Could not fetch the category list ",err);
    }
  }



  useEffect(()=>{
    // fetchSubLinks();
  },[]);



  const matchRoute = (route)=>{
    return matchPath({path:route}, location.pathname);
  }


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700'>
        <div className='w-11/12 max-w-maxContent flex flex-row items-center justify-between mx-auto'>
            
            <Link to='/'>
              <img src={Logo} width={160} height={32}/>
            </Link>


            {/* Nav Links */}
            <nav>
              <ul className='flex flex-row gap-x-6 text-richblack-25'>
                {
                  NavbarLinks.map((element, index)=>{
                    return (
                      <li key={index}>
                        {
                          element.title === 'Catalog' ?
                          (<div className='relative flex flex-row items-center font-semibold gap-1 group'>
                            <p>{element.title}</p>
                            <IoIosArrowDropdownCircle/>

                            <div className='invisible absolute left-[50%] top-[50%] translate-x-[-50%]
                            translate-y-[50%] flex flex-col rounded-md bg-richblack-5 p-4
                            text-richblack-900 opacity-0 transition-all duration-200
                            group-hover:visible group-hover:opacity-100 lg:w-[250px] z-10'>
                            
                              <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 
                              rounded bg-richblack-5 translate-x-[80%] translate-y-[-40%]'>
                              </div>

                              {
                                subLinks.length ? 
                                (<div>
                                  {
                                    subLinks.map((subLink, index)=>{
                                      return <Link to={`${subLink.link}`} key={index}>
                                        <p>{subLink.title}</p>
                                      </Link>
                                    })
                                  }
                                </div>) : 
                                (<div></div>)
                              }
                            </div>

                          </div>) : 
                          (
                            <Link to={element?.path}>
                              <p className={`${matchRoute(element?.path) ? "text-yellow-25" : "text-richblack-25"} font-semibold`}>
                                {element.title}
                              </p>
                            </Link>
                          ) 
                        }
                      </li>
                    )
                  })
                }
              </ul>
            </nav>


            {/* Login SingUp Dashboard */}
            <div className='flex flex-row gap-x-4 items-center'>
                {
                  user && user?.accountType != "Instructor" && (
                    <Link to="/dashboard/cart" className='relative'>
                      <AiOutlineShoppingCart/>
                      {
                        totalItems > 0 && (
                          <span>{totalItems}</span>
                        )
                      }
                    </Link>
                  )
                }

                {
                  token === null && (
                    <Link to="/login">
                      <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                        Login
                      </button>
                    </Link>
                  )
                }
                {
                  token === null && (
                    <Link to="/signup">
                      <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                        signup
                      </button>
                    </Link>
                  )
                }
                {
                  token !== null && (<ProfileDropDown/>)
                }

            </div>

        </div>
    
    
    
    </div>
  )
}

export default Navbar