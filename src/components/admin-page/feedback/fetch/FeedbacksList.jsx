import React, { Component } from "react";
import FeedbackListItem from "./FeedbackListItem";

class FeedbacksList extends Component {
  render() {
    return (
      <div>
        <div className="card-shadow-wide">
          <nav className="feedback-list-nav">
            <ul className="">
             {
                this.props.feedbacks.map((item) => (
                  <FeedbackListItem feedback={item} />
                ))
            } 
            </ul>
          </nav>
          <div className="text-center">
            <button onClick={this.props.refresh} className="btn btn-primary">
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbacksList;
