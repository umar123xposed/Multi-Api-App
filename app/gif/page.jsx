"use client"
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [gifs, setGifs] = useState([]);
  const [searchValue, setSearchValue] = useState('laugh');
  const [loading, setLoading] = useState(false);

  const apiKey = "jQvszVpt9aODUNE9yBTyxWLsIL76psOg";

  const generateGif = () => {
    setLoading(true);
    const gifCount = 10;
    const finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchValue}&limit=${gifCount}&offset=0&rating=g&lang=en`;

    fetch(finalURL)
      .then(resp => resp.json())
      .then(info => {
        setGifs(info.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching GIFs:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    generateGif();
  }, []);

  const copyGifLink = gifId => {
    const copyLink = `https://media4.giphy.com/media/${gifId}/giphy.mp4`;
    navigator.clipboard.writeText(copyLink)
      .then(() => alert('GIF copied to clipboard'))
      .catch(() => {
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = copyLink;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('GIF copied to clipboard');
      });
  };

  return (
    <div className="box">
      <div className="search-container flex justify-center my-4 gap-4">
        <input
          className="bg-gray-900 text-white-900 px-4 py-2 rounded-lg"
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <button
          className="bg-green-500 text-gray-900 px-4 py-2 rounded-lg font-semibold"
          onClick={generateGif}
        >
          Submit
        </button>
      </div>
      {loading && <div className="loader"></div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gifs.map(gif => (
          <div key={gif.id} className="container bg-blue-900 p-4 rounded-lg">
            <img src={gif.images.downsized_medium.url} alt="gif" className="w-full" />
            <button
              className="bg-green-500 text-gray-900 px-4 py-2 rounded-lg mt-4 font-semibold"
              onClick={() => copyGifLink(gif.id)}
            >
              Copy Link
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
