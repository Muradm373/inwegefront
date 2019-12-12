import React, { Component } from "react";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                  <input
                    name="description"
                    placeholder="Description"
                    className="form-control"
                    style={{ margin: "10px" }}
                    type="text"
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    type="email"
                    style={{ margin: "10px" }}
                  />
                  <textarea
                    name="details"
                    placeholder="Details"
                    className="form-control"
                    type="text"
                    rows="12"
                    style={{ margin: "10px" }}
                  />
                  <button onClick={this.props.handleCloseModal}>Submit</button>
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
