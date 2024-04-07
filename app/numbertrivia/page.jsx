"use client"
import { useState } from 'react';
import './../../styles/style.css';

const Number = () => {
  const [Num, setNum] = useState('');
  const [result, setResult] = useState('');
  const [load, setLoad] = useState(false);

  const Fetch = async () => {
    if (Num < 301) {
      setLoad(true);
      const url = `http://numbersapi.com/${Num}`;

      try {
        const response = await fetch(url);
        const data = await response.text();
        setResult(data);
      } catch (error) {
        console.error('Error fetching number fact:', error);
        setResult('Please enter numbers ranging from 0 to 300');
      }
    } else {
      setResult('Please enter numbers ranging from 0 to 300');
    }
  };

  function handlechange(e) {
    setNum(e.target.value);
  }

  return (
    <div className="container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Type the number here.."
          id="inp-word"
          className="text-gray-900"
          value={Num}
          onChange={handlechange}
        />
        <button id="search-btn" onClick={Fetch}>
          Search
        </button>
      </div>
      <div className="result my-5" id="result">
        {load && (
          <div>
            <h1 className="text-gray-900 font-bold font-satoshi">{Num}</h1>
            <div className="details">
              <h2 className='text-gray-700'>{result}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Number;
