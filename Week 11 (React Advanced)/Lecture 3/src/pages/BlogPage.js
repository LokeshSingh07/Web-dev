import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';




export default function BlogPage() {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const {setLoading, loading} = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1); 


  async function fetchRelatedBlogs(){
    setLoading(true);
    
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    console.log(url);
    try{
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
    }
    catch(err){
      console.log("Error in fetching related blogs");
      setBlog(null);
      setRelatedBlogs([]);
    }
  }

  useEffect(()=>{
    if(blogId){
      fetchRelatedBlogs();
    }
  },[location.pathname]);




  return (
    <div>
      <Header/>


      <div className='w-1/2 flex flex-col mt-[5rem] mx-auto'>

        <div>
          <button onClick={()=> navigate(-1)}
            className='font-semibold py-1 px-5 bg-slate-50 border rounded-md'>
            Back
          </button>


          {
            loading ? 
            (<p>Loading</p>) : 
            (
              blog ? 
              (<div>
                <BlogDetails post={blog}/>

                <div className='w-full h-[1px] mt-[2rem] bg-slate-500'></div>
                <h2 className='text-xl font-semibold mt-[2rem]'>Related Blogs</h2>
                {
                  relatedBlogs.map((post)=> (
                    <div key={post.id}>
                      <BlogDetails post={post}/>
                    </div>
                  ))
                }

              </div>) : 
              (<p>No page found</p>) 
            )
          }
        </div>


      </div>




    </div>
  )
}
