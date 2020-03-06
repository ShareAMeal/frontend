import React from "react";

class DateTimeComponent extends React.Component {
  constructor(props) {
    super(props); //fonction props.onChange(datetime)
    this.state = {
      date: "",
      time: "",
      datetime: ""
    };
  }
  processChange() {
    // La date + heure n'a pas le bon format. Utilisez un des formats suivants : YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z].
    let datetime = new Date();
    let da = this.state.date.split("-");
    datetime.setFullYear(da[0]);
    datetime.setMonth(da[1]);
    datetime.setDate(da[2]);
    let ti = this.state.time.split(":");
    datetime.setHours(ti[0]);
    datetime.setMinutes(ti[1]);
    try {
      datetime.toISOString();
      this.setState({ datetime: datetime.toLocaleString() });
      this.props.onChange(datetime); //remonte l'état
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        le {this.state.datetime}
        <br />
        <input
          value={this.state.date}
          onChange={ev => {
            this.setState({ date: ev.target.value });
            this.processChange();
          }}
          type="date"
        />
        <input
          value={this.state.time}
          type="time"
          onMouseLeave={() => this.processChange()}
          onChange={ev => {
            this.setState({ time: ev.target.value });
            this.processChange();
          }}
        />
      </div>
    );
  }
}

export default DateTimeComponent;
