import React from 'react'
import HighlightText from '../Homepage/HighlightText'
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'


const Quote = () => {
  return (
    <div className='text-xl md:text-4xl font-bold text-center'>
        <ImQuotesLeft fill="#6E727F" className='w-[25px] inline mr-2 relative top-[-15px]'/>

        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text="combines technology"/>, 
        <span className='bg-gradient-to-r from-[#FF512F] via-[#F09819] to-[#78e4a5] text-transparent bg-clip-text'>
            {" "}
            expertise
        </span>
        , and community to create an 
        <span className='bg-gradient-to-r from-[#E65C00] via-[#F9D423] to-[#78e4a5] text-transparent bg-clip-text'> 
            {" "}
            unparalleled educational experience.
        </span>
        
        <ImQuotesRight fill="#6E727F" className='w-[25px] inline ml-2 relative top-[-15px]'/>
    </div>
  )
}

export default Quote    