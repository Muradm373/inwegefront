import React, { Component } from "react";
import OccupationSelector from "../salary-calculator-page/selector-components/OccupationSelector";
import RegionSelector from "../salary-calculator-page/selector-components/RegionSelector";
import MapSelector from "../salary-calculator-page/selector-components/map-components/MapSelector";
import WageBars from "./WageBars";
import ReactTooltip from "react-tooltip";

class WageForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isco: -1,
      region: "Harju maakond",
    };

    this.onIscoChange = this.onIscoChange.bind(this);
    this.setContent = this.setContent.bind(this);
  }

  onIscoChange = (event) => {
    if(event.value === "All occupations"){

      this.setState({
      region: "Harju maakond",
      isco: -1
      });
    }else{
      this.setState({ isco: event.value.iscoValid });
    }
  };

  setContent(content) {
    this.setState({ content: content });
  }

  render() {
    return (
      <div className="w-75 text-center mx-auto card-shadow-forecast">
        <div className="wageforecast-component ">
        <div className="map_selector p-3 " style={{ width: "60%", marginLeft:"20%" , marginBottom:"-5%"}}>
                    {/* <MapSelector
                      setTooltipContent={this.setContent}
                    /> */}
                    <ReactTooltip>{this.state.content}</ReactTooltip>
                  </div>  
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
