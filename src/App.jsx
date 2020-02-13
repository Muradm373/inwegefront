import "./App.css";
import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import GraphComponent from "./components/GraphComponent";
import Select from "react-select";
import changeLanguage, {
  tabs,
  APP_NAME,
  averageDataEng,
  main,
  averages,
  about
} from "./text";
import ReactDOM from "react-dom";
import Feedback from "./components/Modals/feedback/send/Feedback";
import AOS from "aos";
import PieChartComponent from "./components/PieChart";

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
}

const dropdownIndicatorStyles = (base, state) => {
  let changes = {
    // all your override styles
    display: "none"
  };

  return Object.assign(base, changes);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "Tallinn",
      occupation: "Actors",
      isco: 9629,
      code: 9629
    };

    this.getData = this.getData.bind(this);
  }

  getData = (region, isco, code, occupation) => {
    this.setState({
      region: region,
      isco: isco,
      code: code,
      occupation: occupation
    });
  };

  render() {
    AOS.init();
    return (
      <div>
        <div>
          <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close mt-3">
                <span className="icofont-close js-menu-toggle"></span>
              </div>
            </div>
            <div className="site-mobile-menu-body"></div>
          </div>
          <header
            className="site-navbar js-sticky-header site-navbar-target"
            role="banner"
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-6 col-lg-2">
                  <h1 className="mb-0 site-logo">
                    <a href="index.html" className="mb-0">
                      {APP_NAME}
                    </a>
                  </h1>
                </div>

                <div className="col-12 col-md-10 d-none d-lg-block">
                  <nav
                    className="site-navigation position-relative text-right"
                    role="navigation"
                  >
                    <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                      <li className="active">
                        <a href="index.html" className="nav-link">
                          {tabs[0]}
                        </a>
                      </li>
                      <li>
                        <a href="index.html" className="nav-link">
                          {tabs[1]}
                        </a>
                      </li>
                      <li>
                        <a href="index.html" className="nav-link">
                          {tabs[2]}
                        </a>
                      </li>
                      <li>
                        <a href="index.html" className="nav-link">
                          <div style={{ width: "250%" }}>
                            <Select
                              className="bg-transparent"
                              options={languages}
                              onChange={refresh}
                              defaultValue={languages[0]}
                              styles={{
                                dropdownIndicator: dropdownIndicatorStyles
                              }}
                              isSearchable={false}
                            ></Select>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className="col-6 d-inline-block d-lg-none ml-md-0 py-3">
                  <a
                    href="index.html"
                    className="burger site-menu-toggle js-menu-toggle"
                    data-toggle="collapse"
                    data-target="#main-navbar"
                  >
                    <span></span>
                  </a>
                </div>
              </div>
            </div>
          </header>
          <main id="main">
            <div className="hero-section">
              <div className="wave">
                <svg width="100%" viewBox="0 0 1920 355">
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Apple-TV"
                      transform="translate(0.000000, -402.000000)"
                      fill="#FFFFFF"
                    >
                      <path
                        d="M0,439.134243 C175.04074,464.89273 327.944386,477.771974 458.710937,477.771974 C654.860765,477.771974 870.645295,442.632362 1205.9828,410.192501 C1429.54114,388.565926 1667.54687,411.092417 1920,477.771974 L1920,757 L1017.15166,757 L0,757 L0,439.134243 Z"
                        id="Path"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>

              <div
                className="selector-style w-75 text-center mx-auto"
                data-aos="fade-up"
                data-aos-delay=""
              >
                <GraphComponent
                  id="graph"
                  onDataChange={this.getData}
                ></GraphComponent>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </div>
          </main>
          <div className="site-section">
            <div className="container">
              <div className="row justify-content-center text-center mb-5">
                <div className="col-md-5">
                  <h2 className="section-heading" data-aos="fade-right">
                    {averageDataEng}
                  </h2>
                </div>
              </div>

              <div className="row">
                <div
                  className="col-md-4"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="feature-1 text-center">
                    <div className="row d-flex justify-content-center">
                      <PieChartComponent
                        key="PieChart"
                        region={this.state.region}
                        isco={this.state.isco}
                        code={this.state.code}
                        type="occupation"
                      />
                    </div>
                    <h3 className="mb-3">
                      {averages[0] + this.state.occupation}
                    </h3>
                    <p>
                      Average wages for the given occupation in the given countee.
                    </p>
                  </div>
                </div>
                <div
                  className="col-md-4"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="feature-1 text-center">
                    <div className="row d-flex justify-content-center">
                      <PieChartComponent
                        key="PieChart"
                        region={this.state.region}
                        isco={this.state.isco}
                        code={this.state.code}
                        type="region"
                      />
                    </div>
                    <h3 className="mb-3">{averages[0] + this.state.region}</h3>
                    <p>
                      Average wages for all occupations in <br/>the given countee.
                    </p>
                  </div>
                </div>
                <div
                  className="col-md-4"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="feature-1 text-center">
                    <div className="row d-flex justify-content-center">
                      <PieChartComponent
                        key="PieChart"
                        region={this.state.region}
                        isco={this.state.isco}
                        code={this.state.code}
                        type="all"
                      />
                    </div>
                    <h3 className="mb-3">{averages[2]}</h3>
                    <p>
                      Average wages for all occupations <br/>for all counties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
        <footer className="footer" role="contentinfo">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <h3>About {APP_NAME}</h3>
                <p className="text-left">
                  {about}
                </p>
                <p className="social">
                  <a href="index.html">
                    <span className="icofont-twitter"></span>
                  </a>
                  <a href="index.html">
                    <span className="icofont-facebook"></span>
                  </a>
                </p>
              </div>
              <div className="col-md-7 ml-auto">
                <div className="row site-section pt-0">
                  <div className="col-md-4 mb-4 mb-md-0">
                    <h3>Navigation</h3>
                    <ul className="list-unstyled">
                      <li>
                        <a href="index.html">{tabs[0]}</a>
                      </li>
                      <li>
                        <a href="index.html">{tabs[1]}</a>
                      </li>
                      <li>
                        <a href="index.html">{tabs[2]}</a>
                      </li>
                      <li>
                        <a href="index.html">{tabs[3]}</a>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-7 mb-4 mb-md-0">
                    <h3>{main[2]}</h3>
                    <Feedback></Feedback>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center text-center">
              <div className="col-md-7">
                <p className="copyright">
                  &copy; Copyright {APP_NAME}. All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </footer>

        <a href="index.html" className="back-to-top">
          <i className="icofont-simple-up"></i>
        </a>
      </div>
    );
  }
}

export default App;
