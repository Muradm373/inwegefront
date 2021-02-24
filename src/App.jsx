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
          <Route exact path="/" render={(path) => <Main lang="et" path={path} />} />
          <Route exact path="/ru/" render={(path) => <Main lang="ru" path={path} />} />
          <Route exact path="/en/" render={(path) => <Main lang="en" path={path} />} />

          <Route exact path="/palgavordlus" render={(path) => <Main lang="et" menu="0"path={path} />} />
          <Route exact path="/ru/palgavordlus" render={(path) => <Main lang="ru" menu="0"path={path} />} />
          <Route exact path="/en/palgavordlus" render={(path) => <Main lang="en" menu="0"path={path} />} />

          <Route exact path="/palgaprognoos" render={(path) => <Main lang="et" menu="1"path={path} />} />
          <Route exact path="/ru/palgaprognoos" render={(path) => <Main lang="ru" menu="1"path={path} />} />
          <Route exact path="/en/palgaprognoos" render={(path) => <Main lang="en" menu="1"path={path} />} />

          <Route exact path="/pensioniprognoos" render={(path) => <Main lang="et" menu="2"path={path} />} />
          <Route exact path="/ru/pensioniprognoos" render={(path) => <Main lang="ru" menu="2"path={path} />} />
          <Route exact path="/en/pensioniprognoos" render={(path) => <Main lang="en" menu="2"path={path} />} />

          <Route exact path="/selgitused" render={(path) => <Main lang="et" menu="3"path={path} />} />
          <Route exact path="/ru/selgitused" render={(path) => <Main lang="ru" menu="3"path={path} />} />
          <Route exact path="/en/selgitused" render={(path) => <Main lang="en" menu="3"path={path} />} />
          <Route path="/admin" render={(path) => <Main type="admin" path={path} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
