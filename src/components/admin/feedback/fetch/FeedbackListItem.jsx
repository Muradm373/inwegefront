import React, { Component } from "react";

class FeedbackListItem extends Component {
  render() {
    return (
      <div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{this.props.feedback.description}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {this.props.feedback.email}
            </h6>
            <p class="card-text">{this.props.feedback.details}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbackListItem;
