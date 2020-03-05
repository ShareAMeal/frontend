import React from 'react';
import { options, post, put } from './restapi'
function DRFHTMLfieldName(type)
{
    switch(type){
	case 'string':
	    return 'text'
	case 'email':
	    return 'email'
	case 'integer':
	    return 'number'
	case 'boolean':
	    return 'checkbox'
	default:
	    return type
    }
}
class AutoComponent extends React.Component
{
    constructor(props)
    {
	super(props); //props.options_url, props.object_url, props.data, fonction onSuccess(response.data)
	this.state={errors:''}
//	console.log('url options',props.options_url);
    }
    componentDidMount()
    {
//	console.log(this.props);
	options(this.props.options_url)
	.then((res)=>{
//	    console.log(res.data)
	    let newState={ready:true, name:res.data.name, description:res.data.description, fields:[], data:{}}
	    for (let field in res.data.actions.POST) //ici, field est un string
	    {
		if (!res.data.actions.POST[field].read_only)
		{
		    res.data.actions.POST[field].name = field
		    newState.data[field] = ''
		    newState.fields.push(res.data.actions.POST[field]);
		}
		    if(this.props.data)
		    {
			newState.data[field]=this.props.data[field]
		    }
	    }
//	console.log("ns",newState);
	    this.setState(newState);
	});
    }

    submit()
    {
	console.log(this.state.data);
	if(this.props.object_url)
	    this.update()
	else
	    this.create()
    }
    
    update()
    {
	put(this.props.object_url, this.state.data)
	.then( (res) => {
//	    console.log(res);
	    this.setState({data:res.data})
	    if(this.props.onSuccess)
		this.props.onSuccess(res.data);
	})
	.catch( (err) => {
	    console.log(err);
	    this.setState({errors:err.toString()});
	});
    }
    
    create()
    {
	post(this.props.options_url, this.state.data)
	.then( (res) => {
	    console.log(res);
	    if(this.props.onSuccess)
		this.props.onSuccess(res.data);
	})
	.catch( (err) => {
	    console.log(err);
	    this.setState({errors:err.toString()});
	});
    }
    render()
    {
	//console.log(this.state);
	let fields=[];
	if(this.state.fields !== undefined)
	{
	 //   console.log(this.state.fields[0].toString());
	    this.state.fields.forEach( (f) => {
		if (!f.read_only)
		{
		    if(f.type != 'boolean'){
		    fields.push(
			<div>
			    <label htmlFor={f.name}>{f.label}</label> &nbsp;
				<input type={DRFHTMLfieldName(f.type)}
				       name={f.name} id={f.name}
					value={this.state.data[f.name]}
					onChange={ (ev) => {
					    this.state.data[f.name]=ev.target.value;
					    this.setState(this.state);
					} } />
			</div>
		    )}
		    else {
			fields.push(<div>   <label htmlFor={f.name}>{f.label}</label> &nbsp;
				<input type={DRFHTMLfieldName(f.type)}
				       name={f.name} id={f.name}
					onChange={ (ev) => {
					    this.state.data[f.name]=ev.target.checked; //yes vraiment trop content les cas spéciaux
					    this.setState(this.state);
					} } 
			    		checked={this.state.data[f.name]}/>

			    </div>);
		    }
		}
	    });
	}
	return (<div hidden={!this.state.ready}>
	{this.state.errors} <br/>
	    {this.state.name} <p>{this.state.description}</p>
	    {fields}
	    <br/>
	    <button onClick={ ()=>this.submit() }>Valider</button>
	    </div>)
    }
}

export default AutoComponent
