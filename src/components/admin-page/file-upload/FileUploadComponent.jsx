import React, { Component } from "react";
import Upload from "./Upload";

class FileUploadModal extends Component {
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
                  <Upload
                    userToken={this.props.userToken}
                    type={"job"}
                  ></Upload>
                  <br></br>
                  <Upload
                    userToken={this.props.userToken}
                    type={"salary"}
                  ></Upload>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUploadModal;
