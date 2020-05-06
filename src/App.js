import React from "react";
import logo from "./icons8-assiette-creuse-96.png";
import "./App.css";
import Home from "./home/Home";
import MyAsso from "./asso/MyAsso";
import LoginComponent from "./login/Login";





class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
            <p class = "Connect">
                Vous faites partie d'une association ? :
                <a class = "Login "
                   href="/asso"
                   onClick="">
                        Se connecter
                </a>
            </p>
          <p class = "Titre">
              Share a Meal
          <br />
          <br />
          <img src = {logo}
               alt=""
               height="100px"
               width="100px"
          />
          </p>
          <p class ="Description">
              Ce site présente les maraudes organisées près de chez vous.</p>
        </header>
        <div id="mainContainer">

          <Home />
        </div>

      </div>
    );
  }
}

export default App;
