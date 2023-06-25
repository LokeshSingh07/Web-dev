import React from 'react'
import Footer from '../components/common/Footer'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { APIConnector } from '../services/APIConnector'
import { categories } from '../services/APIS'
import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import Course_Card from '../components/core/Catalog/Course_Card'



const tab = [
  {title: "Most popular"},
  {title: "New"}
]




const Catalog = () => {

  const {catalogName} = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("Most popular");
  

  // fetch all category 
  useEffect(()=>{
    const getCategories = async()=>{
      // find the current selected ID of category
      const response = await APIConnector("GET", categories.CATEGORIES_API);
      const category_id = response?.data?.data?.filter((category)=> 
        category.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;

      setCategoryId(category_id);
    }

    getCategories();
  },[catalogName])


  // fetch the course page details
  useEffect(()=>{
    const getCategoryDetails = async()=>{
      try{
        const response = await getCatalogPageData(categoryId);
        console.log("Response : ", response);
        
        setCatalogPageData(response);
      }
      catch(err){
        console.log(err);
      }
    }

    if(categoryId){
      getCategoryDetails();
    }
  },[categoryId])








  return (
    <div className='text-richblack-5'>

      <section className='w-full bg-richblack-800'>
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col gap-y-3 py-20'>
          <p className='text-richblack-300'>
            {`Home / Catalog / `}
            <span className='text-yellow-25'>{catalogPageData?.data?.selectedCategory?.name}</span>
          </p>
          <p className='text-3xl'>{catalogPageData?.data?.selectedCategory?.name}</p>
          <p className='text-richblack-200'>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>
      </section>



      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col gap-y-20 my-20'>
        {/* Section 1 */}
        <div>
          <h1 className='text-2xl'>Courses to get you started</h1>
          <div className='flex flex-row mt-3 border-b border-b-richblack-600'>
            {
              tab.map((link, index)=>(
                <button key={index}
                  className={`${link.title === active ? "text-yellow-25 border-b border-b-yellow-25" : "text-richblack-400"} px-4`}
                  onClick={()=> setActive(link.title)}
                >
                  {link.title}
                </button>
              ))
            }
          </div>

          <div className='mt-5'>
            <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses}/>
          </div>
        </div>


        {/* Section 2 */}
        <div>
          <p className='text-2xl'>  
            Top Courses in {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <div className='mt-5'>
            <CourseSlider courses={catalogPageData?.data?.differentCategory?.courses}/>
          </div>
        </div>


        {/* Section 3 */}
        <div>
          <p className='text-2xl'>Frequently Bought</p>

          <div className='py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
              {
                catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course, index)=>(
                  <Course_Card key={index} course={course}/>
                ))
              }
            </div>

          </div>
        </div>

      </div>


      <Footer/>

    </div>
  )
}

export default Catalog
