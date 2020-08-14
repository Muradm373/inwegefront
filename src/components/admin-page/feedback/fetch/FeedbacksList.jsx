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
      <div className="feedback-list-container">
        <div className="map_selector p-3 feedback-list">
          <div className="card border-left-primary shadow h-80 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <nav className="feedback-list-nav">
                    <ul className="feedbacks-list">
                      {this.mapFeedbacksIntoList(this.props.feedbacks)}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbacksList;
