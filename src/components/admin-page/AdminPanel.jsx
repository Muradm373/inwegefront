import React, { Component } from "react";
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
    this.logout = this.logout.bind(this);
  }

  setUserToken(token) {
    this.setState({ userToken: token, loggedIn: true });
    this.fetchFeedbacks();
  }

  logout() {
    this.setState({ userToken: null, loggedIn: false });
  }

  render() {
    return (
      <div>
        <main>
          <div>
            {this.state.loggedIn 
            ? (
              <div className="row">
                <div className="col-md-4 m-5">
                  <FeedbacksList
                    userToken={this.state.userToken}
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
