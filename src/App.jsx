import React from "react";
import "./App.css";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import GraphComponent from "./components/GraphComponent";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            InWeGe Project
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="py-5">
        <div className="container">
          <br></br>
          <Tabs id="uncontrolled-tab-example">
            <TabList>
              <Tab>Wages</Tab>
              <Tab>Pensions</Tab>
              <Tab disabled>Salary calculator</Tab>
            </TabList>
            <TabPanel>
              <GraphComponent></GraphComponent>
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </Tabs>
        </div>
      </section>

      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; Your Website 2019
          </p>
        </div>
      </footer>

      <script src="vendor/jquery/jquery.min.js"></script>
      <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}

export default App;
