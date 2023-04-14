import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import useGif from "../hooks/useGif";


export default function Random() {
  
  // const [gif, setGif] = useState("");
  // const [loading , setLoading] = useState(false);

  // async function fetchData(){
  //   setLoading(true);
  //   const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
  //   const {data} = await axios.get(url);
  //   // console.log(data);
  //   const imageSource = data.data.images.downsized.url;
  //   // console.log(imageSource);
  //   setGif(imageSource);
  //   setLoading(false);
  // }
  
  // useEffect(()=>{
  //   fetchData();
  // }, []);


  const {gif, loading, fetchData} = useGif(); 

  function clickHandler(){
    fetchData();
  }


  
  return (
    <div className="w-1/2 flex flex-col items-center bg-green-500 rounded-md mt-10">
      <h1 className="text-2xl underline uppercase my-5">Random GIF</h1>

      {
        loading ? (<Spinner/>) : (<img src= {gif} width="450" />)
      }

      <button onClick={clickHandler}
      className="w-[50%] text-[20px] bg-yellow-300 opacity-80 rounded-lg py-2 my-5">
        Generate
      </button>

    </div>
  );
}
