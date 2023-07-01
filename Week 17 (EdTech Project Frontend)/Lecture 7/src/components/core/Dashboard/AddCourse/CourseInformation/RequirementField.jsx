import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';





const RequirementField = ({name, label, register, errors, setValue, getValues}) => {

  const {editCourse, course} = useSelector((state)=> state.course)
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);


  const handleAddRequirement = ()=>{
    if(requirement){
      setRequirementList([...requirementList, requirement])
      setRequirement("");
    }
  }

  const handleRemoveRequirement = (index)=>{
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  }


  useEffect(()=>{
    if(editCourse){
      setRequirementList(course?.instructions);
    }
    register(name, {
      required: true,
      validate: (value)=> value.length > 0
    })
  },[])


  useEffect(()=>{
    setValue(name, requirementList)
  },[requirementList])



  return (
    <div>
      <label htmlFor={name} className='label-style'>
        {label} <sup className='text-pink-200'>*</sup>
      </label>
      
      <div>
        <input
          type='text'
          id='name'
          value={requirement}
          onChange={(e)=> setRequirement(e.target.value)}
          className='form-style w-full'
        />
        <button   
          type='button' 
          onClick={handleAddRequirement}
          className='font-semibold text-yellow-50'
        >
          Add
        </button>

      </div>

      {
        requirementList.length > 0 && (
          <ul className='mt-5'>
            {
              requirementList.map((requirement, index)=>(
                <li key={index} className='flex flex-row items-center gap-3 my-auto'>
                  <span>{requirement}</span>
                  <button
                    type='button'
                    onClick={()=> handleRemoveRequirement(index)}
                    className='text-sm text-richblack-300 bg-richblack-700 px-2 rounded-full'
                  >
                    Clear
                  </button>
                </li>
              ))
            }
          </ul>
        )
      }

      {
        errors[name] && (
          <span className='mt-1 text-[12px] text-pink-200'>{label} is required</span>
        )
      }

    </div>
  )
}

export default RequirementField