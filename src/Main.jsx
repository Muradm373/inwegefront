import React, { Component } from "react";

import "react-tabs/style/react-tabs.css";
import SalaryCalculator from "./components/salary-calculator/SalaryCalculator";
import Select from "react-select";
import changeLanguage, {
  tabs,
  APP_NAME,
  averageData,
  main,
  averages,
  about,
  pieChartLabels,
} from "./text";
import Feedback from "./components/salary-calculator/Feedback";
import AOS from "aos";
import PieChartComponent from "./components/salary-calculator/PieChart";
import { Link } from "react-router-dom";
import WageForecast from "./components/wage-forecast/WageForecast";

const languages = [
  {
    value: "en",
    label: (
      <Link to="/">
        <img width="25px" src={require("./img/flags/us.png")} alt="EN"></img>
      </Link>
    ),
  },
  {
    value: "ru",
    label: (
      <Link to="/ru">
        <img
          width="25px"
          src={require("./img/flags/russia.png")}
          alt="RU"
        ></img>
      </Link>
    ),
  },
  {
    value: "es",
    label: (
      <Link to="/ee">
        <img
          width="25px"
          src={require("./img/flags/estonia.png")}
          alt="EE"
        ></img>
      </Link>
    ),
  },
];

const dropdownIndicatorStyles = (base, state) => {
  let changes = {
    // all your override styles
    display: "none",
  };

  return Object.assign(base, changes);
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "Tallinn",
      occupation: "Actors",
      isco: 9629,
      code: 9629,
      lang: "en",
      heroSectionStyle: "hero-section hero-section-color-1",
      mapElementColor: "#73e8ff",
      menu: tabs[0],
    };

    this.getData = this.getData.bind(this);
    this.refresh = this.refresh.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.changeMenu = this.changeMenu.bind(this);
  }

  defaultValue() {
    let lang = this.props.lang;

    if (lang === "en") return 0;
    if (lang === "ru") return 1;

    return 2;
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  getData = (region, isco, code, occupation) => {
    this.setState({
      region: region,
      isco: isco,
      code: code,
      occupation: occupation,
    });
  };

  refresh(event) {
    changeLanguage(event.value);
    this.setState({ lang: event.value });
    window.location.reload();
  }

  changeMenu(e) {
    this.setState({ menu: e.target.textContent });
  }

  renderMenu() {
    if (this.state.menu == tabs[0]) {
      return (
        <div>
          {" "}
          <SalaryCalculator
            id="graph"
            onDataChange={this.getData}
            mapElementColor={this.state.mapElementColor}
          ></SalaryCalculator>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      );
    } else {
      return (
        <div>
          <WageForecast
            onDataChange={this.getData}
            mapElementColor={this.state.mapElementColor}
          />
        </div>
      );
    }
  }

  render() {
    AOS.init();
    changeLanguage(this.props.lang);
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
                    <span
                      style={{ cursor: "pointer" }}
                      href={(e) => e.preventDefault()}
                      className="mb-0"
                      onClick={this.scrollToBottom}
                    >
                      <p style={{ color: "#FFFFFF" }}>{APP_NAME}</p>
                    </span>
                  </h1>
                </div>

                <div className="col-12 col-md-10 d-none d-lg-block">
                  <nav
                    className="site-navigation position-relative text-right"
                    role="navigation"
                  >
                    <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                      <li className="active">
                        <a
                          href="#"
                          className="nav-link"
                          onClick={this.changeMenu}
                        >
                          {tabs[0]}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="nav-link"
                          onClick={this.changeMenu}
                        >
                          {tabs[1]}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="nav-link"
                          onClick={this.changeMenu}
                        >
                          {tabs[2]}
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          <div style={{ width: "250%" }}>
                            <Select
                              className="bg-transparent"
                              options={languages}
                              onChange={this.refresh}
                              defaultValue={languages[this.defaultValue()]}
                              styles={{
                                dropdownIndicator: dropdownIndicatorStyles,
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
            <div className={this.state.heroSectionStyle}>
              <div
                className="selector-style w-75 text-center mx-auto"
                data-aos="fade-up"
                data-aos-delay=""
              >
                {this.renderMenu()}
              </div>
            </div>
          </main>
          <div className="site-section">
            <div className="container">
              <div className="row justify-content-center text-center mb-5">
                <div className="col-md-5">
                  <h2 className="section-heading">{averageData}</h2>
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
                    <p>{pieChartLabels[0]}</p>
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
                    <p>{pieChartLabels[1]}</p>
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
                    <p>{pieChartLabels[2]}</p>
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
                <h3>
                  {main[1]} {APP_NAME}
                </h3>
                <p
                  className="text-left"
                  ref={(el) => {
                    this.messagesEnd = el;
                  }}
                >
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
                    <h3>{main[3]}</h3>
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

        <a href="#" className="back-to-top">
          <i className="icofont-simple-up"></i>
        </a>
      </div>
    );
  }
}

export default Main;
