import React, { Component } from "react";
import FeedbackListItem from "./FeedbackListItem";

class FeedbacksList extends Component {
  mapFeedbacksIntoList = (feedbacks) => {
    return (
      <>
        {feedbacks.map((item) => (
          <FeedbackListItem feedback={item} />
        ))}
      </>
    );
  };

  render() {
    return (
      <div>
        <div className="card-shadow-wide">
                  <nav className="feedback-list-nav">
                    <ul className="">
                      {this.props.feedback !== undefined ?
                      this.mapFeedbacksIntoList(this.props.feedbacks) :
                      <p>No feedbacks yet</p>
  }
                    </ul>
                  </nav>
                  <div className="text-center">
                    <button
                      onClick={this.props.refresh}
                      className="btn btn-primary"
                    >
                      Refresh
                    </button>
                  </div>
        </div>
      </div>
    );
  }
}

export default FeedbacksList;
