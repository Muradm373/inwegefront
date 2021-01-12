import React, { Component } from "react";
import OccupationSelector from "../salary-calculator-page/selector-components/OccupationSelector";
import WageBars from "./WageBars";
import { getOccupations } from "../../actions/actions";
import { connect } from "react-redux";
import {wageForecastText} from "../../dictionary/text"

class WageForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isco: -1,
      region: "Harju maakond",
    };

    this.onIscoChange = this.onIscoChange.bind(this);
    this.setContent = this.setContent.bind(this);
    this.props.getOccupations("Harju maakond");
  }

  onIscoChange = (event) => {
    if (event.value === "All occupations") {
      this.setState({
        region: "Harju maakond",
        isco: -1,
      });
    } else {
      this.setState({ isco: event.value.iscoValid });
    }
  };

  setContent(content) {
    this.setState({ content: content });
  }

  render() {
    return (
      <div className="text-center mx-auto card-shadow-forecast mb-5 m-3 wage-forecast">
        <div className="wageforecast-component ">
          <div
            id="methodology-component"
            className="block-page-title-block"
          >
            <p className="text-justify">
              {wageForecastText}
            </p>
            <br></br>
          </div>
          <OccupationSelector
            onChange={this.onIscoChange}
            occupations={this.props.occupations}
          />
        </div>
        <WageBars isco={this.state.isco} setContent={this.setContent} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    occupations: state.occupations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOccupations: (region) => {
      getOccupations(dispatch, region);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WageForecast);
