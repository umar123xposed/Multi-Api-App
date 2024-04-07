"use client"
import React, { useState, useEffect } from 'react';

const Currency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('PKR');
  const [amount, setAmount] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    const api = `https://v6.exchangerate-api.com/v6/d68bbc88cbb037de0991cb93/latest/USD`;
    fetch(api)
      .then(resp => resp.json())
      .then(data => {
        const availableCurrencies = Object.keys(data.conversion_rates);
        setCurrencies(availableCurrencies);
      });
  }, []);

  const handleConvertCurrency = () => {
    if (amount !== '') {
      fetch(`https://v6.exchangerate-api.com/v6/d68bbc88cbb037de0991cb93/latest/${fromCurrency}`)
        .then(resp => resp.json())
        .then(data => {
          const fromExchangeRate = data.conversion_rates[fromCurrency];
          const toExchangeRate = data.conversion_rates[toCurrency];
          const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
          setConvertedAmount(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
        });
    } else {
      alert('Please fill in the amount');
    }
  };

  return (
    <div className="wrapper bg-white w-90 max-w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg">
      <div className="app-details">
        <h1 className="app-title text-2xl font-bold uppercase mb-4">Currency Converter</h1>
      </div>
      <label htmlFor="amount" className="block font-semibold">Amount:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full text-gray-900 py-2 px-3 rounded-lg border-b-2 border-purple-900 mb-4"
      />
      <div className="dropdowns flex justify-between items-center gap-3 mb-4">
        <select
          id="from-currency-select"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full py-2 px-3 rounded-lg appearance-none bg-purple-900 text-white"
        >
          {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
        </select>
        <select
          id="to-currency-select"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full py-2 px-3 rounded-lg appearance-none bg-purple-900 text-white"
        >
          {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
        </select>
      </div>
      <button
        id="convert-button"
        onClick={handleConvertCurrency}
        className="w-full py-2 rounded-lg bg-purple-900 text-white font-semibold mb-4"
      >
        Convert
      </button>
      <p id="result" className="text-lg text-gray-700 text-center bg-purple-100 py-3 rounded-lg">{convertedAmount}</p>
    </div>
  );
};

export default Currency;
