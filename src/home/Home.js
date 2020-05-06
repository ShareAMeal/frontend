import React from "react";
import MaraudeComponent from "../maraude/Maraude";
import "./Home.css";
class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="home-desc">

        </div>
        <MaraudeComponent />
      </div>
    );
  }
}

export default Home;
