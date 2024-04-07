"use client"
import React, { useState, useEffect } from 'react';
import md5 from 'crypto-js/md5';




const Marvel = () => {
    const [inputValue, setInputValue] = useState('iron man');
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showList, setShowList] = useState(false);
  
    const timestamp = new Date().getTime();
    const publicKey = '7cf9c344da5aa9e26617766119ea15df'; 
    const privateKey = '1179ee5a97935debbc78a6156a374caa09652f40'; 
    const hashValue = md5(timestamp + privateKey + publicKey).toString(); 
  
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashValue}&nameStartsWith=${inputValue}`;
  
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const jsonData = await response.json();
  
        if (!jsonData.data || !jsonData.data.results) {
          throw new Error('Unexpected response data format!');
        }
  
        setCharacters(jsonData.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCharacters();
    }, []);
  
    const handleInputChange = async (e) => {
      setInputValue(e.target.value);
      setShowList(e.target.value.length >= 4);
      if (e.target.value.length < 4) {
        setCharacters([]);
        setShowList(false);
        return;
      }
  
      fetchCharacters();
    };
  
    const displayCharacter = (name) => {
      setInputValue(name);
      setCharacters([]);
      setShowList(false);
    };
  
    const handleSubmit = async () => {
      if (inputValue.trim().length < 1) {
        alert('Input cannot be blank');
        return;
      }
  
      fetchCharacters();
      setShowList(false);
    };
  
    return (
        <div className="container bg-gray-900 w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto py-6 px-4 rounded-lg">
        <div className="grid grid-cols-10 gap-4">
          <input
            type="text"
            className="col-span-8 bg-gray-800 text-white py-2 px-4 rounded-lg outline-none"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="col-span-2 bg-red-600 text-white py-2 px-4 rounded-lg text-sm md:text-base"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {showList && ( // only render the list if showList is true
          <div className="absolute w-64 bg-gray-700 text-white z-10">
            {characters.map((character) => (
              <div
                key={character.id}
                className="p-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => displayCharacter(character.name)}
              >
                <p>
                  <b>{character.name.substr(0, inputValue.length)}</b>
                  {character.name.substr(inputValue.length)}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            characters.map((character) => (
              <div key={character.id} className="flex flex-col items-center mb-4">
                <div className="bg-white p-2 rounded-full">
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    className="h-24 w-24 rounded-full"
                  />
                </div>
                <div className="text-white text-xl font-semibold mt-2">
                  {character.name}
                </div>
                <div className="text-gray-400 text-center mt-1">
                  {character.description}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };
  
  export default Marvel;