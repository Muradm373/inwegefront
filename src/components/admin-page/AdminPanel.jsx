import axios from "axios";
import React, { Component } from "react";
import {  API_URL } from "../../dictionary/text";
import FeedbacksList from "./feedback/fetch/FeedbacksList";
import Login from "./Login";

class AdminPanel extends Component {
  state = {
    lang: "en",
    heroSectionStyle: "hero-section hero-section-color-1",
    loggedIn: false,
    userToken: "",
    feedbacks: [],
  };

  constructor() {
    super();
    this.setUserToken = this.setUserToken.bind(this);
    this.fetchFeedbacks = this.fetchFeedbacks.bind(this);
    this.logout = this.logout.bind(this);
  }

  setUserToken(token) {
    this.setState({ userToken: token, loggedIn: true });
    this.fetchFeedbacks();
  }

  fetchFeedbacks() {
    axios
      .get(`${API_URL}/feedbacks`, {
        headers: {
          Authorization: `Bearer ${this.state.userToken}`,
        },
      })
      .then((data) => {
        this.setState({
          feedbacks: data.data.payload,
        });
      });
  }

  logout() {
    this.setState({ userToken: null, loggedIn: false });
  }

  render() {
    return (
      <div>
        <main id="main" className="center">
          <div className={this.state.heroSectionStyle}>
            {//this.state.loggedIn
             true ? (
              <FeedbacksList
                feedbacks={this.state.feedbacks}
                refresh={this.fetchFeedbacks}
              ></FeedbacksList>
            ) : (
              <Login handleCloseModal={this.setUserToken}></Login>
            )}
          </div>
        </main>

        <a href="/#" className="back-to-top">
          <i className="icofont-simple-up"></i>
        </a>
      </div>
    );
  }
}

export default AdminPanel;
