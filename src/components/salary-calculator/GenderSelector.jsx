import React, { Component } from "react";
import { genderLabel } from "../../text";
import Select from "react-select";

export function GenderSelector(props) {
  return (
    <div className="gender-selector ">
      <Select
        onChange={props.onGenderChange}
        className="gender-select"
        defaultValue={{
          label: genderLabel[0],
          value: genderLabel[0]
        }}
        options={[
          { label: genderLabel[0], value: genderLabel[0] },
          { label: genderLabel[1], value: genderLabel[1] }
        ]}
      ></Select>
    </div>
  );
}

export default GenderSelector;
