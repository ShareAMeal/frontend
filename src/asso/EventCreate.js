import React from "react";
import { createEvent } from "../data/restapi";
import DateTimeComponent from "../utils/DateTime.js";

class EventCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assoID: props.assoID,
      name: "",
      start_datetime: "",
      active: 1,
      description: "yo c cool",
      errors: ""
    };
  }
  stateToData() {
    return {
      name: this.state.name,
      start_datetime: this.state.datetime,
      active: this.state.active,
      description: this.state.description
    };
  }

  doCreate() {
    createEvent(this.stateToData())
      .then(r => {
        console.log(r);
        if (r.status === 201) {
          alert("ok");
        } else {
          this.setState({ errors: this.state.errors + "; " + r.data });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ errors: this.state.errors + "; " + err });
      });
  }
  render() {
    return (
      <div>
        {this.state.errors}
        <div>
          <label htmlFor="name">Nom: <br/></label>
          <input
            id="name"
            value={this.state.name}
            onChange={ev => {
              this.setState({ name: ev.target.value });
            }}
          />
          <br />
          <label htmlFor="active">Encore ouvert ?</label>
          <input
            value={this.state.active}
            onChange={ev => {
              this.setState({ active: ev.target.value });
              //		console.log(ev);
            }}
            type="checkbox"
            id="active"
            checked="checked"
          />
          <br />
          <br />
          <label htmlFor="startdate"></label>
          <DateTimeComponent
            onChange={dt => {
              this.setState({ start_datetime: dt.toISOString() });
            }}
            id="startdate"
          />
          <br />
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            value={this.description}
            onChange={ev => this.setState({ description: ev.target.value })}
            type="text"
            id="description"
          />
          <br />
          <input type="submit" value="Créer" onClick={() => this.doCreate()} />
        </div>
      </div>
    );
  }
}
export default EventCreate;
