import React from "react";
import { genderLabel, defaultGender } from "../../text";
import Select from "react-select";

export function GenderSelector(props) {
  return (
    <div className="gender-selector ">
      <Select
        onChange={props.onGenderChange}
        className="gender-select"
        placeholder={defaultGender}
        options={[
          { label: genderLabel[0], value: genderLabel[0] },
          { label: genderLabel[1], value: genderLabel[1] }
        ]}
      ></Select>
    </div>
  );
}

export default GenderSelector;
