import React from 'react'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/Homepage/HighlightText'
import NotFoundImg from "../assets/Images/404.png"
import Astro from "../assets/Images/astro.png"



const Error = () => {
  return (
    <div className='h-[80vh] flex flex-col justify-center items-center text-richblack-5'>

        <div className='relative w-[80%] lg:w-[40%] mt-10'>
          <img src={NotFoundImg} className='opacity-80'/>
          <img src={Astro} className='absolute top-[40%] left-[38%] w-[25%] animate-bounce'/>
        </div>


        <div className='flex flex-col justify-center items-center mt-20'>
          <h1 className='text-3xl font-semibold mt-5'>
              Oops, you've lost in space
          </h1>
          <p className='text-richblack-300 mt-2'>
            We can't find the page you are looking for... 
          </p>

          <div className='mt-8'>
            <Link to="/">
              <button className='bg-richblack-800 px-5 py-2 text-richblack-900 font-semibold rounded-full'>
                <HighlightText text="Go Home"/>
              </button>
            </Link>
          </div>
        </div>

    </div>
  )
}

export default Error