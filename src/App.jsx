import "./App.css";
import React, { Component } from "react";
import Main from "./Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPanel from "./components/admin/AdminPanel";
import SubscriptionComponent from "./components/subscription/SubscriptionComponent";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Main lang="en" />} />
          <Route exact path="/ru/" render={() => <Main lang="ru" />} />
          <Route exact path="/ee/" render={() => <Main lang="es" />} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/subscribe" component={SubscriptionComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
