import logo from './logo.svg';
import './App.css';
import Header from "./components/Header"
import Tours from './components/Tours'
import data from './components/data';
import {useState} from 'react'


function App() {

  const [tours , setTour] = useState(data);

  function removeTourHandler(id){
    const newTours = tours.filter(tour => tour.id !== id);
    setTour(newTours)
  }
  function refreshHandler(){
    setTour(data);
  }

  if(tours.length===0){
    return (
      <div className='w-full h-[100vh] flex flex-col items-center justify-center space-y-5'>
        <h1 className='text-xl font-bold'>No Tour left</h1>
        <button className='w-[170px] bg-red-500 hover:bg-red-400 text-white rounded-lg py-1 px-4  ' onClick={refreshHandler}>Refresh</button>
      </div>
    )
  }


  return (
    <div className="App"> 
      <Header/>
      <Tours tours={tours} removeTour={removeTourHandler}/>
    </div>
  );
}

export default App;
