import React from "react";
import "./Maraude.css";
import { listOpenEvents } from "../data/restapi";
import EventComponent from "./EventComponent";

class MaraudeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  componentDidMount() {
    listOpenEvents().then(x => {
      //console.log("list events",x);
      this.setState({ events: x.data });
    });
  }

  render() {
    let eventComponents = [];
    this.state.events.forEach(ev => {
      eventComponents.push(<EventComponent event={ev} key={Math.random()} />);
    });
    return (
      <div id="maraude">

          <p class = "Liste">
            Liste des maraudes :
          </p>
        <div className="mainrow">{eventComponents}</div>
      </div>
    );
  }
}

export default MaraudeComponent;
