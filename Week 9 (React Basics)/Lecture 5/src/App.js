import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {filterData , apiUrl} from './data';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import Cards from './components/Cards';
import Spinner from './components/Spinner';




function App() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  // API call
  async function fetchData(){
    setLoading(true);
    try{
      const res = await fetch(apiUrl);
      const output = await res.json();
      // save data
      setCourses(output.data);
      // console.log(output.data)
    }
    catch(err){
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchData();
  },[]);
  


  return (
    <div className="min-h-screen flex flex-col bg-bgDark2 pb-5">
      <div>
        {/* Navbar component */}
        <div>
          <Navbar/>
        </div>


        {/* filter & cards components */}
        <div className='bg-bgDark2'> 
          <div>
            <Filter filterData={filterData} category={category} setCategory={setCategory}/>
          </div>

          <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
            {
            loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
            }
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
