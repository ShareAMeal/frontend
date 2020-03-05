import React from 'react';
import './Login.css';
//import MyAsso from '../asso/MyAsso';
import { getMyAsso } from '../data/restapi';
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
	    visible: false
	} // formShown ou loginSuccess
	this.showForm = this.showForm.bind(this); // yess trop pratique
	this.doLogin = this.doLogin.bind(this);
    }
    componentDidMount()
    {
	if(localStorage.getItem('auth_token') != null)
	{
	    this.validateLogin();
	}
	else
	{
	    this.setState({visible: true});
	}
	console.log(this.state.connState);
    }

    showForm(){
//	console.log("showForm");
	this.setState({connState: 'formShown'});
    }

    validateLogin()
    {
	if(localStorage.getItem('auth_token') === null){
	    let auth_token =  window.btoa(this.state.username +':' + this.state.password); // norme HTTP Basic Auth
	    localStorage.setItem('auth_token', auth_token); //pour qu'il soit dispo dans toute la fenetre du navigateur
	}
	    getMyAsso()
	    .then((x)=>{
		this.setState({visible:true});
		console.log('response',x);
		if (x.data.id !== null)
		{
		    this.setState({my_asso:x.data});
		    console.log('Connexion réussie');
		    this.props.onLoginSuccess(x.data);
		    this.setState({connState: 'loginSuccess'});
		} else  { 
		    console.log('bizarre');
		    this.logOut();
		}
	    })
	    .catch((err) => {
		this.setState({visible:true});
		this.setState({errors: 'Identifiants invalides'});
		console.log('Précédentes informations de connexion obsolètes',err);
	    	this.logOut();
	    },(err2)=>{
		console.log(err2)
	    });
    }
    doLogin(e)
    {
	if (e.key === 'Enter' ||  e=== null){
	    this.validateLogin();
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
		<p>
			Connecté pour l'association {this.state.my_asso.name}&nbsp;&nbsp;&nbsp; 
			<button onClick={ ()=>{this.logOut()}}>Se déconnecter</button>
	    <button onClick={ ()=>{this.setState({visible:false});} }> Fermer </button>
		</p>
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
			<button onClick={()=>{this.validateLogin()}}>Se connecter</button>
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
	return (<div className='logincomponent' hidden={!this.state.visible}>
	    {inside}
	</div>)
    }
}
export default LoginComponent
