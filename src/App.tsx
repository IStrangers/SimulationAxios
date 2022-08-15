import React from 'react';
import logo from './logo.svg';
import './App.css';
import { axios } from './axios';

function App() {

  const testAxios = () => {

  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={testAxios}
        >
          Test Axios
        </button>
      </header>
    </div>
  );
}

export default App;
