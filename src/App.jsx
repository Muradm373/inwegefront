import "./App.css";
import React from "react";
import "react-tabs/style/react-tabs.css";
import GraphComponent from "./components/GraphComponent";
import Select from "react-select";
import changeLanguage, { main } from "./text";
import ReactDOM from "react-dom";
import Background from "./img/bg.jpg";

const languages = [
  {
    value: "en",
    label: <img width="25px" src={require("./img/flags/us.png")} alt="EN"></img>
  },
  {
    value: "ru",
    label: (
      <img width="25px" src={require("./img/flags/russia.png")} alt="RU"></img>
    )
  },
  {
    value: "es",
    label: (
      <img width="25px" src={require("./img/flags/estonia.png")} alt="EE"></img>
    )
  }
];

function refresh(event) {
  changeLanguage(event.value);

  ReactDOM.render(<App />, document.getElementById("root"));
  ReactDOM.render(<GraphComponent />, document.getElementById("graph"));
}

const dropdownIndicatorStyles = (base, state) => {
  let changes = {
    // all your override styles
    display: "none"
  };

  return Object.assign(base, changes);
};

function App() {
  return (
    <div className="App">
      <nav
        className="navbar navbar-expand-lg bg-transparent"
        style={{ position: "absolute", right: "5%" }}
      >
        <div className="container">
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
                  {main[0]}
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  {main[1]}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  {main[2]}
                </a>
              </li>
              <li>
                <div style={{ width: "250%" }}>
                  <Select
                    className="bg-transparent"
                    options={languages}
                    onChange={refresh}
                    defaultValue={languages[0]}
                    styles={{ dropdownIndicator: dropdownIndicatorStyles }}
                    isSearchable={false}
                  ></Select>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section
        id="home"
        style={{
          height: "400px",
          backgroundAttachment: "fixed",
          backgroundImage: `url(${Background})`
        }}
        data-section="home"
      >
        <div>
          <div style={{ padding: "100px" }}>
            <h1>InWeGe</h1>
            <p>Gender Gaps in Wages and Wealth</p>
          </div>
        </div>
      </section>

      <section className="md-5" style={{ marginTop: "-100px" }}>
        <div className="container">
          <div id="graph">
            <GraphComponent></GraphComponent>
          </div>
        </div>
      </section>

      <footer
        className="py-5"
        style={{
          backgroundAttachment: "fixed",
          backgroundImage: `url(${Background})`
        }}
      >
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; InWeGe 2019
          </p>
        </div>
      </footer>

      <script src="vendor/jquery/jquery.min.js"></script>
      <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}

export default App;
