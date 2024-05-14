// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome Chat360</h1>
      <h2>Made by Kausstubh Jaiswal</h2>
      <div>
        <Link to="/Search">
          <button style={buttonStyle}>Perform Query</button>
        </Link>
        <Link to="/Form">
          <button style={buttonStyle}>Add Log</button>
        </Link>
        <hr></hr>
        <a href="https://drive.google.com/file/d/1aQwPGrYqD0Ju7ylWF-jisRL0mOYSZG0D/view?usp=sharing" target="_blank" rel="noopener noreferrer">
          <button style={buttonStyle}>Resume</button>
        </a>
      </div>

    </div>
  );
};

const buttonStyle = {
  padding: '10px',
  fontSize: '18px',
  margin: '10px',
};

export default Home;