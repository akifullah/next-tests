"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, selectCounter } from '../../store/slices/counterSlice'
import CounterSSR from "./CounterSSR";
const Counters = () => {
    const count = useSelector(selectCounter);
    const dispatch = useDispatch();
    return (
        <>
            <CounterSSR count={count} />
            <button onClick={()=>dispatch(increment())}>Increment</button>
            <button onClick={()=>dispatch(decrement())}>Decrement</button>
        </>

    )
}

export default Counters