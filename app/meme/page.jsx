"use client"
import { useState, useEffect } from "react"

const Meme = () => {

    const [meme, setmeme]= useState({title:"",url:"",loading:false})

    const url="https://meme-api.com/gimme"
    

    const Fetch=async()=>{
        setmeme(prev => ({
            ...prev,
            loading: true
          }));
          
        const response = await fetch(url);
        const data= await response.json()
        console.log(data)

        setmeme({
            title: data.title,
            url: data.url
            
        })
    }

    useEffect(()=>{
        Fetch()
    },[])
  return (
    <div className='flex justify-center items-center h-screen'>
            <div className='container w-auto mx-auto flex flex-col justify-center items-center bg-gray-400 rounded'>
            {meme.loading?(<div className='text-center font-bold mt-2 text-gray-900'>
        Loading......
    </div>):<>
    <h1 className="text-center font-semibold text-gray-900 my-2">{meme.title}</h1>
    <img src={`${meme.url}`} alt="meme" width={350} height={350} />
    <div>
        <button type='button' className='rounded-full bg-slate-900 p-3 my-5' style={{ maxWidth: '250px' }} onClick={Fetch}>Next</button>
    </div>
    </>
}
</div>

        </div>

  )
}

export default Meme
