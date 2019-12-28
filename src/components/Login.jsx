import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../text";

class Login extends Component {
  state = {
    username: "",
    password: "",
    userToken: ""
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
    axios
      .post(`http://inwege-api.cloud.ut.ee/api/auth/signin`, {
        name: this.state.username,
        password: this.state.password
      })
      .then(data => {
        this.props.handleCloseModal(data.data.payload.token);
      });
  }

  render() {
    return (
      <div
        style={{
          position: "fixed",
          textAlign: "center",
          marginLeft: "25%",
          marginTop: "10%",
          height: "80%",
          width: "50%"
        }}
      >
        <div className="col-xl col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <h2>Login</h2>
                  <br></br>
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
                  <button onClick={this.login} className="btn btn-primary">
                    Log in
                  </button>
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
