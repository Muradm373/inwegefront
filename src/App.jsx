import "./App.css";
import React, { Component } from "react";
import Main from "./Main";
import Admin from "./Admin";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Main lang="en" />} />
          <Route exact path="/ru/" render={() => <Main lang="ru" />} />
          <Route exact path="/ee/" render={() => <Main lang="es" />} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    );
  }
}

export default App;
