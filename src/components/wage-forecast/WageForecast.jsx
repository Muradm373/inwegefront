import React, { Component } from "react";
import WageBars from "./WageBars";
import OccupationSelector from "../salary-calculator/OccupationSelector";
import RegionSelector from "../salary-calculator/RegionSelector";
import ReactTooltip from "react-tooltip";

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
