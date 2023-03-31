import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Pagination(){
  const {page, totalPages, handlePageChange} = useContext(AppContext);


  return (
    <div className='w-full flex justify-center border-2 fixed bottom-0 bg-white mx-auto'>
      <div className='flex justify-between items-center w-10/12 max-w-[670px] py-2'>
        <div className='flex gap-2'>
          {page>1 &&
            <button 
              className='border-2 rounded-md px-4 py-1'
              onClick={()=> handlePageChange(page-1)}>
              previous
            </button>
          }
          {page < totalPages &&
            <button 
              className='border-2 rounded-md px-4 py-1'
              onClick={()=> handlePageChange(page+1)}>
              Next
            </button>  
          }
        </div>

        <p>
          Page {page} of {totalPages}
        </p>

      </div>

    </div>
  )
}
