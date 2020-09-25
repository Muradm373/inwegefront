import React, { Component } from "react";
import Select from "react-select";
import {
  occupationSelectorPlaceholder, selectOccupation
} from "../../../dictionary/text";

class OccupationSelector extends Component {
  render() {
    return (
      <div className="selector">
        <Select
          onChange={this.props.onChange}
          noOptionsMessage={() => occupationSelectorPlaceholder}
          options={this.props.occupations}
          placeholder={selectOccupation}
          className="occupation-select  mb-md-1"
        ></Select>
      </div>
    );
  }
}

export default OccupationSelector;
