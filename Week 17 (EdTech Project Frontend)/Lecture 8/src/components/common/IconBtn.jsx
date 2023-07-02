import React from 'react';




const IconBtn = ({text, onclick, children, disabled, outline=false, customClasses, type}) => {

    return (
        <button 
            disabled={disabled}
            onClick={onclick}
            className={`flex items-center text-richblack-900 cursor-pointer gap-x-2 px-5 py-2 font-semibold rounded-md
                ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50" } 
                ${customClasses}`}
            type={type}
        >
            {
                children ? 
                (<div className='flex flex-row items-center gap-x-2'>
                    <span>
                        {text}
                    </span>
                    {children}
                </div>) :
                (text)
            }
        </button>
    )
}

export default IconBtn