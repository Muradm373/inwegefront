import React, { Component } from "react";
import FeedbackListItem from "./FeedbackListItem";

class FeedbacksList extends Component {
  render() {
    return (
      <div style={{ width: "65%", marginLeft: "15%", paddingTop: "15%" }}>
        <div
          className="map_selector p-3"
          style={{ marginLeft: "10%", marginTop: "-10%" }}
        >
          <div className="card border-left-primary shadow h-80 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <nav
                    style={{
                      overflow: "scroll",
                      overflowX: "hidden",
                      height: "500px"
                    }}
                  >
                    <ul className="feedbacks-list">
                      {this.props.feedbacks.map(item => (
                        <FeedbackListItem feedback={item} />
                      ))}
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
