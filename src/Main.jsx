import AOS from "aos";
import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import MethodologyComponent from "./components/methodology-page/MethodologyComponent";
import SalaryCalculator from "./components/salary-calculator-page/SalaryCalculator";
import Feedback from "./components/salary-calculator-page/selector-components/Feedback";
import SubscriptionComponent from "./components/subscription-headline/SubscriptionComponent";
import WageForecast from "./components/wage-forecast-page/WageForecast";
import changeLanguage, { about, APP_NAME, main, tabs } from "./dictionary/text";

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
       
          <header class="layout__header">
            <div class="layout__header__top">
              <div class="content-link">
                <a href="#main">Navigate to content</a>
              </div>
              <div class="u-container">
                <div class="layout__header__top__left">
                  <nav
                    role="navigation"
                    aria-labelledby="block-rakendustemenuu-menu"
                    id="block-rakendustemenuu"
                    class="block block-menu navigation menu--app-menu"
                  >
                    <span
                      id="block-rakendustemenuu-menu"
                      class="menu--app-menu__title"
                    >
                      Statistics Estonia:
                    </span>

                    <ul data-region="header_top_left" class="menu">
                      <li class="menu-item menu-item--expanded">
                        <span tabindex="0">Webpage</span>
                        <ul class="menu">
                          <li class="menu-item">
                            <a
                              href="http://pub.stat.ee/px-web.2001/dialog/statfile1.asp"
                              target="_blank"
                            >
                              Statistical database PxWeb
                            </a>
                          </li>
                          <li class="menu-item">
                            <a
                              href="http://andmebaas.stat.ee/?lang=en&amp;SubSessionId=d6bed41d-cf9f-44f2-975b-4680e7060ae1&amp;themetreeid=-200"
                              target="_blank"
                            >
                              Statistical database .Stat
                            </a>
                          </li>
                          <li class="menu-item">
                            <a
                              href="https://estat.stat.ee/sa-auth/login?TARGET=https%3A//estat.stat.ee/valisportaal/j_spring_cas_security_check&amp;language=en"
                              target="_blank"
                            >
                              eSTAT
                            </a>
                          </li>
                          <li class="menu-item">
                            <a
                              href="https://juhtimislauad.stat.ee/"
                              target="_blank"
                              title="https://juhtimislauad.stat.ee/"
                            >
                              Dashboards
                            </a>
                          </li>
                          <li class="menu-item">
                            <a
                              href="https://tamm.stat.ee/?lang=en"
                              target="_blank"
                            >
                              Tree of Truth
                            </a>
                          </li>
                          <li class="menu-item">
                            <a
                              href="https://estat.stat.ee/StatistikaKaart/VKR"
                              target="_blank"
                            >
                              Statistics map application
                            </a>
                          </li>
                          <li class="menu-item">
                            <a
                              href="https://valiskaubandus.stat.ee/?locale=en"
                              target="_blank"
                            >
                              Foreign trade application
                            </a>
                          </li>
                          <li class="menu-item">
                            <a
                              href="https://ametipalk.stat.ee/"
                              target="_blank"
                            >
                              Wages and salaries application
                            </a>
                          </li>
                          <li class="menu-item">
                            <a href="/nimed/" target="_blank">
                              Name statistics application
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div class="layout__header__top__center">
                  <nav
                    role="navigation"
                    aria-labelledby="block-sotsiaalmenuu-menu"
                    id="block-sotsiaalmenuu"
                    class="block block-menu navigation menu--social-menu"
                  >
                    <h2 class="visually-hidden" id="block-sotsiaalmenuu-menu">
                      Sotsiaalmenüü{" "}
                    </h2>

                    <ul class="menu menu-level-0">
                      <li class="menu-item">    
                            <span className="icofont-facebook" style={{cursor: "pointer"}} href="www.google.com"></span>
                      </li>

                      <li class="menu-item">
                      <span className="icofont-twitter" style={{cursor: "pointer"}}></span>
                      </li>

                      <li class="menu-item">
                      <span className="icofont-linkedin" style={{cursor: "pointer"}}></span>
                      </li>

                      <li class="menu-item">
                      <span className="icofont-youtube" style={{cursor: "pointer"}}></span>
                      </li>

                      <li class="menu-item">
                      <span className="icofont-instagram" style={{cursor: "pointer"}}></span>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div class="layout__header__top__right">
                  <nav
                    role="navigation"
                    aria-labelledby="block-paiseviited-menu"
                    id="block-paiseviited"
                    class="block block-menu navigation menu--header-references"
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
                              }}
                            >
                              EE
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
                              }}
                            >
                              EN
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
                              }}
                            >
                              RU
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div class="layout__header__bottom">
              <div class="u-container">
                <div
                  id="block-stat-branding"
                  class="block block-system block-system-branding-block"
                >
                  <a href="/" rel="home" class="site-logo">
                    <img
                      src={require("./resources/icon.png")}
                      alt="Home"
                      style={{ width: "120px" }}
                    />
                  </a>
                </div>
                <nav
                  role="navigation"
                  aria-labelledby="block-mainnavigationenglish-menu"
                  id="block-mainnavigationenglish"
                  class="block block-menu navigation menu--main-en"
                >
                  <ul data-region="header_bottom" class="menu">
                    <li class="menu-item menu-item--expanded">
                      <span
                        tabindex="0"
                        onClick={this.changeMenu}
                        style={{
                          color: this.state.menu === tabs[1] ? "#4e73df" : "",
                        }}
                      >
                        {tabs[1]}
                      </span>
                    </li>
                    <li class="menu-item menu-item--expanded">
                      <span
                        tabindex="1"
                        onClick={this.changeMenu}
                        style={{
                          color: this.state.menu === tabs[2] ? "#4e73df" : "",
                        }}
                      >
                        {tabs[2]}
                      </span>
                    </li>
                    <li class="menu-item menu-item--expanded">
                      <span
                        tabindex="2"
                        className="menuSpan"
                        onClick={this.changeMenu}
                        style={{
                          color: this.state.menu === tabs[3] ? "#4e73df" : "",
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
          <main id="main" style={{marginTop: "-120px"}}>
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

        <a href="/#" className="back-to-top">
          <i className="icofont-simple-up"></i>
        </a>
      </div>
    );
  }
}

export default Main;
