import React from "react";
import reviews from "./data";
import Testimonial from "./components/Testimonials";

const App = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-gray-200 ">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Our Testimonial</h1>
        <div className="bg-violet-400 h-[4px] mt-1 w-[110px] mx-auto mt-2"></div>

        <Testimonial reviews={reviews}/>
      </div>
    </div>
  );
};

export default App;
