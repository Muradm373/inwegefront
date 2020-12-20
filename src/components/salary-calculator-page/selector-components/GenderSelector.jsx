import React from "react";
import { genderLabel, defaultGender } from "../../../dictionary/text";
import Select from "react-select";
import {colourStyles} from "./OccupationSelector";


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
        theme={theme => ({
            ...theme,
            colors: {
                ...theme.colors,
                primary: 'black',
            },
            borderRadius: "0px",
            fontSize: "30px"


        })}

        styles={colourStyles}
      ></Select>
    </div>
  );
}

export default GenderSelector;
