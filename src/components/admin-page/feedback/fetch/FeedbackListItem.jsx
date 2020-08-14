import React, { Component } from "react";

class FeedbackListItem extends Component {
  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body text-center">
            <h5 className="card-title">{this.props.feedback.description}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {this.props.feedback.email}
            </h6>
            <p className="card-text text-muted">
              {this.props.feedback.details}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbackListItem;
