import React, { Component } from "react";
import {
  selectOccupation,
  lng,
  API_URL,
  occupationSelectorPlaceholder,
} from "../../text";
import axios from "axios";
import Select from "react-select";

class OccupationSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { occupations: [] };
  }

  componentWillReceiveProps(props) {
    this.getOccupations(props.region);
  }

  getOccupations(region) {
    const url = `${API_URL}/`;
    axios
      .get(url + "jobs/names?region=" + region + "&lang=" + lng)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        let names = [];
        names.push({label: "All occupations", value: "reset"});

        data.payload.forEach((element) => {
          if(element.name != " "){
          names.push({
            label: element.name,
            value: element,
          });
        }
        });
        this.setState({ occupations: names });
      });
  }

  render() {
    return (
      <div className="selector">
        <Select
          onChange={this.props.onChange}
          noOptionsMessage={() => occupationSelectorPlaceholder}
          options={this.state.occupations}
          placeholder={selectOccupation}
          className="occupation-select  mb-md-1"
        ></Select>
      </div>
    );
  }
}

export default OccupationSelector;
