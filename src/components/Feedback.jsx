import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../text";

class Feedback extends Component {
  state = {
    description: "",
    details: "",
    email: ""
  };

  constructor() {
    super();
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
  }

  sendFeedback() {
    axios.post(`${API_URL}/feedback`, {
      email: this.state.email,
      details: this.state.details,
      description: this.state.description
    });

    this.props.handleCloseModal();
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleDetailsChange(event) {
    this.setState({ details: event.target.value });
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
                  <h2>Your feedback</h2>
                  <br></br>
                  <input
                    name="description"
                    placeholder="Description"
                    className="form-control"
                    style={{ margin: "10px" }}
                    type="text"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    type="email"
                    style={{ margin: "10px" }}
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                  <textarea
                    name="details"
                    placeholder="Details"
                    className="form-control"
                    type="text"
                    style={{ margin: "10px" }}
                    value={this.state.details}
                    onChange={this.handleDetailsChange}
                  />
                  <button
                    onClick={this.sendFeedback}
                    className="btn btn-primary"
                  >
                    Submit
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

export default Feedback;
