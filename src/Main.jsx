import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import { getDates, setLanguage } from "./actions/actions";
import AdminPanel from "./components/admin-page/AdminPanel";
import MethodologyComponent from "./components/methodology-page/MethodologyComponent";
import PensionsComponent from "./components/pensions-page/PensionsComponent";
import SalaryCalculator from "./components/salary-calculator-page/SalaryCalculator";
import SubscriptionComponent from "./components/subscription-headline/SubscriptionComponent";
import WageForecast from "./components/wage-forecast-page/WageForecast";
import changeLanguage, {
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
  foundationLabel,
} from "./dictionary/text";
import { connect } from "react-redux";

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
    this.props.getDates();
    this.props.setLang(props.lang);
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
          className={"blur"}
          style={{ display: this.state.isActive ? "block" : "none" }}
        ></div>

        <button
          className="menu-toggle hamburger"
          style={{
            position: "absolute",
            top: "50px",
            right: "15px",
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
              "si hamburger-box hamburger--boring " +
              (this.state.isActive ? "is-active" : "")
            }
          >
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <div
          id="sidenav"
          className="sidenav"
          style={{ display: this.state.isActive ? "block" : "none" }}
        >
          <div className=" row ">
            <ul className="link-list">
              <li>
                <a href={"#"} onClick={this.changeMenu}>
                  {tabs[0]}
                </a>
              </li>
              <li>
                <a href={"#"} onClick={this.changeMenu}>
                  {tabs[1]}
                </a>
              </li>
              <li>
                <a href={"#"} onClick={this.changeMenu}>
                  {tabs[2]}
                </a>
              </li>
              <li>
                <a href={"#"} onClick={this.changeMenu}>
                  {tabs[3]}
                </a>
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
                        <a href={"/"} tabIndex="0">
                          {webpageLabel}
                        </a>
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
                          className="icofont-youtube-play"
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
                            onClick={() => this.refresh("et")}
                          >
                            <span
                              className="wpml-ls-native"
                              style={{
                                color:
                                  this.defaultValue() === "et"
                                    ? "#FFF"
                                    : "#929292",
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
                                  this.defaultValue() === "en"
                                    ? "#FFF"
                                    : "#929292",
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
                                  this.defaultValue() === "ru"
                                    ? "#FFF"
                                    : "#929292",
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
                  <a
                    onClick={this.changeMenu}
                    href={"/"}
                    rel="home"
                    className="site-logo"
                  >
                    <img
                      src={
                        this.props.language === "en"
                          ? require("./resources/logo-en.svg")
                          : require("./resources/logo.svg")
                      }
                      alt="Home"
                      className={"ml-5"}
                      style={{
                        display: "block",
                        width: "150px",
                        backgroundColor: "#FFFFFF",
                        cursor: "pointer",
                        marginTop: "-5px",
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
            <nav
              role="navigation"
              aria-labelledby="block-mainnavigationenglish-menu"
              id="block-mainnavigationenglish"
              className="block block-menu menu--main-en layout__nav__top__center"
              style={{ marginTop: "-54px" }}
            >
              <ul
                data-region="header_bottom"
                className="menu"
                style={{ backgroundColor: "white", height: "50px" }}
              >
                <li className="menu-item menu-item--expanded h4-stat">
                  <span
                    tabIndex="0"
                    onClick={this.changeMenu}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {tabs[0]}
                  </span>
                </li>
                <li className="menu-item menu-item--expanded h4-stat">
                  <span
                    tabIndex="0"
                    onClick={this.changeMenu}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {tabs[1]}
                  </span>
                </li>
                <li className="menu-item menu-item--expanded h4-stat">
                  <span
                    tabIndex="1"
                    onClick={this.changeMenu}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {tabs[2]}
                  </span>
                </li>
                <li className="menu-item menu-item--expanded h4-stat">
                  <span
                    tabIndex="2"
                    className="menuSpan"
                    onClick={this.changeMenu}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {tabs[3]}
                  </span>
                </li>
              </ul>
            </nav>
          </header>
          <main
            id="main"
            className={"px-5 main-padding"}
            style={{ marginTop: "-90px" }}
          >
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
        <footer className="layout__footer footer-dot">
          <div className="u-container u-container--small">
            <div
              id="block-jalusekontaktid"
              className="block--contacts block block-fixed-block-content block-fixed-block-contentfooter-contacts"
            >
              <h2>{main[2]}</h2>

              <div className="field field--label-hidden field__items">
                <div className="field__item">
                  <span className="icofont-phone"></span>
                  <a href="tel:%2B3726259300">+372 625 9300</a>
                </div>
              </div>
              <div className="field field--label-hidden field__items">
                <div className="field__item">
                  <span className="icofont-email"></span>
                  <a href="mailto:stat@stat.ee" className="spamspan">
                    stat@stat.ee
                  </a>
                </div>
              </div>
            </div>
            <div
              id="block-newsletterblock"
              className="block block-we-smaily block-newsletter-block"
            >
              <h2>{newsletter}</h2>

              <div className="block__form">
                <SubscriptionComponent></SubscriptionComponent>
              </div>

              <div className="block__text">
                <p className={"text-left ml-2 subscription-label"}>
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
              className="block--image_block block block-fixed-block-content block-fixed-block-contentfooter-logo  eu-logo-holder"
            >
              <a
                href="http://inwege.cloud.ut.ee/"
                target="_blank"
                rel="noopener noreferrer"
                className={"eu-logo eu-logo-picture"}
              >
                <div className="field field--name-field-image field--type-image field--label-hidden field__items black-bg">
                  <div className="field__item">
                    <img
                      src={require("./resources/eu.jpg")}
                      alt="SF logo"
                      typeof="foaf:Image"
                    />
                  </div>
                </div>
              </a>
              <p className={"h6-stat eu-logo-label"}>{foundationLabel}</p>
            </div>
          </div>

          <div className={"container"}>
            <div className="mt-3  logos-container">
              <div
                id="block-jalusekontaktid"
                className="block block-fixed-block-content block-fixed-block-contentfooter-contacts row align-left partners"
              >
                <p className={"col-md-3 col-sm-6 my-auto partners-text"}>
                  KOOSTÖÖPARTNERID
                </p>

                <div className="field field--label-hidden field__items col-md-8 row">
                  <div className="field__item col-md my-auto">
                    <a
                      href="http://inwege.cloud.ut.ee/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={"eu-logo sf-logo"}
                    >
                      <div className="field field--name-field-image field--type-image field--label-hidden field__items black-bg">
                        <div className="field__item">
                          <img
                            src={require("./resources/stat_logo.jpg")}
                            width="400"
                            height="116"
                            alt="SF logo"
                            typeof="foaf:Image"
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="field__item col-md my-auto">
                    <a
                      href="https://www.ut.ee/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={"eu-logo ut-logo"}
                    >
                      <div className="field field--name-field-image field--type-image field--label-hidden field__items black-bg">
                        <div className="field__item">
                          <img
                            src={require("./resources/ut_logo.png")}
                            width="400"
                            alt="SF logo"
                            typeof="foaf:Image"
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="field__item">
                    <a
                      href="https://taltech.ee/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={"eu-logo"}
                    >
                      <div className="field field--name-field-image field--type-image field--label-hidden field__items black-bg">
                        <div className="field__item">
                          <img
                            src={require("./resources/taltech_logo.png")}
                            className={"footer-logo"}
                            width="120"
                            height="116"
                            alt="SF logo"
                            typeof="foaf:Image"
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDates: () => {
      getDates(dispatch);
    },
    setLang: (lang) => {
      dispatch(setLanguage(lang));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    dates: state.dates,
    language: state.language,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
