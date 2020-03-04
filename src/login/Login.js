import React from 'react';
import './Login.css';
class LoginComponent extends React.Component
{
    constructor(props)
    {
	super(props)
	this.state = {
	    connState:'formHidden',
	    errors:'',
	    username:'',
	    password:'',
	} // formShown ou loginSuccess
	this.showForm = this.showForm.bind(this); // yess trop pratique
	this.doLogin = this.doLogin.bind(this);
    }
    componentDidMount()
    {
	if(localStorage.getItem('auth_token') != null)
	{
	    this.setState({connState:'loginSuccess'});
	}
    }

    showForm(){
	console.log("showForm");
	this.setState({connState: 'formShown'});
    }

    doLogin(e)
    {
	if (e.key=='Enter' || e===null){
	    let auth_token =  window.btoa(this.state.username +':' + this.state.password);
	    console.log(auth_token);
	    localStorage.setItem('auth_token', auth_token);
	    this.props.onLoginSuccess(auth_token);
	    this.setState({connState: 'loginSuccess'});
	}
    }
    logOut()
    {
	localStorage.removeItem('auth_token');
	this.setState({connState:'formShown'});
    }

    onUsernameChange(ev)
    {
	this.setState({username: ev.target.value});
    }

    onPasswordChange(ev)
    {
	this.setState({password: ev.target.value});
    }

    render()
    {
	let inside="";
	if (this.state.connState === 'loginSuccess')
	{
	    inside = <div>
			<p>Connecté !</p> 
			<button onClick={ ()=>{this.logOut()}}>Se déconnecter</button>
		</div>
	}
	if(this.state.connState === 'formShown')
	{
	    inside = <div>
		{this.state.errors}
		    <label htmlFor='loginI'>Nom d'utilisateur</label>
		        <input type='login' name='username' id='loginI' value={this.state.username}
	    onChange={ (e)=>{this.onUsernameChange(e);} } />
		<label htmlFor='passI'>Mot de passe</label>
			<input type='password' name='password' id='passI'
	    			value={this.state.password}
	    			onChange={ (e)=>{this.onPasswordChange(e);} }
				onKeyPress={this.doLogin} />
			<button onClick={this.doLogin}>Se connecter</button>
		    </div>
	}
	if(this.state.connState === 'formHidden')
	{
	    inside = <div>
		<button onClick={this.showForm}>
			Connexion
		</button>
		</div>
	}
	if(this.state.connState === '')
	{}
	return (<div className='logincomponent'>
	    {inside}
	</div>)
    }
}
export default LoginComponent
