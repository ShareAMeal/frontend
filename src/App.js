import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './home/Home'
import LoginComponent from './login/Login'
class App extends React.Component {
    constructor(props)
    {
	super(props);
	this.state={}
    }
    onLoginSuccess(auth_token)
    {
	console.log(auth_token);
    }
    render()
    {
  return (
    <div className="App">
      <LoginComponent onLoginSuccess={ (at)=>{this.onLoginSuccess(at);} }/>
      <header className="App-header">
        <p>Share a Meal</p>
          <br/>
          <i className="descendez">V</i>
          <p>Ce site présente les maraudes organisées près de chez vous.</p>
      </header>
      <div id="mainContainer">
      	<Home/>
      </div>
    </div>
  );
    }
}

export default App;
