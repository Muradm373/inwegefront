import React, { Component } from "react";

import { tabs, APP_NAME, main, about, API_URL } from "../../text";
import Feedback from "../salary-calculator/Feedback";
import FeedbacksList from "./feedback/fetch/FeedbacksList";
import Login from "./Login";
import axios from "axios";

class AdminPanel extends Component {
  state = {
    lang: "en",
    heroSectionStyle: "hero-section hero-section-color-1",
    loggedIn: false,
    userToken: "",
    feedbacks: []
  };

  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.handleOpenFeedbacksModal = this.handleOpenFeedbacksModal.bind(this);
    this.logout = this.logout.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  handleLogin(token) {
    this.setState({ userToken: token, loggedIn: true });
    this.handleOpenFeedbacksModal();
  }

  handleOpenFeedbacksModal() {
    axios
      .get(`${API_URL}/feedbacks`, {
        headers: {
          Authorization: `Bearer ${this.state.userToken}`
        }
      })
      .then(data => {
        this.setState({
          feedbacks: data.data.payload
        });
      });
  }

  logout() {
    this.setState({ userToken: null, loggedIn: false });
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  showFeedbacks() {
    if (this.state.loggedIn) {
      return (
        <FeedbacksList
          feedbacks={this.state.feedbacks}
          refresh={this.handleOpenFeedbacksModal}
        ></FeedbacksList>
      );
    }
    return <Login handleCloseModal={this.handleLogin}></Login>;
  }

  render() {
    return (
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
                    href={e => e.preventDefault()}
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
                    {this.state.loggedIn ? (
                      <li onClick={this.logout}>
                        <a href="#">Log out</a>
                      </li>
                    ) : (
                      <li>
                        <a href="#">Log in</a>
                      </li>
                    )}
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
            <div className="wave"></div>

            {this.showFeedbacks()}
          </div>
        </main>
        <footer className="footer" role="contentinfo">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <h3>
                  {main[1]} {APP_NAME}
                </h3>
                <p
                  className="text-left"
                  ref={el => {
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

export default AdminPanel;
