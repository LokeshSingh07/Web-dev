import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col items-center mt-20 mb-40'>
        <h1 className='text-3xl font-semibold'>
            Get in Touch
        </h1>
        <p className='text-richblack-300'>
            We’d love to here for you, Please fill out this form.
        </p>
    
        <div className='mt-10'>
            <ContactUsForm/>
        </div>

    </div>
  )
}

export default ContactFormSection