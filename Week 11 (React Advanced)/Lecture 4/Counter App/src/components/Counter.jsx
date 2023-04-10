import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../redux/slices/CounterSlice';

export default function Counter() {

    const count = useSelector((state)=> (state.counter.value));
    const dispatch = useDispatch();



  return (
    <div className='w-full h-screen flex justify-center items-center gap-x-5'>
        
        <button
        onClick={()=> dispatch(increment())}
        >
            Increment
        </button>

        <div className='font-semibold'>{count}</div>

        <button
        onClick={()=> dispatch(decrement())}
        >
            Decrement
        </button>

    </div>
  )
}
