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
    if (self === grade) return "pns-active";
    else return "pns";
  }

  idToColor(itemId, id) {
    if (id === itemId || (itemId > 9 && id === 9) || (itemId <= 0 && id === 1))
      return "pns-salary-active";
    return;
  }

  getColor(salary) {
    let id = Math.round(salary / 500);
    let items = [];

    for(let i = 2; i < 9; i++){
      items.push(
      <div className={"p-2 carditem " + this.idToColor(id, i)}>
        <p>{1000+ (i-2)*500} EUR - {1499+(i-2)*(500)} EUR</p>
      </div>
    );
    }
    let result = (
      <div>
        <div className={"p-2 carditem " + this.idToColor(id, 9)}>
        <p>Higher than 4500 EUR</p>
        </div>
        {items}
    <div className={"p-2 carditem " + this.idToColor(id, 1)}>
      <p>Less than 1000 EUR</p>
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
            >
              <div className="p-2 carditem">2019</div>
              {this.getColor(this.state.payload.meanWageSep19)}
            </div>

            {/* 2030 */}
            <div
              className="card m-3 col-sm rounded-0 p-0"
              style={{ width: "15rem" }}
              onMouseEnter={() => this.props.setContent(this.state.wageDetails)}
            >
              <div className="p-2 h-3 carditem">2030</div>
              {this.getColor(this.state.payload.meanWage30)}
            </div>
            {/* End of wages */}
            <div
              className="card m-3 col-sm rounded-0 p-0"
              style={{ width: "15rem" }}
              onMouseEnter={() =>
                this.props.setContent(this.state.compiterizationDetails)
              }
            >
              <div
                className={"carditem p-5 " + this.itemColor(
                  "high",
                  this.state.computerizationRisk
                )}
              ><p>
                high risk <br /> of computerization
                </p>
              </div>
              <div
                className={"carditem p-5 " + this.itemColor(
                  "medium",
                  this.state.computerizationRisk
                )}
                
              >
                medium risk
                <br /> of computerization
              </div>
              <div
               className={"carditem p-5 " + this.itemColor(
                "low",
                this.state.computerizationRisk
              )}
              >
                <p>
                low risk of <br />
                computerization
                </p>
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
                className={"carditem p-5 " + this.itemColor(
                  "high",
                  this.state.replacementsNeeds
                )}
              >
                <p>
                high replacements needs due to retirement
                </p>
              </div>
              <div
               className={"carditem p-5 " + this.itemColor(
                "medium",
                this.state.replacementsNeeds
              )}
              >
                <p>
                medium replacements needs due to retirement
                </p>
              </div>
              <div
               className={"carditem p-5 " + this.itemColor(
                "low",
                this.state.replacementsNeeds
              )}
              >
                <p>
                low replacements needs due to retirement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WageBars;
