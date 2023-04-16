import React from 'react'
import Blogs from '../components/Blogs'
import Header from '../components/Header'
import Pagination from '../components/Pagination'

export default function Home() {

  return (
    <div>


        <Header/>

         <div className='w-1/2 mx-auto my-[5rem]'>
          <Blogs/>
         </div>   
        <Pagination/>
    
    </div>
  )
}
