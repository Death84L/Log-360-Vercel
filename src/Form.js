import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
require('dotenv').config();

function Form() {
  const [logData, setLogData] = useState({
    level: '',
    log_string: '',
    timestamp: '',
    metadata: {
      source: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setLogData(prevState => ({
      ...prevState,
      timestamp: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(logData)
        const apiUrl = 'https://log-360-3.onrender.com/ingestor/log';
        await axios.post(apiUrl, logData);
      // Reset form after successful submission
      setLogData({
        level: '',
        log_string: '',
        timestamp: '',
        metadata: {
          source: ''
        }
      });
      alert('Log ingested successfully');
    } catch (error) {
      console.log(error);
      alert('Error ingesting log. Please try again.');
    }
  };

  return (
    <div>
      <h2>Log Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Log Level(info,error,success) only these values:
          <input
            type="text"
            name="level"
            value={logData.level}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Log Message:
          <input
            type="text"
            name="log_string"
            value={logData.log_string}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Timestamp:
          <DatePicker
            selected={logData.timestamp}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
          />
        </label>
        <br />
        <label>
          Source:
          <input
            type="text"
            name="source"
            value={logData.metadata.source}
            onChange={(e) => {
              setLogData(prevState => ({
                ...prevState,
                metadata: {
                  source: e.target.value
                }
              }));
            }}
          />
        </label>
        <br />
        <button type="submit">Submit Log</button>
      </form>
    </div>
  );
}

export default Form;
