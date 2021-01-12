import axios from "axios";
import { sha256 } from 'js-sha256';
import React, { Component } from "react";
import { API_URL, seed } from "../../dictionary/text";

class Login extends Component {
  state = {
    username: "",
    password: "",
    userToken: "",
    incorrect: false,
    seed: seed
  };
  constructor() {
    super();
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  login() {
    let password = sha256(this.state.password + this.state.seed);
    axios
      .post(`${API_URL}/auth/signin`, {
        name: this.state.username,
        password: password.toUpperCase(),
      })
      .then((data) => {
        this.props.handleCloseModal(data.data.payload.token);
      })
      .catch(() => {
        this.setState({ incorrect: true });
      });
  }

  render() {
    return (
      <div>
        <div
          className="map_selector p-3"
        >
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-center">
                    <h2>Login</h2>
                  </div>
                  {this.state.incorrect ? (
                    <p className="incorrect-password">
                      {" "}
                      Credentials you've entered are not correct. Please try again.
                    </p>
                  ) : (
                    <br></br>
                  )}
                  <input
                    name="username"
                    placeholder="username"
                    className="form-control"
                    style={{ margin: "10px" }}
                    type="text"
                    value={this.state.usrname}
                    onChange={this.handleUsernameChange}
                  />
                  <input
                    name="password"
                    placeholder="password"
                    className="form-control"
                    type="password"
                    style={{ margin: "10px" }}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  <div className="text-center">
                    <button
                      onClick={this.login}
                      className="btn btn-primary  align-items-center "
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
