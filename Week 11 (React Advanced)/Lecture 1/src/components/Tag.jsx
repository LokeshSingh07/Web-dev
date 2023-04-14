import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import useGif from "../hooks/useGif";


export default function Tag() {
  
  // const [gif, setGif] = useState("car");
  // const [loading , setLoading] = useState(false);
  const [tag, setTag] = useState("car");
  
  
  // async function fetchData(){
  //   setLoading(true)
  //   const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
  //   const {data} = await axios.get(url);
  //   // console.log(data);
  //   const imageSource = data.data.images.downsized_large.url;
  //   // console.log(imageSource);
  //   setGif(imageSource);
  //   setLoading(false);
  // }

  // useEffect(()=>{
  //   fetchData();
  // }, []);

  const {gif, loading, fetchData} = useGif(tag);



  function clickHandler(){
    fetchData(tag);
  }


  
  return (
    <div className="w-1/2 flex flex-col items-center bg-blue-500 rounded-md mt-10">
      <h1 className="text-2xl underline uppercase my-5">A Random {tag} GIF</h1>

      
      {
        loading ? (<Spinner/>) : (<img src= {gif} width="450" />)
      }

      <input  className="w-10/12 text-lg py-2 rounded-lg my-[20px] text-center"
        type="text"
        onChange={(event)=> setTag(event.target.value)}
        value={tag}
      />


      <button onClick={clickHandler}
      className="w-[50%] text-[20px] bg-yellow-300 opacity-80 rounded-lg py-2 my-5">
        Generate
      </button>

    </div>
  );
}
