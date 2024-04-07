"use client"
import { useState, useEffect } from 'react'
import './../../styles/style.css'

const Dictionary = () => {
  const [Word, setWord] = useState('')

  const [dict, setDict] = useState({meanings:'', partOfSpeech:'', phonetic:''})
  const [load, setload] = useState(false)

  const Fetch = async () => {
    setload(true)
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${Word}`
    const response = await fetch(url);
    
    try{
      const data = await response.json()
      setDict({
        meanings: data[0].meanings[0].definitions[0].definition,
        partOfSpeech: data[0].meanings[0].partOfSpeech,
        phonetic: data[0].phonetic
      })
    }
    
    catch(e){
      result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`

    }
    

    
  }



  function handlechange(e) {
    setWord(e.target.value)
  }

  return (
    <div className="container">
    <div className="search-box">
        <input
            type="text"
            placeholder="Type the word here.."
            id="inp-word"
            className='text-gray-900'
            value={Word}
            onChange={handlechange}
        />
        <button id="search-btn" onClick={Fetch} >Search</button>
    </div>
    <div className="result my-5" id="result">


        {load && (<div>
          <h1 className='text-gray-900 font-bold font-satoshi'>
            {Word}
            </h1>
            <div class="details">
                    <p>{dict.partOfSpeech}</p>
                    <p>{dict.phonetic}</p>
                </div>

          <p className='text-gray-600'>
            {dict.meanings}
          </p>

        </div>)}
      </div>
      </div>

    
  )
}

export default Dictionary
