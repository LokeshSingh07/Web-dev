import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Blogs from '../components/Blogs';
import Header from '../components/Header'
import Pagination from '../components/Pagination';

export default function TagPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const tag = location.pathname.split("/").at(-1);

  return (
    <div>
        <Header/>

        <div className='w-1/2 mx-auto'>

          <div className='mt-[5rem]'>
            <button onClick={()=> navigate(-1)}
            className='font-semibold py-1 px-5 bg-slate-50 border rounded-md'>
              Back
            </button>
            <h2 className='font-semibold'>
              Blogs Tagged <span>#{tag}</span>
            </h2>
          </div>

          <Blogs/>
          <Pagination/>

        </div>



    </div>
  )
}
