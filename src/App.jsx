import "./css/styles/App.css";
import React, { Component } from "react";
import Main from "./Main";
import "./css/mnimi.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Main lang="et" />} />
          <Route exact path="/ru/" render={() => <Main lang="ru" />} />
          <Route exact path="/en/" render={() => <Main lang="en" />} />
          <Route path="/admin" render={() => <Main type="admin" />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
