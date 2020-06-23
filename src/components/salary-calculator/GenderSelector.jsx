import React from "react";
import { genderLabel, defaultGender } from "../../text";
import Select from "react-select";

export function GenderSelector(props) {
  return (
    <div className="selector" style={{ width: "10rem", marginLeft: "5px" }}>
      <Select
        onChange={props.onGenderChange}
        placeholder={defaultGender}
        options={[
          { label: genderLabel[0], value: genderLabel[0] },
          { label: genderLabel[1], value: genderLabel[1] },
        ]}
      ></Select>
    </div>
  );
}

export default GenderSelector;
