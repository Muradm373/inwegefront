import React, { Component } from "react";
import Select, {components } from "react-select";
import {
  occupationSelectorPlaceholder, selectOccupation
} from "../../../dictionary/text";
import arrowDown from "../../../resources/arrow-down.svg"


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
                    ? "900": isFocused ? "900" : null
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

const DropdownIndicator = props => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    <img src={arrowDown} className={props.selectProps.menuIsOpen ? "rotate-180" : ""} alt=""/>
                </components.DropdownIndicator>

            )
        );
};

class OccupationSelector extends Component {

  render() {
    return (
      <div className="select">
        <Select
          onChange={this.props.onChange}
          components={{ DropdownIndicator }}
          noOptionsMessage={() => occupationSelectorPlaceholder}
          options={this.props.occupations}
          placeholder={this.props.placeholder ? this.props.placeholder: selectOccupation}
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
