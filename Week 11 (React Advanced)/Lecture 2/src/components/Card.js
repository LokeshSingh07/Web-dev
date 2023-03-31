import React from 'react'

export default function Card({post}) {

  return (
    <div className='flex flex-col border py-4 px-5 shadow-lg'>
      <p className='text-lg font-bold'>{post.title}</p>
      <p className='text-sm mt-[4px]'>
        By <span className='italic'>{post.author}</span> on <span className='underline font-bold'>{post.category}</span>
      </p>
      <p className='text-sm mt-[4px]'>Posted on {post.date}</p>
      <p className='text-md mt-[14px]'>{post.content}</p>

      <div className='flex gap-x-3'>
        {
          post.tags.map((tag, index)=>{
            return <span key={index} className="text-blue-500 underline font-bold text-xs mt-[5px]">{`#${tag}`}</span>
          })
        }
      </div>
    </div>
  )
}
