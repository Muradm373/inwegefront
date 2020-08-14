import axios from "axios";
import React, { Component } from "react";
import Select from "react-select";
import { API_URL, selectRegion } from "../../../dictionary/text";

class RegionSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { regions: [] };
  }

  componentDidMount() {
    const url = `${API_URL}/`;
    axios
      .get(url + "regions/")
      .then((response) => response.data)
      .then((data) => {
        let dict = [];
        data.payload.forEach((element) => {
          dict.push({ label: element, value: element });
        });
        this.setState({ regions: dict });
      });
  }

  render() {
    return (
      <div className="selector">
        <Select
          onChange={this.props.onChange}
          options={this.state.regions}
          placeholder={selectRegion}
          className="occupation-select mb-md-1"
        ></Select>
      </div>
    );
  }
}

export default RegionSelector;
