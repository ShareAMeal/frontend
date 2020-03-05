import React from 'react';
import { getMyAsso, baseUrl,listEvents } from '../data/restapi';
import EventCreate from './EventCreate.js';
import AutoComponent from '../data/autocomponent';
import EventComponent from '../maraude/EventComponent';

import './MyAsso.css'

class MyAsso extends React.Component
{
    constructor(props)
    {
	super(props);
	this.state={
	    asso: props.asso,
	    assoEvents:[],
	    toEdit:null,
	}
    }

    componentDidMount()
    {
	this.fetchAssoEvents()
    }
    
    fetchAssoEvents()
    {
	listEvents({params:{organizer:this.props.asso.id}})
	    .then( res => {
		this.setState({assoEvents:res.data});
		console.log(res);
	    })
	    .catch( (err) => {
		console.log(err);
	    });
    }

    chooseEdit(assoEvent){
	console.log(assoEvent);	
	setTimeout(()=>{ // on force React à détruire et re-créer le autocomposant
		this.setState({toEdit:null});
	    	setTimeout( ()=>{
			this.setState({toEdit:assoEvent});
		},10);
	},10); /*
	en fait ça a l'air cool mais ça marche pas car React réutilise mon AutoComponent et du coup il change pas ses données
	if(this.state.toEdit !== null)
	{
	    if (this.state.toEdit.id === assoEvent.id){
		this.setState({toEdit:null});
	    } else {
		console.log('chnge');
		this.setState({toEdit:assoEvent});
	    }
	}
	else {
	    this.setState({toEdit:assoEvent});
	}
	    */
    }

    render()
    {
	let eventsR=[];
	this.state.assoEvents.forEach(assoEvent => {
	    eventsR.push(
		<div onClick={ ()=>{this.chooseEdit(assoEvent);} } key={assoEvent.id}>
			<EventComponent  event={assoEvent} />
		</div>
	    );
	});
	let eventToEdit='';
	if(this.state.toEdit !== null)
	{
	    eventToEdit = <div>
		{this.state.toEdit.name}
		<AutoComponent 
		options_url={baseUrl + '/event/' } 
		object_url={baseUrl + '/event/'+this.state.toEdit.id+'/'} 
	    	onSuccess={ ()=>{this.fetchAssoEvents()} }
		data={this.state.toEdit}/>
		</div>
	}
	return (<div id='container'>
	<h2>Édition de l'association {this.state.asso.name}</h2>
	    
<div className='action'>
	<div className='item'>
		<h3>Nouvel évènement</h3>
	       <EventCreate assoID={this.props.asso.id} /> 
	</div>

	    <div className='item'>
		<h3>Modifier mon asso</h3>
	  <AutoComponent 
		options_url={baseUrl + '/asso/' } 
		object_url={baseUrl + '/asso/'+this.props.asso.id+'/'} 
		data={this.state.asso}/>
	    </div>

	    <div className='item'>
	    	{eventToEdit}
	    </div>

	    <div className='item'>
	    {eventsR}	
	    </div>

</div>
	    </div>)
    }
}
export default MyAsso;

