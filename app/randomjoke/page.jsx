"use client";
import React, { useEffect, useState } from 'react'

const RandomJoke = () => {

    const [joke, setjoke]= useState({joke:"", loading:false})

    const url="https://v2.jokeapi.dev/joke/Any?type=single"

    const Fetch=async()=>{
        setjoke(prev => ({
            ...prev,
            loading: true
          }));
        const response = await fetch(url);
        const data= await response.json()
        console.log(data)

        setjoke({
            joke: data.joke,
            loading: false
        })
    }

    useEffect(()=>{
        Fetch()
    },[])

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='container w-1/2 mx-auto flex flex-col justify-center items-center bg-gray-400 rounded'>
            {joke.loading?(<div className='text-center font-bold mt-2 text-gray-900'>
        Loading......
    </div>):<>
    <p className='text-center my-5 font-satoshi text-gray-900 font-semibold px-4'>{joke.joke}</p>
    <div className='text-center'>
        <button type='button' className='rounded-full bg-slate-900 p-3 my-5' style={{ maxWidth: '250px' }} onClick={Fetch}>Next</button>
    </div>
    </>
}
</div>

        </div>
    )
}

export default RandomJoke
