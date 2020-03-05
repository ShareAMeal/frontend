import React from 'react';
import { getMyAsso, baseUrl } from '../data/restapi';
import EventCreate from './EventCreate.js';
import AutoComponent from '../data/autocomponent';

import './MyAsso.css'

class MyAsso extends React.Component
{
    constructor(props)
    {
	super(props);
	this.state={asso: props.asso}
    }
    
    render()
    {
	return (<div id='container'>
	<h2>Édition de l'association {this.state.asso.name}</h2>
	    
<div className='action'>
	    	
	<div className='item'>
		<h3>Nouvel évènement</h3>
	       <EventCreate assoID={this.state.asso.id} /> 
	</div>

	    <div className='item'>
		<h3>Modifier mon asso</h3>
	  <AutoComponent 
		options_url={baseUrl + '/asso/' } 
		object_url={baseUrl + '/asso/'+this.state.asso.id+'/'} 
		data={this.props.asso}/>
	    </div>

</div>
	    </div>)
    }
}
export default MyAsso;

