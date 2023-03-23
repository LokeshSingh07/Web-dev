import { useState } from "react";

export default function CounterApp(){

    const [count, setCount] = useState(0);

    function increaseHandler(){
        setCount(count+1);
    }
    function decreaseHandler(){
        setCount(count-1);
    }
    function resetHandler(){
        setCount(0);
    }

    return (
        <div className="w-[100vw] h-[100vh] flex flex-col gap-10 justify-center items-center bg-[#344151]">
            <div className="text-[#0398d4] font-medium text-3xl">Increment & Decrement</div>
            <div className="flex items-center py-3 rounded-md gap-12 bg-white text-[25px] text-[#3441515]">
                <button onClick={decreaseHandler} className="border-r-2 text-center w-20 border-[#bfbfbf] text-5xl">-</button>
                <div className="font-bold gap-12 text-4xl">{count}</div>
                <button onClick={increaseHandler} className="border-l-2 text-center w-20 border-[#bfbfbf] text-5xl">+</button>
            </div>
            <button onClick={resetHandler} className="bg-[#0398d4] text-white px-5 py-2 rounded-sm text-lg">Reset</button>
        </div>
    )
}