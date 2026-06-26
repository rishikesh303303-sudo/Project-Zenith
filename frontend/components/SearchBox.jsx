"use client";
import React, { useState } from 'react';
import axios from 'axios';

export default function SearchBox({ setLocation }) {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    try {
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/location/search`, { city });
      
    
      setLocation({ lat: parseFloat(response.data.lat), lng: parseFloat(response.data.lon) });
    } catch (err) {
      alert("City not found, try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city name..." 
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>
          {loading ? 'Searching...' : 'Locate'}
        </button>
      </form>
    </div>
  );
} 