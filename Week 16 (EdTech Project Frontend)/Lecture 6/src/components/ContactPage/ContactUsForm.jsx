import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { APIConnector } from '../../services/APIConnector';
import CountryCode from '../../data/countrycode.json'



const ContactUsForm = () => {

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful},
  } = useForm();


  const submitContactForm = async(data)=>{
    console.log("Logging Data : ", data);
    try{
      setLoading(true);
      // const response = await APIConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      const response = {status: "ok"}
      console.log("Logging response", response);

      setLoading(false);
    }
    catch(err){
      console.log("Error : ", err.message);
      setLoading(false);
    }
  }



  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    }
  },[isSubmitSuccessful, reset]);



  return (
    <form onSubmit={handleSubmit(submitContactForm)} className="text-richblack-5 flex flex-col gap-y-4">

      {/* firstName and lastName */}
      <div className='w-full flex flex-col sm:flex-row gap-x-4'>
        {/* firstName */}
        <div className='w-full lg:w-[50%]'>
          <label htmlFor='firstName' className='mb-1 text-[0.875rem] leading-[1.375rem]'>  
            First Name <sup className='text-pink-200'>*</sup>
          </label>
          <input
            type="text"
            name='firstName'
            id='firstName'
            placeholder='Enter first name'
            style={{
            boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
            }}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px]'
            {...register("firstName", {required: true})}
          />
          {
            errors.firstName && (
              <span>
                Please enter your name
              </span>
            )
          }
        </div>

        {/* lastName */}
        <div className='w-full lg:w-[50%]'>
          <label htmlFor='lastName' className='mb-1 text-[0.875rem] leading-[1.375rem]'>  
            Last Name
          </label>
          <input
            type="text"
            name='lastName'
            id='lastName'
            placeholder='Enter last name'
            style={{
            boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
            }}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px]'
            {...register("lastName",)}
          />
        </div>
      </div>


      {/* email */}
      <div>
        <label htmlFor='email' className='mb-1 text-[0.875rem] leading-[1.375rem]'>  
          Email Address <sup className='text-pink-200'>*</sup>
        </label>
        <input
          type="email"
          name='email'
          id='email'
          placeholder='Enter Email address'
          style={{
          boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
          }}
          className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px]'
          {...register("email", {required: true})}
        />
        {
          errors.email && (
            <span>
              Please enter email address
            </span>
          )
        }
      </div>



      {/* phone number */}
      <div>
        <label htmlFor='phoneNumber' className='mb-1 text-[0.875rem] leading-[1.375rem]'>
          Phone Number <sup className='text-pink-200'>*</sup>
        </label>
        <div className='flex flex-row gap-5 w-full'>
          {/* dropdown */}
          <div className='w-[12%]'>
            <select 
              name="dropdown" 
              id="dropdown" 
              style={{
                boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
              }}
              className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px]'
              {...register("countryCode", {required:true})}
            >
              {
                CountryCode.map((element, index)=> (
                  <option key={index} value={element.code}>
                    {element.code} - {element.country} 
                  </option>
                ))
              }
            </select>
          </div>

          <div className='w-[85%]'>
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              placeholder='12345 67890'              
              style={{
                boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
              }}
              className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px]'
              {...register("phoneNumber", {
                required: {value:true, message: "Please enter phone number"},
                maxLength: {value:10, message: "Invlaid phone number"} ,
                minLength: {value:8, message: "Invlaid phone number"} 
              })}
            />
            {
              errors.phoneNumber && (
                <span>{errors.phoneNumber.message}</span>
              )
            }
          </div>
          

        </div>

      </div>



      {/* message */}
      <div>
        <label htmlFor='message' className='mb-1 text-[0.875rem] leading-[1.375rem]'>  
          Message <sup className='text-pink-200'>*</sup>
        </label>
        <textarea
          name='message'
          id='message'
          cols={30}
          rows={5}
          placeholder='Enter your message'
          style={{
          boxShadow: "inset 0px -1px rgba(255,255,255,0.18)"
          }}
          className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px]'
          {...register("message", {required: true})}
        />
        {
          errors.message && (
            <span>
              Please enter your message
            </span>
          )
        }
      </div>



      {/* button */}
      <button type="submit" 
        className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900'
      >
        Send Message
      </button>


    </form>
  )
}

export default ContactUsForm