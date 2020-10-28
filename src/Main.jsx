import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import AdminPanel from "./components/admin-page/AdminPanel";
import MethodologyComponent from "./components/methodology-page/MethodologyComponent";
import PensionsComponent from "./components/pensions-page/PensionsComponent";
import SalaryCalculator from "./components/salary-calculator-page/SalaryCalculator";
import SubscriptionComponent from "./components/subscription-headline/SubscriptionComponent";
import WageForecast from "./components/wage-forecast-page/WageForecast";
import changeLanguage, {
  APP_NAME,
  main,
  tabs,
  facebook,
  instagram,
  youtube,
  twitter,
  linkedin,
  treeOfTruthLabel,
  mapApplication,
  statisticalDbLabel,
  dashboardsLabel,
  foreignTrade,
  wageSalary,
  nameStatistics,
  statisticsEstonia,
  newsletter,
  webpageLabel,
  joinBody,
  joinLink,
} from "./dictionary/text";

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
      isActive: false,
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
    this.setState({ menu: e.target.textContent, isActive: false });
  }

  renderMenu() {
    if (this.state.menu === tabs[1]) {
      return (
        <div id="wage-forecast-component">
          <WageForecast
            onDataChange={this.getData}
            mapElementColor={this.state.mapElementColor}
          />
        </div>
      );
    }
    if (this.state.menu === tabs[3]) {
      return (
        <div id="methodology-component">
          <MethodologyComponent></MethodologyComponent>
        </div>
      );
    }
    if (this.state.menu === tabs[2]) {
      return (
        <div id="pension-component">
          <PensionsComponent></PensionsComponent>
        </div>
      );
    } else {
      return (
        <div id="salary-component">
          <SalaryCalculator
            id="salary-calculator-component"
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
        <div
          id="sidenav"
          className="sidenav"
          style={{ width: this.state.isActive ? "250px" : "0px" }}
        >
          <div className=" row site-section pt-0 col-md-3 mb-md-0">
            <ul className="link-list">
              <li>
                <a onClick={this.changeMenu}>{tabs[0]}</a>
              </li>
              <li>
                <a onClick={this.changeMenu}>{tabs[1]}</a>
              </li>
              <li>
                <a onClick={this.changeMenu}>{tabs[2]}</a>
              </li>
              <li>
                <a onClick={this.changeMenu}>{tabs[3]}</a>
              </li>
              <li>
                <a onClick={this.changeMenu}>{tabs[4]}</a>
              </li>
            </ul>
          </div>
        </div>
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
              <div className="u-container">
                <div className="layout__header__top__left">
                  <nav className="navigation menu--app-menu">
                    <span
                      id="block-rakendustemenuu-menu"
                      className="menu--app-menu__title"
                    >
                      {statisticsEstonia}
                    </span>

                    <ul data-region="header_top_left" className="menu">
                      <li className="menu-item">
                        <a tabIndex="0">{webpageLabel}</a>
                        <ul className="menu">
                          <li className="menu-item">
                            <a href="http://pub.stat.ee/px-web.2001/dialog/statfile1.asp">
                              {statisticalDbLabel} PxWeb
                            </a>
                          </li>
                          <li className="menu-item">
                            <a href="http://andmebaas.stat.ee/?lang=en&amp;SubSessionId=d6bed41d-cf9f-44f2-975b-4680e7060ae1&amp;themetreeid=-200">
                              {statisticalDbLabel} .Stat
                            </a>
                          </li>
                          <li className="menu-item">
                            <a href="https://estat.stat.ee/sa-auth/login?TARGET=https%3A//estat.stat.ee/valisportaal/j_spring_cas_security_check&amp;language=en">
                              eSTAT
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="https://juhtimislauad.stat.ee/"
                              title="https://juhtimislauad.stat.ee/"
                            >
                              {dashboardsLabel}
                            </a>
                          </li>
                          <li className="menu-item">
                            <a href="https://tamm.stat.ee/?lang=en">
                              {treeOfTruthLabel}
                            </a>
                          </li>
                          <li className="menu-item">
                            <a href="https://estat.stat.ee/StatistikaKaart/VKR">
                              {mapApplication}
                            </a>
                          </li>
                          <li className="menu-item">
                            <a href="https://valiskaubandus.stat.ee/?locale=en">
                              {foreignTrade}
                            </a>
                          </li>
                          <li className="menu-item">
                            <a href="https://ametipalk.stat.ee/">
                              {wageSalary}
                            </a>
                          </li>
                          <li className="menu-item">
                            <a href="/nimed/">{nameStatistics}</a>
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
                    <h2
                      className="visually-hidden"
                      id="block-sotsiaalmenuu-menu"
                    >
                      Sotsiaalmenüü{" "}
                    </h2>

                    <ul className="menu menu-level-0">
                      <li className="menu-item">
                        <span
                          className="icofont-facebook"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.open(facebook, "_blank");
                          }}
                        ></span>
                      </li>

                      <li className="menu-item">
                        <span
                          className="icofont-twitter"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.open(twitter, "_blank");
                          }}
                        ></span>
                      </li>

                      <li className="menu-item">
                        <span
                          className="icofont-linkedin"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.open(linkedin, "_blank");
                          }}
                        ></span>
                      </li>

                      <li className="menu-item">
                        <span
                          className="icofont-youtube"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.open(youtube, "_blank");
                          }}
                        ></span>
                      </li>

                      <li className="menu-item">
                        <span
                          className="icofont-instagram"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.open(instagram, "_blank");
                          }}
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
                            href="/"
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
                            href="/en"
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
                      src={require("./resources/logo.svg")}
                      alt="Home"
                      style={{
                        width: "160px",
                        backgroundColor: "#FFFFFF",
                        marginTop: "17px",
                        marginLeft: "-12px",
                        cursor: "pointer",
                      }}
                    />
                  </a>
                </div>
                <button
                  className="menu-toggle hamburger"
                  style={{
                    position: "absolute",
                    right: "0px",
                    padding: "10px",
                  }}
                  onClick={() =>
                    this.setState({
                      isActive: !this.state.isActive,
                    })
                  }
                >
                  <span
                    className={
                      "si hamburger-box hamburger--spin " +
                      (this.state.isActive ? "is-active" : "")
                    }
                  >
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
                <div
                  style={{ backgroundColor: "white" }}
                  className="layout__header__top__center block-page-title-block p-2"
                >
                  <h2>{APP_NAME}</h2>
                </div>
              </div>
            </div>
            <nav
              role="navigation"
              aria-labelledby="block-mainnavigationenglish-menu"
              id="block-mainnavigationenglish"
              className="block block-menu menu--main-en layout__nav__top__center"
            >
              <ul
                data-region="header_bottom"
                className="menu"
                style={{ backgroundColor: "white", height: "50px" }}
              >
                <li className="menu-item menu-item--expanded">
                  <span
                    tabIndex="0"
                    onClick={this.changeMenu}
                    style={{
                      color: this.state.menu === tabs[0] ? "#4e73df" : "",
                      cursor: "pointer",
                    }}
                  >
                    {tabs[0]}
                  </span>
                </li>
                <li className="menu-item menu-item--expanded">
                  <span
                    tabIndex="0"
                    onClick={this.changeMenu}
                    style={{
                      color: this.state.menu === tabs[1] ? "#4e73df" : "",
                      cursor: "pointer",
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
                      cursor: "pointer",
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
                      cursor: "pointer",
                    }}
                  >
                    {tabs[3]}
                  </span>
                </li>
              </ul>
            </nav>
          </header>
          <main id="main" style={{ marginTop: "-90px" }}>
            <div>
              <div className="selector-style text-center mx-auto">
                {this.props.type === "admin" ? (
                  <AdminPanel></AdminPanel>
                ) : (
                  this.renderMenu()
                )}
              </div>
            </div>
          </main>
          <div className="site-section">
            <div className="container"></div>
          </div>
        </div>
        <footer class="layout__footer footer-dot">
          <div class="u-container u-container--small">
            <div
              id="block-jalusekontaktid"
              class="block--contacts block block-fixed-block-content block-fixed-block-contentfooter-contacts"
            >
              <h2>{main[2]}</h2>

              <div class="field field--label-hidden field__items">
                <div class="field__item">
                  <span className="icofont-phone"></span>
                  <a href="tel:%2B3726259300">+372 625 9300</a>
                </div>
              </div>
              <div class="field field--label-hidden field__items">
                <div class="field__item">
                  <span className="icofont-email"></span>
                  <a href="mailto:stat@stat.ee" class="spamspan">
                    stat@stat.ee
                  </a>
                </div>
              </div>
            </div>
            <div
              id="block-newsletterblock"
              class="block block-we-smaily block-newsletter-block"
            >
              <h2>{newsletter}</h2>

              <div class="block__form">
                <SubscriptionComponent></SubscriptionComponent>
              </div>

              <div class="block__text">
                <p>
                  {joinBody}{" "}
                  <a
                    href="https://saextwebtest.stat.ee/et/statistikaamet/andmekaitse"
                    target="_self"
                  >
                    {joinLink}
                  </a>
                </p>
              </div>
            </div>
            <div
              id="block-jaluselogo"
              class="block--image_block block block-fixed-block-content block-fixed-block-contentfooter-logo"
            >
              <a href="http://inwege.cloud.ut.ee/" target="_blank">
                <div class="field field--name-field-image field--type-image field--label-hidden field__items black-bg">
                  <div class="field__item">
                    <img
                      src={require("./resources/eu.jpg")}
                      width="200"
                      height="116"
                      alt="SF logo"
                      typeof="foaf:Image"
                    />
                  </div>
                </div>
              </a>
              <p style={{color: "#FFF", fontSize: "14px"}}>
                      This project was funded by Horizon 2020, the European
                      Union’s Rights, Equality and Citizenship Program
                      (2014-2020).
                    </p>
            </div>
          </div>
        </footer>

        <a className="back-to-top">
          <i className="icofont-simple-up"></i>
        </a>
      </div>
    );
  }
}

export default Main;
