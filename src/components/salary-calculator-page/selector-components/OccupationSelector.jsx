import React, { Component } from "react";
import Select from "react-select";
import {
  occupationSelectorPlaceholder, selectOccupation
} from "../../../dictionary/text";


export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white', borderColor: "black" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                    ? "#F8F8F8"
                    : isFocused
                        ? "#F8F8F8"
                        : null,

            fontWeight: isSelected
                    ? "800": null
                    ,

            color: 'black',
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                fontWeight: "900"
            },
        };
    },
};

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
          theme={theme => ({
                  ...theme,
                  colors: {
                      ...theme.colors,
                      primary: 'black',
                  },
                borderRadius: "0px",


          })}

          styles={colourStyles}
        ></Select>
      </div>
    );
  }
}

export default OccupationSelector;
