import React from 'react';
import './Maraude.css'
import listEvents from "../data/restapi";
import EventComponent from "./EventComponent";

class MaraudeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {events: []};
    }

    componentDidMount() {
        listEvents.then((x) => {
            console.log(x);
            this.setState({events: x.data});
        });
    }

    render() {
        let eventsList = [];
        let eventComponents = [];
        this.state.events.forEach((ev)=>{
            eventsList.push(<li>{ev.name}</li>)
            eventComponents.push(<EventComponent event={ev}/>)

        });
        return (<div id="maraude">
            <h3>
                <p>Liste des maraudes</p>
            </h3>
            <div className="mainrow">
                {eventComponents}
            </div>
            <div className="mainrow">
                <div className="rowitem">
                    <p>Nom association</p>
                </div>
                <div className="rowitem">
                    <p>Lieu</p>
                </div>
                <div className="rowitem">
                    <p>Heure</p>
                </div>
            </div>
            <ul>
                {eventsList}
            </ul>
        </div>)
    }
}

export default MaraudeComponent
