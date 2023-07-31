import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const fetchData = () => {
    onSearch(input);
    console.log('Fetching data for:', input); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3 mx-auto mt-2" style={{ maxWidth: '400px' }}>
        <input
          type="text"
          className="form-control bg-dark text-light"
          aria-label="Search"
          aria-describedby="search-button"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="submit" id="search-button" onClick={fetchData}>
          <i className="fas fa-search"></i>
          <span className="ms-2">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
