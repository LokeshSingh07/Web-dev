import React from 'react'
import { NavLink } from 'react-router-dom'


export default function BlogDetails({post}) {
  return (
    <div className='my-7 mx-auto'>
        <NavLink to={`/blog/${post.id}`}>
            <span className='text-[17px] font-semibold'>{post.title}</span>
        </NavLink>

        <p className='text-[14px] mt-1'>
            By <span>{post.author}</span> on {" "}
            <NavLink to={`/categories/${post.category.replaceAll(" ", "-")}`}>
                <span className='text-blue-700'>{post.category}</span>
            </NavLink>
        </p>
        
        <p className='text-[14px]'>Posted on {post.date}</p>

        <p className='text-[16px] mt-2'>{post.content}</p>

        <div className='text-blue-700 text-[13px] space-x-2 '>
            {
                post.tags.map((tag, index)=>(
                    <NavLink key={index} to={`/tags/${tag.replaceAll(" ", "-")}`}>
                        {`#${tag} `}
                    </NavLink>
                ))
            }
        </div>

    </div>
  )
}
