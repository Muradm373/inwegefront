import React, { Component } from "react";
import { selectRegion, API_URL } from "../../text";
import Select from "react-select";
import axios from "axios";

class RegionSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { regions: [] };
  }

  componentDidMount() {
    const url = `${API_URL}/`;
    axios
      .get(url + "regions/")
      .then(response => response.data)
      .then(data => {
        let dict = [];
        data.payload.forEach(element => {
          dict.push({ label: element, value: element });
        });
        this.setState({ regions: dict });
      });
  }

  render() {
    return (
      <Select
        onChange={this.props.onChange}
        options={this.state.regions}
        placeholder={selectRegion}
        className="region-select mb-md-1"
      ></Select>
    );
  }
}

export default RegionSelector;