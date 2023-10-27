import React, { useState } from 'react';
import axios from 'axios';

function Country() {
  const [country, setCountry] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    axios
      .get(`http://localhost:5000/country/${country}`)
      .then((response) => {
        setCountryInfo(response.data);
        setError(null);
        setCountry('')
      })
      .catch((err) => {
        setCountryInfo(null);
        setError('Country not found or an error occurred.');
        setCountry('')
        console.error(err);
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Country Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="flex-1 py-2 px-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Get Info
          </button>
        </div>
      </form>

      {countryInfo && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-blue-700">Relevant Information about {countryInfo.name.common}</h2>
          <p className="text-gray-700">Common Name: {countryInfo.name.common}</p>
          <p className="text-gray-700">Official Name: {countryInfo.name.official}</p>
          <p className="text-gray-700">Capital: {countryInfo.capital}</p>
          <p className="text-gray-700">Region: {countryInfo.region}</p>
          <p className="text-gray-700">Population: {countryInfo.population} habitants </p>
          <p className="text-gray-700">Time Zone: {countryInfo.timezones}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-600">{error}</div>
      )}

      {!countryInfo && !error && (
        <div className='mt-5'>
            Remember to press the Button
        </div>
      )}
    </div>
  );
}

export default Country;