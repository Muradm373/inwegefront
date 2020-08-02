import React, { Component } from "react";

import "react-tabs/style/react-tabs.css";
import SalaryCalculator from "./components/salary-calculator/SalaryCalculator";
import MethodologyComponent from "./components/methodology/MethodologyComponent";
import WageForecast from "./components/wage-forecast/WageForecast";
import Select from "react-select";
import changeLanguage, {
  tabs,
  APP_NAME,
  main,
  about,
} from "./text";
import Feedback from "./components/salary-calculator/Feedback";
import AOS from "aos";
import { Link } from "react-router-dom";
import SubscriptionComponent from "./components/subscription/SubscriptionComponent";

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


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "Tallinn",
      occupation: "",
      isco: "",
      code: 9629,
      lang: "en",
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

    return lang;
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
    changeLanguage(event);
    this.setState({ lang: event });
    window.location.reload();
  }

  changeMenu(e) {
    this.setState({ menu: e.target.textContent });
  }

  renderMenu() {
    if (this.state.menu === tabs[1]) {
      return (
        <div>
        <WageForecast
          onDataChange={this.getData}
          mapElementColor={this.state.mapElementColor}
        />
      </div>
      
      );
    }
    if (this.state.menu === tabs[3]) {
      return (
        <div>
          {" "}
          <MethodologyComponent></MethodologyComponent>
        </div>
      );
    } else {
      return (
      <div>
        <SalaryCalculator
          id="graph"
          onDataChange={this.getData}
          mapElementColor={this.state.mapElementColor}
        ></SalaryCalculator>
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
            style={{ backgroundColor: "black", color: "white" }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-6 col-lg-2">
                  <h3 className="mb-0 site-logo"></h3>
                </div>

                <div className="col-12 col-md-10 d-none d-lg-block">
                  <nav
                    className="site-navigation position-relative text-right"
                    role="navigation"
                  >
                    <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                      <li>
                        <a
                          href="#"
                          className="nav-link"
                          onClick={this.changeMenu}
                          style={{color: this.state.menu === tabs[0]? '#4e73df' : ''}}
                        >
                          {tabs[0]}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="nav-link"
                          onClick={this.changeMenu}
                          style={{color: this.state.menu === tabs[1]? '#4e73df' : ''}}
                        >
                          {tabs[1]}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="nav-link"
                          onClick={this.changeMenu}
                          style={{color: this.state.menu === tabs[2]? '#4e73df' : ''}}
                        >
                          {tabs[2]}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="nav-link"
                          onClick={this.changeMenu}
                          style={{color: this.state.menu === tabs[3]? '#4e73df' : ''}}
                        >
                          {tabs[3]}
                        </a>
                      </li>
                      <li>
                            
                            <div class="flex-list wpml-ls-statics-shortcode_actions wpml-ls wpml-ls-legacy-list-horizontal">
                              <ul>
                                <li class="wpml-ls-slot-shortcode_actions wpml-ls-item wpml-ls-item-et wpml-ls-first-item wpml-ls-item-legacy-list-horizontal">
                                    <a href="/ee" class="wpml-ls-link" onClick={()=>this.refresh("es")}>
                                      <span class="wpml-ls-native"  style={{color: this.defaultValue() === "es"? '#4e73df' : ''}}>EE</span>
                                    </a>
                                  </li>
                                  <li class="wpml-ls-slot-shortcode_actions wpml-ls-item wpml-ls-item-en wpml-ls-current-language wpml-ls-last-item wpml-ls-item-legacy-list-horizontal">
                                    <a href="/" onClick={()=>this.refresh("en")} class="wpml-ls-link">
                                      <span class="wpml-ls-native" style={{color: this.defaultValue() === "en"? '#4e73df' : ''}}>EN</span>
                                    </a>
                                  </li>
                                  <li class="flex-list-lst wpml-ls-slot-shortcode_actions wpml-ls-item wpml-ls-item-en wpml-ls-current-language wpml-ls-last-item wpml-ls-item-legacy-list-horizontal">
                                    <a href="/ru" onClick={()=>this.refresh("ru")} class="wpml-ls-link">
                                      <span class="wpml-ls-native" style={{color: this.defaultValue() === "ru"? '#4e73df' : ''}}>RU</span>
                                    </a>
                                  </li>
                              </ul>
                            </div>

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
            <div>
              <div
                className="selector-style text-center mx-auto"
                data-aos="fade-up"
                data-aos-delay=""
              >
                {this.renderMenu()}
              </div>
            </div>
          </main>
          <div className="site-section">
            <div className="container"></div>
          </div>
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
                  <a href="https://www.facebook.com/Inwege-projekt-539113286594122">
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
                      <li>
                        <a href="index.html">{tabs[4]}</a>
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
              <SubscriptionComponent></SubscriptionComponent>
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
