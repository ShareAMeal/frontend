import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './home/Home'
import MyAsso from './asso/MyAsso';
import LoginComponent from './login/Login'
import DateTimeComponent from './utils/DateTime.js'

class App extends React.Component {
    constructor(props)
    {
	super(props);
	this.state={}
    }
    onLoginSuccess(my_asso)
    {
	this.setState({my_asso: my_asso});
	console.log(this.state['my_asso']);
    }
    render()
    {
	let ifAssoManager='';
	if (this.state.my_asso)
	{
	    ifAssoManager=(<div>
		<MyAsso asso={this.state.my_asso}/>
		</div>)
	}
  return (
    <div className="App">
      <LoginComponent onLoginSuccess={ (x)=>{this.onLoginSuccess(x);} }/>
      <DateTimeComponent onChange={ (datetime)=>{console.log(datetime.toISOString())} }/>
      <header className="App-header">
        <p>Share a Meal</p>
          <br/>
          <i className="descendez">V</i>
          <p>Ce site présente les maraudes organisées près de chez vous.</p>
      </header>
      <div id="mainContainer">
      {ifAssoManager}
      	<Home/>
      </div>
    </div>
  );
    }
}

export default App;
