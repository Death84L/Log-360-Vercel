import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Search.css';
require('dotenv').config();

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    level: '',
    log_string: '',
    startTimestamp: null,
    endTimestamp: null,
    source: '',
    api_request: ''
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleStartDateChange = (date) => {
    setSearchParams({ ...searchParams, startTimestamp: date });
  };

  const handleEndDateChange = (date) => {
    setSearchParams({ ...searchParams, endTimestamp: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchUrl = 'https://log-360-3.onrender.com/query/search';
      const response = await axios.get(searchUrl, { params: searchParams });
      setSearchResults(response.data.logs);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <h2>Search Logs</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="level"
          placeholder="Level"
          value={searchParams.level}
          onChange={handleChange}
        />
        <input
          type="text"
          name="log_string"
          placeholder="Log String"
          value={searchParams.log_string}
          onChange={handleChange}
        />
        <div>
          <label>Start Timestamp:</label>
          <DatePicker
            selected={searchParams.startTimestamp}
            onChange={handleStartDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
          />
        </div>
        <div>
          <label>End Timestamp:</label>
          <DatePicker
            selected={searchParams.endTimestamp}
            onChange={handleEndDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
          />
        </div>
        <input
          type="text"
          name="source"
          placeholder="Source"
          value={searchParams.source}
          onChange={handleChange}
        />
        <input
          type="text"
          name="api_request"
          placeholder="API Request"
          value={searchParams.api_request}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.map((log, index) => (
          <div key={index} className="card">
            <h3>Log {index + 1}</h3>
            <p>Level: {log.body.level}</p>
            <p>Log String: {log.body.log_string}</p>
            <p>Timestamp: {log.body.timestamp}</p>
            <p>Source: {log.body.metadata && log.body.metadata.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
