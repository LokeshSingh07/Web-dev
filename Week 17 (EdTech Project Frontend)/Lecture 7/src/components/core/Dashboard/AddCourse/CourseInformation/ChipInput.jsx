import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux'






const ChipInput = ({label, name, placeholder, register, errors, setValue, getValues}) => {

    const {course, editCourse} = useSelector((state)=>state.course);

    // setting up state for managing chips array
    const [chips, setChips] = useState([]);


    useEffect(()=>{
        if(editCourse){
            setChips(course?.tag);
        }
        register(name, {
            required:true,
            validate: (value)=> value.length > 0
        })
    },[])

    useEffect(()=>{
        setValue(name, chips);
    },[chips])



    // function to handle user input when chips are added
    const handleKeyDown = (event)=>{
        if(event.key === "Enter" || event.key === ","){
            event.preventDefault();

            // Get the input value and remove any leading/trailing spaces
            const chipValue = event.target.value.trim();

            // check if the input value exists and is not already in the chip array   
            if(chipValue && !chips.includes(chipValue)){
                // Add the chip to the array and clear the input
                const newChips = [...chips, chipValue];
                setChips(newChips);
                event.target.value = "";
            }
        }
    }

    // Function to handle Deletion of a chip
    const handleDeleteChip = (chipIndex)=>{
        // filter the chip array to remove the chip with the given index
        const newChips = chips.filter((_, index)=> index !== chipIndex);
        setChips(newChips);
    }




  return (
    <div className='flex flex-col space-y-2'>
        
        <label htmlFor='name' className='label-style'>
            {label} <sup className='text-pink-200'>*</sup>      
        </label>

        <div className='flex w-full flex-wrap gap-y-2'>

            {/* Map over the chip array and render each chip */}
            {
                chips.map((chip, index)=>(
                    <div    
                        key={index}
                        className="m-1 flex items-center rounded-full bg-blue-200 px-2 py-1 text-sm"
                    >
                        {chip}
                        <button
                            type='button'
                            onClick={()=> handleDeleteChip(index)}
                            className='ml-2 focus:outline-none'
                        >
                            <MdClose className='text-sm'/>
                        </button>
                    </div>
                ))
            }

            {/* Render the input for adding new Chip */}
            <input
                type="text"
                id={name}
                name={name}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                className="form-style w-full"
            />
            {
                errors[name] && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        {label} is required
                    </span>
                )
            }
        </div>

    </div>
  )
}

export default ChipInput