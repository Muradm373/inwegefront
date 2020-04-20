import React, { Component } from "react";
import { API_URL } from "../../text";
import axios from "axios";

class WageBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: {
        wageCategory19_min: 0,
        wageCategory19_max: 0,
        wageCategory30_min: 0,
        wageCategory30_max: 0,
        compProbability: 0.0,
        meanWageSep19: 0,
        share: 0,
        computerizationRisk: "low",
        replacementsNeeds: "low",
      },
    };
  }

  getWageForecast(isco) {
    const url = `${API_URL}/`;
    axios
      .get(url + "wage-forecast?isco=" + isco)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data.payload);
        this.setState({
          payload: data.payload,
          computerizationRisk: this.calculateComputerizationRisk(
            data.payload.compProbability
          ),
          replacementsNeeds: this.calculateReplacementRisk(data.payload.share),
        });
      });
  }

  componentWillReceiveProps(props) {
    this.getWageForecast(props.isco);
  }

  calculateComputerizationRisk(value) {
    if (value < 0.3) return "low";
    if (value >= 0.3 && value <= 0.7) return "medium";
    else return "high";
  }

  calculateReplacementRisk(value) {
    if (value < 0.2) return "low";
    if (value >= 0.2 && value <= 0.4) return "medium";
    else return "high";
  }

  itemColor(self, grade) {
    if (self === grade) return "#6fff75";
    else return "#FFFFFF";
  }

  render() {
    return (
      <div>
        <div>
          <br />
          <br />
          <p
            style={{
              flex: 5,
              display: "flex",
              textAlign: "center",
            }}
          >
            Estimated wage in 2030 for occupation is between{" "}
            {this.state.payload.wageCategory30_min} and{" "}
            {this.state.payload.wageCategory30_max} EUR. The risk of
            computerization for this occupation is{" "}
            {this.state.computerizationRisk} and the replacements needs due to
            retirement are {this.state.replacementsNeeds}.
            <isindex />
          </p>

          <div className="row" style={{ padding: "50px " }}>
            <div
              className="card m-5 col-sm rounded-0 p-0"
              style={{ width: "15rem" }}
            >
              <div className="p-4 h-3 carditem">
                higer than <br />
                {this.state.payload.wageCategory19_max} EUR
              </div>
              <div
                className="p-4 h-3 carditem"
                style={{ backgroundColor: "#6fff75" }}
              >
                average salary <br />
                {this.state.payload.meanWageSep19} EUR
              </div>
              <div className="p-4 h-3 carditem">
                lower than <br />
                {this.state.payload.wageCategory19_min} EUR
              </div>
            </div>

            <div
              className="card m-5 col-sm rounded-0 p-0"
              style={{ width: "15rem" }}
            >
              <div
                className="p-4 h-3 carditem"
                style={{
                  backgroundColor: this.itemColor(
                    "high",
                    this.state.computerizationRisk
                  ),
                }}
              >
                high risk <br /> of computerization
              </div>
              <div
                className="p-4 h-3 carditem"
                style={{
                  backgroundColor: this.itemColor(
                    "medium",
                    this.state.computerizationRisk
                  ),
                }}
              >
                medium risk
                <br /> of computerization
              </div>
              <div
                className="p-4 h-3 carditem"
                style={{
                  backgroundColor: this.itemColor(
                    "low",
                    this.state.computerizationRisk
                  ),
                }}
              >
                low risk of <br />
                computerization
              </div>
            </div>

            <div
              className="card m-5 col-sm rounded-0 p-0"
              style={{ width: "15rem" }}
            >
              <div
                className="p-4 h-3 carditem"
                style={{
                  backgroundColor: this.itemColor(
                    "high",
                    this.state.replacementsNeeds
                  ),
                }}
              >
                high replacements needs due to retirement
              </div>
              <div
                className="p-4 h-3 carditem"
                style={{
                  backgroundColor: this.itemColor(
                    "medium",
                    this.state.replacementsNeeds
                  ),
                }}
              >
                medium replacements needs due to retirement
              </div>
              <div
                className="p-4 h-3 carditem"
                style={{
                  backgroundColor: this.itemColor(
                    "low",
                    this.state.replacementsNeeds
                  ),
                }}
              >
                low replacements needs due to retirement
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default WageBars;
