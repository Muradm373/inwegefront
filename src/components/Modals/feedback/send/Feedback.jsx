import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../../../../text";

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
      <div>
        <br></br>
        <input
          name="description"
          placeholder="Description"
          className="form-control mb-md-2"
          type="text"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="form-control mb-md-2"
          type="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <textarea
          name="details"
          placeholder="Details"
          className="form-control mb-md-2"
          type="text"
          value={this.state.details}
          onChange={this.handleDetailsChange}
        />
        <button
          onClick={this.sendFeedback}
          className="btn btn-primary mb-md-2 float-right"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default Feedback;
