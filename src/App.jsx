import "./css/styles/App.css";
import React, { Component } from "react";
import Main from "./Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPanel from "./components/admin-page/AdminPanel";


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Main lang="en" />} />
          <Route exact path="/ru/" render={() => <Main lang="ru" />} />
          <Route exact path="/ee/" render={() => <Main lang="es" />} />
          <Route path="/admin"  render={() => <Main type="admin" />}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
