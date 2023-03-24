import Cards from './components/Cards';
import Filter from './components/Filter';
import Navbar from './components/Navbar';
import logo from './logo.svg';
import {filterData , apiUrl} from './data';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';




function App() {

  const [courses, setCourses] = useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await fetch(apiUrl);
        const output = await res.json();

        // save data
        setCourses(output.data);
        console.log(output.data)
      }
      catch(err){
        toast.error("Something went wrong");
      }
    }
    fetchData();
  },[]);
  


  return (
    <div className="App">
      <div>
        <Navbar/>

        <Filter filterData={filterData}/>

        <Cards courses={courses}/>

      </div>
    </div>
  );
}

export default App;
