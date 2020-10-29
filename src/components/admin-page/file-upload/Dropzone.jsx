import React, { Component } from "react";
import "../../../css/styles/Dropzone.css";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false };
    this.fileInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  }

  onDragOver(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    this.setState({ hightlight: true });
  }

  onDragLeave(event) {
    this.setState({ hightlight: false });
  }

  onDrop(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  render() {
    return (
      <>
        
        <div class="input-group-sm">
          <div class="input-group-prepend">
          </div>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="inputGroupFile01"
              ref={this.fileInputRef}
              onChange={this.onFilesAdded}
              aria-describedby="inputGroupFileAddon01"
            />
            <label class="custom-file-label" for="inputGroupFile01" id="inputGroup-sizing-sm">
              Choose file
            </label>
          </div>
        </div>
      </>
    );
  }
}

export default Dropzone;
