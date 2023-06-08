import React from 'react'
import { FooterLink2 } from '../../data/footer-links'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { FaFacebook, FaGoogle, FaHackerNews, FaTwitch, FaYoutube } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'




const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenge",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const Plans = ["Paid memberships", "For students", "Business solutions"];
const community = ["Forums", "Chapters", "Events"];
const BottomFooter = ["Privacy policy", "Cookie Policy", "Terms"];



const Footer = () => {
  return (
    <div className='bg-richblack-800'>
      <div className='w-11/12 flex lg:flex-row flex-col justify-between gap-8 max-w-maxContent 
      text-richblack-400 border-b border-richblack-700 mx-auto py-14 leading-6'>
        {/* left section */}
        <div className='lg:w-[50%] flex flex-row justify-between flex-wrap lg:border-r lg:border-richblack-700 gap-y-7 lg:gap-3 pl-3 lg:pr-5 pt-7'>
          {/* column 1 */}
          <div className='w-[48%] lg:w-[30%] flex flex-col gap-2' >
            <img src={Logo} className='object-contain max-w-[250px]'/>
            <h1 className="text-richblack-50 font-semibold">Company</h1>

            <div className='flex flex-col gap-2'>
              {
                ["About", "Careers", "Affilitates"].map((element, index)=>{
                  return (
                    <div key={index}
                    className='text-richblack-400 text-[14px] hover:text-richblack-50 transition-all duration-200 cursor-pointer'>
                      <Link to={element.toLocaleLowerCase()}>{element}</Link>
                    </div>
                  )
                })
              }
            </div>
            <div className='flex gap-3 text-lg'>
              <FaFacebook/>
              <FaGoogle/>
              <FaTwitch/>
              <FaYoutube/>
            </div>
          </div>

          {/* column 2 */}
          <div className='w-[48%] lg:w-[30%]'>
            <h1 className='text-richblack-50 font-semibold'>Resources</h1>
            <div className='flex flex-col gap-2 mt-2'>
              {
                Resources.map((ele, ind)=>{
                  return <div key={ind}
                  className='text-richblack-400 text-[14px] hover:text-richblack-50 transition-all duration-200 cursor-pointer'>
                    <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>{ele}</Link>
                  </div>
                })
              }
            </div>

            <h1 className='text-richblack-50 font-semibold mt-7'>Support</h1>
            <div className='text-richblack-400 text-[14px] hover:text-richblack-50 transition-all duration-200 cursor-pointer'>
              <Link to={"/help-center"}>Help Center</Link>
            </div>
          </div>  

          {/* column 3 */}
          <div className='w-[48%] lg:w-[30%]'>
            <h1 className='text-richblack-50 font-semibold'>Plans</h1>
            <div className='flex flex-col gap-2 mt-2'>
              {
                Plans.map((ele, ind)=>{
                  return <div key={ind}
                  className='text-richblack-400 text-[14px] hover:text-richblack-50 transition-all duration-200 cursor-pointer'>
                    <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>{ele}</Link>
                  </div>
                })
              }
            </div>

            <h1 className='text-richblack-50 font-semibold mt-7'>community</h1>
            <div className='flex flex-col gap-2 mt-2'>
              {
                community.map((ele, ind)=>{
                  return <div key={ind}
                  className='text-richblack-400 text-[14px] hover:text-richblack-50 transition-all duration-200 cursor-pointer'>
                    <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>{ele}</Link>
                  </div>
                })
              }
            </div>
            
          </div>

        </div>


        {/* right Section */}
        <div className='lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3'>
          {
            FooterLink2.map((element, index)=>{
              return (
                <div key={index} className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
                  <h1 className='text-richblack-50 font-semibold mt-7'>{element.title}</h1>
                  <div className='flex flex-col gap-2 mt-2'>
                    {
                      element.links.map((ele, ind)=>{
                        return <div key={ind}
                        className='text-richblack-400 text-[14px] hover:text-richblack-50 transition-all duration-200 cursor-pointer'>
                          <Link to={ele.link}>{ele.title}</Link>
                        </div>
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>

      </div>


      {/* bottom */}
      <div className='w-11/12 max-w-maxContent mx-auto flex flex-row justify-between items-center flex-wrap text-richblack-400 pb-14 gap-3'>
          <div className='flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full'>
            <div className='flex flex-row'>
              {
                BottomFooter.map((ele, ind)=>{
                  return (
                    <div key={ind} 
                    className='text-richblack-400 text-[14px] hover:text-richblack-50 transition-all duration-200 cursor-pointer px-3'>
                      <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>{ele}</Link>
                    </div>
                  )
                })
              }
            </div>
            
            <div className='text-center flex gap-1 items-center'>
              Made with 
              <AiFillHeart fill='red'/>
              Singh @ 2023 StudyNotion
            </div>

          </div>

      </div>


    </div>
  )
}

export default Footer