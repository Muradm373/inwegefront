import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import AdminPanel from "./components/admin-page/AdminPanel";
import MethodologyComponent from "./components/methodology-page/MethodologyComponent";
import PensionsComponent from "./components/pensions-page/PensionsComponent";
import SalaryCalculator from "./components/salary-calculator-page/SalaryCalculator";
import Feedback from "./components/salary-calculator-page/selector-components/Feedback";
import SubscriptionComponent from "./components/subscription-headline/SubscriptionComponent";
import WageForecast from "./components/wage-forecast-page/WageForecast";
import changeLanguage, { APP_NAME, main, tabs } from "./dictionary/text";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "Harjumaa maakond",
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
    } if (this.state.menu === tabs[2]){
      return (<div>
        <PensionsComponent></PensionsComponent>
      </div>
      );
    } 
    else {
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

          <header className="layout__header">
            <div className="layout__header__top">
              <div className="content-link">
                <a href="#main">Navigate to content</a>
              </div>
              <div className="u-container">
                <div className="layout__header__top__left">
                  <nav className="navigation menu--app-menu">
                    <span
                      id="block-rakendustemenuu-menu"
                      className="menu--app-menu__title"
                    >
                      Statistics Estonia:
                    </span>

                    <ul data-region="header_top_left" className="menu">
                      <li className="menu-item">
                        <a tabIndex="0" >Webpage</a>
                        <ul className="menu">
                          <li className="menu-item">
                            <a
                              href="http://pub.stat.ee/px-web.2001/dialog/statfile1.asp"
                            >
                              Statistical database PxWeb
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="http://andmebaas.stat.ee/?lang=en&amp;SubSessionId=d6bed41d-cf9f-44f2-975b-4680e7060ae1&amp;themetreeid=-200"

                            >
                              Statistical database .Stat
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="https://estat.stat.ee/sa-auth/login?TARGET=https%3A//estat.stat.ee/valisportaal/j_spring_cas_security_check&amp;language=en"
                            >
                              eSTAT
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="https://juhtimislauad.stat.ee/"
                              title="https://juhtimislauad.stat.ee/"
                            >
                              Dashboards
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="https://tamm.stat.ee/?lang=en"
                            >
                              Tree of Truth
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="https://estat.stat.ee/StatistikaKaart/VKR"
                            >
                              Statistics map application
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="https://valiskaubandus.stat.ee/?locale=en"
                            >
                              Foreign trade application
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="https://ametipalk.stat.ee/"
                            >
                              Wages and salaries application
                            </a>
                          </li>
                          <li className="menu-item">
                            <a href="/nimed/" >
                              Name statistics application
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="layout__header__top__center">
                  <nav
                    role="navigation"
                    aria-labelledby="block-sotsiaalmenuu-menu"
                    id="block-sotsiaalmenuu"
                    className="block block-menu navigation menu--social-menu"
                  >
                    <h2 className="visually-hidden" id="block-sotsiaalmenuu-menu">
                      Sotsiaalmenüü{" "}
                    </h2>

                    <ul className="menu menu-level-0">
                      <li className="menu-item">
                        <span
                          className="icofont-facebook"
                          style={{ cursor: "pointer" }}
                          href="www.google.com"
                        ></span>
                      </li>

                      <li className="menu-item">
                        <span
                          className="icofont-twitter"
                          style={{ cursor: "pointer" }}
                        ></span>
                      </li>

                      <li className="menu-item">
                        <span
                          className="icofont-linkedin"
                          style={{ cursor: "pointer" }}
                        ></span>
                      </li>

                      <li className="menu-item">
                        <span
                          className="icofont-youtube"
                          style={{ cursor: "pointer" }}
                        ></span>
                      </li>

                      <li className="menu-item">
                        <span
                          className="icofont-instagram"
                          style={{ cursor: "pointer" }}
                        ></span>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="layout__header__top__right">
                  <nav
                    role="navigation"
                    aria-labelledby="block-paiseviited-menu"
                    id="block-paiseviited"
                    className="block block-menu navigation menu--header-references"
                  >
                    <div className="flex-list wpml-ls-statics-shortcode_actions wpml-ls wpml-ls-legacy-list-horizontal">
                      <ul>
                        <li className="wpml-ls-slot-shortcode_actions wpml-ls-item wpml-ls-item-et wpml-ls-first-item wpml-ls-item-legacy-list-horizontal">
                          <a
                            href="/ee"
                            className="wpml-ls-link"
                            onClick={() => this.refresh("es")}
                          >
                            <span
                              className="wpml-ls-native"
                              style={{
                                color:
                                  this.defaultValue() === "es" ? "#4e73df" : "",
                                fontSize: "10pt",
                              }}
                            >
                              EST
                            </span>
                          </a>
                        </li>
                        <li className="wpml-ls-slot-shortcode_actions wpml-ls-item wpml-ls-item-en wpml-ls-current-language wpml-ls-last-item wpml-ls-item-legacy-list-horizontal">
                          <a
                            href="/"
                            onClick={() => this.refresh("en")}
                            className="wpml-ls-link"
                          >
                            <span
                              className="wpml-ls-native"
                              style={{
                                color:
                                  this.defaultValue() === "en" ? "#4e73df" : "",
                                fontSize: "10pt",
                              }}
                            >
                              ENG
                            </span>
                          </a>
                        </li>
                        <li className="flex-list-lst wpml-ls-slot-shortcode_actions wpml-ls-item wpml-ls-item-en wpml-ls-current-language wpml-ls-last-item wpml-ls-item-legacy-list-horizontal">
                          <a
                            href="/ru"
                            onClick={() => this.refresh("ru")}
                            className="wpml-ls-link"
                          >
                            <span
                              className="wpml-ls-native"
                              style={{
                                color:
                                  this.defaultValue() === "ru" ? "#4e73df" : "",
                                fontSize: "10pt",
                              }}
                            >
                              RUS
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="layout__header__bottom">
              <div className="u-container">
                <div
                  id="block-stat-branding"
                  className="block block-system block-system-branding-block"
                >
                  <a onClick={this.changeMenu} rel="home" className="site-logo">
                    <img
                      src={require("./resources/icon.png")}
                      alt="Home"
                      style={{ width: "130px", backgroundColor: "#FFFFFF" }}
                    />
                  </a>
                </div>
                <nav
                  role="navigation"
                  aria-labelledby="block-mainnavigationenglish-menu"
                  id="block-mainnavigationenglish"
                  className="block block-menu navigation menu--main-en"
                >
                  <ul data-region="header_bottom" className="menu">
                    <li className="menu-item menu-item--expanded">
                      <span
                        tabIndex="0"
                        onClick={this.changeMenu}
                        style={{
                          color: this.state.menu === tabs[1] ? "#4e73df" : "",
                          cursor: "pointer"
                        }}
                      >
                        {tabs[1]}
                      </span>
                    </li>
                    <li className="menu-item menu-item--expanded">
                      <span
                        tabIndex="1"
                        onClick={this.changeMenu}
                        style={{
                          color: this.state.menu === tabs[2] ? "#4e73df" : "",
                          cursor: "pointer"
                        }}
                      >
                        {tabs[2]}
                      </span>
                    </li>
                    <li className="menu-item menu-item--expanded">
                      <span
                        tabIndex="2"
                        className="menuSpan"
                        onClick={this.changeMenu}
                        style={{
                          color: this.state.menu === tabs[3] ? "#4e73df" : "",
                          cursor: "pointer"
                        }}
                      >
                        {tabs[3]}
                      </span>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <main id="main" style={{ marginTop: "-120px" }}>
            <div>
              <div
                className="selector-style text-center mx-auto"
              >
                {this.props.type === "admin"?<AdminPanel></AdminPanel>:
                this.renderMenu()}
              </div>
            </div>
            
          </main>
          <div className="site-section">
            <div className="container"></div>
          </div>
        </div>
        <footer className="footer footer-dot" role="contentinfo">
          <div className="">
            <div className="row graph-component-cards" >

              <div className="col-md-2 ml-5">
                <div className="row site-section pt-0">
                  <div className="col-md-3 mb-md-0">
                    <h3>{main[3]}</h3>
                    <ul className="list-unstyled">
                      <li>
                        <a  onClick={this.changeMenu}>{tabs[0]}</a>
                      </li>
                      <li>
                        <a  onClick={this.changeMenu}>{tabs[1]}</a>
                      </li>
                      <li>
                        <a  onClick={this.changeMenu}>{tabs[2]}</a>
                      </li>
                      <li>
                        <a  onClick={this.changeMenu}>{tabs[3]}</a>
                      </li>
                      <li>
                        <a  onClick={this.changeMenu}>{tabs[4]}</a>
                      </li>
                    </ul>
                  </div>

          
                </div>
              </div>
              <div className="col-md-4">
                <SubscriptionComponent></SubscriptionComponent>
              </div>
                  <div className="col-md-3 m-3">
                    <h3>{main[2]}</h3>
                    <Feedback></Feedback>
                  </div>
                  <div className="col-md-2">
                
                <img
                  src={require("./resources/ERDF_h_est.jpg")}
                  style={{ width: "200px", margin: "40px" }}
                  alt=""
                />
              </div>

            </div>
            
            
            <div className="row justify-content-center text-center mt-4">
              <div className="col-md-7">
                <p className="copyright">
                  &copy; Copyright {APP_NAME}. All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </footer>

        <a  className="back-to-top">
          <i className="icofont-simple-up"></i>
        </a>
      </div>
    );
  }
}

export default Main;
