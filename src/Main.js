import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import PageAsso from "./PageAsso/page_asso"
import App from "./App"

const Main = () => {
    return (
        <BrowserRouter>
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={App}></Route>
            <Route exact path='/asso' component={PageAsso}></Route>
        </Switch>
        </BrowserRouter>
    );
}
function Test() {
    return (
        <div className="App">

            <Main/>
        </div>);
}

export default Main;