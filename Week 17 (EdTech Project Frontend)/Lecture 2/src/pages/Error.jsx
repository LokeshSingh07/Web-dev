import React from 'react'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/Homepage/HighlightText'
// import NotFoundImg from "../assets/Images/"



const Error = () => {
  return (
    <div className='h-[80vh] flex flex-col justify-center items-center text-richblack-5'>

         {/* <img src={NotFoundImg}/> */}

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
  )
}

export default Error