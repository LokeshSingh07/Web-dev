import React from 'react'
import HighlightText from '../Homepage/HighlightText'
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'


const Quote = () => {
  return (
    <div className='text-3xl font-bold'>
        <ImQuotesLeft fill="#6E727F" className='inline mr-3'/>

        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text="combines technology"/>, 
        <span className='text-[#ffaa0e]'>
            expertise
        </span>
        , and community to create an 
        <span className='text-[#ffbb3e]'>
            {" "}
            unparalleled educational experience.
        </span>
        
        <ImQuotesRight fill="#6E727F" className='inline ml-3'/>
    </div>
  )
}

export default Quote    