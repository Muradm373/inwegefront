import React, { Component } from "react";
import FeedbackListItem from "./FeedbackListItem";

class FeedbacksList extends Component {
  render() {
    console.log(this.props.feedbacks);
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
                  <nav>
                    <ul className="feedbacks-list">
                      {this.props.feedbacks.map(item => (
                        <FeedbackListItem feedback={item} />
                      ))}
                    </ul>
                  </nav>
                  <button
                    onClick={this.props.handleCloseModal}
                    className="btn btn-primary"
                  >
                    Close
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

export default FeedbacksList;
