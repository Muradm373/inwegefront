import React, { Component } from "react";
import { API_URL } from "../../text";
import axios from "axios";
import ReactTooltip from "react-tooltip";

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
        meanWage30: 0,
        share: 0,
        computerizationRisk: "low",
        replacementsNeeds: "low",
      },
      replacementDetails:
        "Replacement needs due to retirement correspond to the share of people aged 55+ in each occupation. Occupations were classified in three categories: with low (share of workers 55+ in occupation is less than 20%), medium  (share is in range 20% – 40%) and  high (higher than 40%) replacement needs.",
      compiterizationDetails:
        "Risk of computerization was calculated based on probabilities of computerization from paper Frey C.B., Osborne M.A. “The future of employment: How susceptible are jobs to computerisation?” (Technological Forecasting & Social Change, 114 (2017): 254 – 280). Occupations were categorized into three groups: with low (less than 0.3), medium (0.3 - 0.7) and high (higher than 0.7) probability of automation.",
      wageDetails:
        "Wage forecast is based on the growth rates of wages in each occupation adjusted on the average country monthly wage in 2030 (forecast of Ministry of Finance). ",
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

  idToColor(itemId, id) {
    if (id === itemId || (itemId > 9 && id == 9) || (itemId <= 0 && id == 1))
      return { backgroundColor: "#6fff75" };
    return;
  }

  getColor(salary) {
    let id = Math.round(salary / 500);
    let result = (
      <div>
        <div className="p-2 carditem" style={this.idToColor(id, 9)}>
          Higher than 4500 EUR
        </div>
        <div className="p-2 carditem" style={this.idToColor(id, 8)}>
          4000-4500 EUR
        </div>
        <div className="p-2 carditem" style={this.idToColor(id, 7)}>
          3500-3999 EUR
        </div>
        <div className="p-2 carditem" style={this.idToColor(id, 6)}>
          3000-3499 EUR
        </div>
        <div className="p-2 carditem" style={this.idToColor(id, 5)}>
          2500-2999 EUR
        </div>
        <div className="p-2 carditem" style={this.idToColor(id, 4)}>
          2000-2499 EUR
        </div>
        <div className="p-2 carditem" style={this.idToColor(id, 3)}>
          1500-1999 EUR
        </div>
        <div className="p-2 carditem" style={this.idToColor(id, 2)}>
          1000-1499 EUR
        </div>
        <div className="p-2 carditem" style={this.idToColor(id, 1)}>
          Less than 1000 EUR
        </div>
      </div>
    );

    return result;
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

          <div className="row donutHolder`">
            {/* <!-- Wages distribution --> */}

            <div
              onMouseEnter={() => this.props.setContent(this.state.wageDetails)}
              className="card m-3 col-sm rounded-0 p-0"
              style={{ width: "15rem" }}
              // data-tip=""
            >
              <div className="p-2 carditem">2019</div>
              {this.getColor(this.state.payload.meanWageSep19)}
            </div>

            {/* 2030 */}
            <div
              className="card m-3 col-sm rounded-0 p-0"
              style={{ width: "15rem" }}
              // data-tip=""
              onMouseEnter={() => this.props.setContent(this.state.wageDetails)}
            >
              <div className="p-2 h-3 carditem">2030</div>
              {this.getColor(this.state.payload.meanWage30)}
            </div>
            {/* End of wages */}
            <div
              className="card m-3 col-sm rounded-0 p-0"
              style={{ width: "15rem" }}
              // data-tip=""
              onMouseEnter={() =>
                this.props.setContent(this.state.compiterizationDetails)
              }
            >
              <div
                className="carditem p-5"
                style={{
                  backgroundColor: this.itemColor(
                    "high",
                    this.state.computerizationRisk
                  ),
                  height: "33.33%",
                }}
              >
                high risk <br /> of computerization
              </div>
              <div
                className="carditem p-5"
                style={{
                  backgroundColor: this.itemColor(
                    "medium",
                    this.state.computerizationRisk
                  ),
                  height: "33.33%",
                }}
              >
                medium risk
                <br /> of computerization
              </div>
              <div
                className="carditem p-5"
                style={{
                  backgroundColor: this.itemColor(
                    "low",
                    this.state.computerizationRisk
                  ),
                  height: "33.33%",
                }}
              >
                low risk of <br />
                computerization
              </div>
            </div>

            <div
              className="card m-3 col-sm rounded-0 p-0"
              style={{ width: "15rem" }}
              // data-tip=""
              multiline="true"
              onMouseEnter={() =>
                this.props.setContent(this.state.replacementDetails)
              }
            >
              <div
                className="p-5 carditem"
                style={{
                  backgroundColor: this.itemColor(
                    "high",
                    this.state.replacementsNeeds
                  ),
                  height: "33.33%",
                }}
              >
                high replacements needs due to retirement
              </div>
              <div
                className="p-5 carditem"
                style={{
                  backgroundColor: this.itemColor(
                    "medium",
                    this.state.replacementsNeeds
                  ),
                  height: "33.33%",
                }}
              >
                medium replacements needs due to retirement
              </div>
              <div
                className="p-5 carditem"
                style={{
                  backgroundColor: this.itemColor(
                    "low",
                    this.state.replacementsNeeds
                  ),
                  height: "33.33%",
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
