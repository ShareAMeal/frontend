import React from "react";

class EventComponent extends React.Component {
    render() {
        return (<div className="rowitem">
            <p>{this.props.event.name}</p>
            <p>{this.props.event.description}</p>
            <p>{this.props.event.start_datetime}</p>
        </div>)
    }
}

export default EventComponent
