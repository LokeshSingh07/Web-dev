import React from 'react';
import IconBtn from './IconBtn';





const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-richblack-900 bg-opacity-10 backdrop-blur-sm'>   
        <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6'>
            <p className='text-2xl font-semibold text-richblack-5'>
                {modalData.text1}
            </p>
            <p className='text-richblack-200 mt-3 mb-5 leading-6'>
                {modalData.text2}
            </p>

            <div className='flex gap-x-4 items-center'>
                <IconBtn 
                    onclick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                />
                <button onClick={modalData?.btn2Handler}
                    className="bg-richblack-700 px-[20px] py-[8px] rounded-md font-semibold text-richblack-5"
                >
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>




    </div>
  )
}

export default ConfirmationModal