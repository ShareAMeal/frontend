import React from "react";
import MyAsso from "../asso/MyAsso";
import LoginComponent from "../login/Login";
import "./page_asso.css"


class PageAsso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onLoginSuccess(my_asso) {
        this.setState({my_asso: my_asso});
    }

    render() {
        let ifAssoManager = "";
        if (this.state.my_asso) {
            ifAssoManager = (
                <div>
                    <MyAsso asso={this.state.my_asso}/>
                </div>
            );
        }
        return (
            <div className="PageAsso">
                <LoginComponent
                    onLoginSuccess={x => {
                        this.onLoginSuccess(x);
                    }}
                />
                <div id="mainContainer">
                    {ifAssoManager}

                </div>
            </div>
        )

    }

}

export default PageAsso;