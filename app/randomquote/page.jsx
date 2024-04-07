

"use client";
import React, { useEffect, useState } from 'react'

const RandomQuote = () => {

    const [Quote, setQuote]= useState({quote:"", author:'', loading:false})

    const url="https://api.quotable.io/quotes/random"

    const Fetch=async()=>{
        setQuote(prev => ({
            ...prev,
            loading: true
          }));
         try {
            const response = await fetch(url);
            const data= await response.json()
            console.log(data)
        
            setQuote({
                quote: data[0].content,
                author: data[0].author,
                loading: false
        
            })
         } catch (error) {
            result.innerHTML = `<h3 class="error">failed to fetch</h3>`
         } 
       
    }
    
    

    useEffect(()=>{
        Fetch()
    },[])

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='container w-1/2 mx-auto flex flex-col justify-center items-center bg-gray-400 rounded'>
    {Quote.loading?(<div id='result' className='text-center font-bold mt-2 text-gray-900'>
        Loading......
    </div>): <>
    <p className='text-center my-5 font-satoshi  pt-4 text-gray-900 font-semibold px-4'>"{Quote.quote}"</p>
    <h1 className="text-center font-bold mt-2 text-gray-900">{Quote.author}</h1>
    <div className='text-center'>
        <button type='button' className='rounded-full bg-slate-900 p-3 my-5' style={{ maxWidth: '250px' }} onClick={Fetch}>Next</button>
    </div>
    </>}
</div>

        </div>
    )
}

export default RandomQuote
