import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import Card from './Card';
import Spinner from './Spinner';



export default function Blogs() {
  // consume
  const {loading, posts} = useContext(AppContext);

  return (
    <div className='w-10/12 max-w-[670px] h-full py-8 flex flex-col justify-center items-center gap-y-7 my-[3rem] mx-auto'> 
      {
        loading ? (<Spinner/>) : 
          (
            posts.length===0 ? 
            (<div>
              <p>No post found</p>
            </div>) : 
            (
              posts.map((post)=>(<Card post={post} key={post.id}/>))
            ) 
          )
      }
    </div>
  )
}
