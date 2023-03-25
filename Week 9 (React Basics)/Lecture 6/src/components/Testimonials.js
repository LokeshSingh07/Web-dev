import Card from "./Card";
import {FaQuoteLeft, FaQuoteRight} from 'react-icons/fa';
import {FiChevronLeft ,FiChevronRight } from "react-icons/fi";
import { useState } from "react";



function Testimonial(props){

    let reviews = props.reviews;
    let [index, setIndex] = useState(0);

    function leftShiftHandler(){
        if(index-1 < 0){
            setIndex(reviews.length-1);
        }
        else{
            setIndex(index-1);
        }
    }
    function rightShiftHandler(){
        if(index+1 >= reviews.length){
            setIndex(0);
        }
        else{
            setIndex(index+1);
        }

    }
    function SurpriseHandler(){
        let random = Math.floor(Math.random()*reviews.length)
        setIndex(random);
    }

    
    return (
        <div className="w-[85vw] md:w-[700px] bg-white flex flex-col justify-center items-center mt-10 p-10 transition-all duration-700 hover:shadow-2xl rounded-md">
            <Card review={reviews[index]}></Card>

            <div className="w-[100px] flex justify-center text-3xl gap-3 mt-5 text-violet-400 font-bold mx-auto">
                <button className="cursor-pointer hover:text-violet-500" onClick={leftShiftHandler}>
                    <FiChevronLeft/>
                </button>
                <button className="cursor-pointer hover:text-violet-500"  onClick={rightShiftHandler}>
                    <FiChevronRight/>
                </button>
            </div>

            <div className="mt-5">
                <button className="w-[200px] bg-violet-500 text-white hover:bg-violet-600 translate-all duration-200 cursor-pointer px-10 py-2 rounded-md font-bold text-lg mx-auto " onClick={SurpriseHandler}>Surprise me</button>
            </div>
        </div>

    )
}
export default Testimonial;