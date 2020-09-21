import React, { Component } from "react";
import OccupationSelector from "../salary-calculator-page/selector-components/OccupationSelector";
import WageBars from "./WageBars";
import ReactTooltip from "react-tooltip";
import {API_URL, lng} from "../../dictionary/text";
import axios from "axios";

class WageForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isco: -1,
      region: "Harju maakond",
    };

    this.onIscoChange = this.onIscoChange.bind(this);
    this.setContent = this.setContent.bind(this);
    this.getOccupations("Harju maakond");
  }

  getOccupations(region) {
    const url = `${API_URL}/`;
    axios
      .get(url + "jobs/names?region=" + region + "&lang=" + lng)
      .then((response) =>response.data)
      .then((data) => {
        let names = [];
        names.push({ label: "All occupations", value: "reset" });

        data.payload.forEach((element) => {
          if (element.name !== " ") {
            names.push({
              label: element.name,
              value: element,
            });
          }
        });


        return names;
        //this.setState({ occupations: names });
      });
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
            occupations={this.state.occupations}
            region={this.state.region}
          />
        </div>
        <WageBars isco={this.state.isco} setContent={this.setContent} />
      </div>
    );
  }
}

export default WageForecast;
