import axios from "axios";
import React, { Component } from "react";
import { API_URL } from "../../dictionary/text";
import FeedbacksList from "./feedback/fetch/FeedbacksList";
import FileUploadComponent from "./file-upload/FileUploadComponent";
import Login from "./Login";

class AdminPanel extends Component {
  state = {
    lang: "en",
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

        console.log(data.data.payload)
      });
  }

  logout() {
    this.setState({ userToken: null, loggedIn: false });
  }

  render() {
    return (
      <div>
        <main>
          <div>
            {this.state.loggedIn ? (
              <div className="row">
                <div className="col-md-4 m-5">
                  <FeedbacksList
                    feedbacks={this.state.feedbacks}
                    refresh={this.fetchFeedbacks}
                  />
                </div>
                <div className="col-md-4">
                  <FileUploadComponent userToken={this.state.userToken} />
                </div>
              </div>
            ) : (
              <div className="w-50 m-auto">
              <Login handleCloseModal={this.setUserToken}/>
              </div>
            )}
          </div>
        </main>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default AdminPanel;
