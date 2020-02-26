import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './home/Home'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Share a Meal</p>
          <br/>
          <i className="descendez">V</i>
          <p>Ce site présente les maraudes organisées près de chez vous.</p>
      </header>
      <Home/>
    </div>
  );
}

export default App;
