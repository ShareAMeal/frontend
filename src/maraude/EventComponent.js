import React from "react";

class EventComponent extends React.Component {
  render() {
    return (
      <div className="rowitem" >
        <p class ="Nom">
            {this.props.event.name} :
        </p>
        <p class = "Desc">
            {this.props.event.description}
        </p>
        <p class ="Date">
            le {new Date(this.props.event.start_datetime).toLocaleString()}
        </p>
      </div>
    );
  }
}

export default EventComponent;
