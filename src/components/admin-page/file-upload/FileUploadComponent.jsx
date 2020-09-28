import React, { Component } from "react";
import Upload from "./Upload";

class FileUploadModal extends Component {
  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <div className="">
          <div
          >
            <div className="row card-shadow-wide" style={{width: "180%"}}>
              <div className="col-md-4">
                <Upload userToken={this.props.userToken} type={"job"}></Upload>
              </div>
              <div className="col-md-4">
                <Upload
                  userToken={this.props.userToken}
                  type={"salary"}
                ></Upload>
              </div>
              <div className="col-md-4">
                <Upload
                  userToken={this.props.userToken}
                  type={"wage-forecast"}
                ></Upload>
              </div>
              <br></br>
              <div className="col-md-4">
                <Upload userToken={this.props.userToken} type={"age"}></Upload>
              </div>
              <div className="col-md-4">
                <Upload
                  userToken={this.props.userToken}
                  type={"pension"}
                ></Upload>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUploadModal;
