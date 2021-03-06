import React, { Component } from "react";
import Dropzone from "./Dropzone";
import Progress from "./Progress";
import { API_URL } from "../../../dictionary/text";
import axios from "axios";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState((prevState) => ({
      files: prevState.files.concat(files),
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach((file) => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open("POST", `${API_URL}/file/${this.props.type}`);
      req.setRequestHeader("Authorization", `${this.props.userToken}`);

      req.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100,
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, "file.xls");

      // req.open("POST", `${API_URL}/file/${this.props.type}`);
      // req.setRequestHeader("Authorization", `${this.props.userToken}`);
      // req.send(formData);
      axios.post(`${API_URL}/file/${this.props.type}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.props.userToken}`,
        },
      });
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0,
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          type="button"
          class="btn btn-danger"
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          type="button"
          class="btn btn-success"
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  render() {
    return (
      <div
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div class="card mb-2">
          <div class="card-header">
            <span className="Title m-2">
              Upload{" "}
              {this.props.type === "job-update" ? "job codes" : this.props.type}{" "}
              file
            </span>
          </div>
          <div class="card-body">
            <div className="Upload m-2">
              <div className="Content">
                <div>
                  <Dropzone
                    onFilesAdded={this.onFilesAdded}
                    disabled={
                      this.state.uploading || this.state.successfullUploaded
                    }
                  />
                  <br></br>
                </div>
                <div className="Files">
                  {this.state.files.map((file) => {
                    return (
                      <div key={file.name} className="row">
                        <span className="Filename">{file.name}</span>
                        {this.renderProgress(file)}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="Actions">{this.renderActions()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
