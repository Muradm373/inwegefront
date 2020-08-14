import React, { Component } from "react";
import OccupationSelector from "../salary-calculator-page/selector-components/OccupationSelector";
import RegionSelector from "../salary-calculator-page/selector-components/RegionSelector";
import WageBars from "./WageBars";

class WageForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isco: 1111,
      region: "",
    };

    this.onIscoChange = this.onIscoChange.bind(this);
    this.setContent = this.setContent.bind(this);
  }

  onIscoChange = (event) => {
    this.setState({ isco: event.value.iscoValid });
  };

  onRegionChange = (event) => {
    const region = event.value;

    this.setState({ region: region });
  };

  setContent(content) {
    this.setState({ content: content });
  }

  render() {
    return (
      <div className="w-75 text-center mx-auto">
        <div className="wageforecast-component ">
          <RegionSelector onChange={this.onRegionChange} />
          <OccupationSelector
            onChange={this.onIscoChange}
            region={this.state.region}
          />
        </div>
        <WageBars isco={this.state.isco} setContent={this.setContent} />
      </div>
    );
  }
}

export default WageForecast;
