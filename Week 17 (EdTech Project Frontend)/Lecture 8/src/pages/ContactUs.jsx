import React from 'react';
import Footer from '../components/common/Footer';
import ContactUsForm from '../components/ContactPage/ContactUsForm';
import * as Icons from "react-icons/vsc";

import * as Icon1 from "react-icons/bi";
import * as Icon2 from "react-icons/hi2";
import * as Icon3 from "react-icons/io5";
import ReviewSlider from '../components/common/ReviewSlider';



const contactInfo = [
    {
        heading: "Chat on us",
        description : "Our friendly team is here to help.",
        contact : "@mail address",
        icon : "HiChatBubbleLeftRight"
    },
    {
        heading: "Visit us",
        description : "Come and say hello at our office HQ.",
        contact : "Here is the location/ address",
        icon : "BiWorld"
    },
    {
        heading: "Call us",
        description : "Mon - Fri From 8am to 5pm",
        contact : "+123 456 7890",
        icon : "IoCall"
    }
]


const ContactUs = () => {


  return (
    <div className='bg-richblack-900'>
        {/* Section 1 */}
        <section>
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col lg:flex-row justify-between gap-[60px] mt-20  '>
                {/* left box */}
                <div className='w-[90%] lg:w-[40%] h-fit flex flex-col gap-5 rounded-xl bg-richblack-800 p-5 sm:p-10 mx-auto '>
                    {
                        contactInfo.map((element, index)=>{
                            const Icon = Icon1[element.icon] || Icon2[element.icon] || Icon3[element.icon];
                            return (
                                <div key={index} className='flex gap-2'>
                                    <div>
                                        {/* icon */}
                                        <Icon className="text-[25px] text-richblack-200"/>
                                    </div>
                                    <div>
                                        <h1 className='text-richblack-5 text-xl font-semibold'>{element.heading}</h1>
                                        <p className='text-richblack-300 text-[14px]'>{element.description}</p>
                                        <p className='text-richblack-300 text-[14px]'>{element.contact}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {/* right box */}
                <div className='w-[100%] lg:w-[60%] flex flex-col rounded-xl border-[1px] border-richblack-800 p-2 sm:p-10'>
                    <div>
                        <h1 className='text-3xl text-richblack-5     font-semibold'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                        <p className='text-richblack-300 text-[14px]'>Tall us more about yourself and what you’re got in mind.</p>
                    </div>
                    <div className='mt-8'>
                        <ContactUsForm/>
                    </div>
                </div>
            </div>
        </section>
    

        {/* Section 2 */}
        <section className='flex flex-col items-center mt-20 mb-40 p-5'>
            <h1 className='text-3xl font-semibold text-richblack-5'>
                Reviews from other learners
            </h1>

            <ReviewSlider/>
        </section>





        {/* Section 3 */}
        <Footer/>

    </div>
  )
}

export default ContactUs