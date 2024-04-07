"use client"
import { useState } from 'react'
import Image from 'next/image'
import './../../styles/style.css'

const Country = () => {
  const [countryName, setcountryName] = useState('')

  const [result, setresult] = useState({flag:'', name:'', capital:'', continent: '', population:'', language:''})
  const [load, setload] = useState(false)

  const Fetch = async () => {
    setload(true)
    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    
    
    try{
      const response = await fetch(url);
      const data = await response.json()
      setresult({
        flag:data[0].flags.svg, 
        name: data[0].name.common, 
        capital:data[0].capital[0], 
        continent: data[0].continents[0], 
        population:data[0].population, 
        language:Object.values(data[0].languages)
        .toString()
        .split(",")
        .join(", ")
      })
    }
    
    catch(e){
      result.innerHTML = `<h3 class="error">Couldn't find The country, Are you sure its a country?</h3>`
    }
    
  }

  function handlechange(e) {
    setcountryName(e.target.value)
  }

  return (
    <div className="container bg-neutral-200">
    <div className="search-box">
        <input
            type="text"
            placeholder="Type a country.."
            id="inp-word"
            className='text-gray-900 bg-transparent'
            value={countryName}
            onChange={handlechange}
        />
        <button id="search-btn" onClick={Fetch} >Search</button>
    </div>
    <div className="result my-5" id="result">


        {load && (<div>
          
          <div className='flex flex-col justify-center items-center'>

          <Image src={result.flag} Alt="Flag image" width={100} height={100}/>

          <h1 className='text-gray-900 font-bold font-satoshi mt-4 text-center'>
            {result.name}
            </h1>
            </div>

            <div className='mt-2'>
              <h4 className='text-gray-900 font-bold font-satoshi pb-2'>
                Capital city:
                <span className='text-gray-500 font-semibold'> {result.capital}</span>
              </h4>
              <h4 className='text-gray-900 font-bold font-satoshi pb-2'>
                Population:
                <span className='text-gray-500 font-semibold'> {result.population}</span>
              </h4>
              <h4 className='text-gray-900 font-bold font-satoshi pb-2'>
                Languages:
                <span className='text-gray-500 font-semibold'> {result.language}</span>
              </h4>
              <h4 className='text-gray-900 font-bold font-satoshi pb-2'>
                Continent:
                <span className='text-gray-500 font-semibold'> {result.continent}</span>
              </h4>
            </div>

          

        </div>)}
      </div>
      </div>

    
  )
}

export default Country
