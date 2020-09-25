import React, { Component } from "react";
import {
  API_URL,
  retirement,
  computarization,
  pensionLabel,
  lessMoreLabel,
  levels,
} from "../../dictionary/text";
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
        computerizationRisk: levels[0],
        replacementsNeeds: levels[0],
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
    if(props.isco !== -1)
      this.getWageForecast(props.isco);
    else{
      this.setState({payload: {
        wageCategory19_min: 0,
        wageCategory19_max: 0,
        wageCategory30_min: 0,
        wageCategory30_max: 0,
        compProbability: 0.0,
        meanWageSep19: 0,
        meanWage30: 0,
        share: 0,
        computerizationRisk: levels[0],
        replacementsNeeds: levels[0],
      }})
    }
  }

  calculateComputerizationRisk(value) {
    if (value < 0.3) return levels[0];
    if (value >= 0.3 && value <= 0.7) return levels[1];
    else return levels[2];
  }

  calculateReplacementRisk(value) {
    if (value < 0.2) return levels[0];
    if (value >= 0.2 && value <= 0.4) return levels[1];
    else return levels[2];
  }

  itemColor(self, grade, type) {
    console.log(grade+ " " + self);
    if (levels[self] === grade && grade !== undefined){
      if(type === "computerization")
       return "pns-active-"+self;
      else{
        return "pns-active-comp-"+self;
      }
    }
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

    for (let i = 2; i < 9; i++) {
      items.push(
        <div className={"p-2 carditem " + this.idToColor(id, i)}>
          <p>
            {1000 + (i - 2) * 500} EUR - {1499 + (i - 2) * 500} EUR
          </p>
        </div>
      );
    }
    let result = (
      <div>
        <div className={"p-2 carditem " + this.idToColor(id, 9)}>
          <p>{lessMoreLabel[0]} 4500 EUR</p>
        </div>
        {items}
        <div className={"p-2 carditem " + this.idToColor(id, 1)}>
          <p>{lessMoreLabel[1]} 1000 EUR</p>
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
          {this.state.payload.wageCategory30_max !==
          this.state.payload.wageCategory30_min ? (
            <p
              style={{
                flex: 5,
                display: "flex",
                textAlign: "center",
              }}
            >
              {pensionLabel[0]} {this.state.payload.wageCategory30_min}{" "}
              {pensionLabel[1]} {this.state.payload.wageCategory30_max} EUR.{" "}
              {pensionLabel[2]} {this.state.computerizationRisk}{" "}
              {pensionLabel[3]} {this.state.replacementsNeeds}.
              <isindex />
            </p>
          ) : (
            <></>
          )}

          <div className="row donutHolder`">
            {/* <!-- Wages distribution --> */}

            <div
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
            >
              <div className="p-2 h-3 carditem">2030</div>
              {this.getColor(this.state.payload.meanWage30)}
            </div>
            {/* End of wages */}
            <div
              className="card m-3 col-sm rounded-0 p-0"
              style={{ width: "15rem" }}
            >
              <div
                className={
                  "carditem p-5 " +
                  this.itemColor(2, this.state.computerizationRisk, "computerization")
                }
              >
                <p>{computarization[0]}</p>
              </div>
              <div
                className={
                  "carditem p-5 " +
                  this.itemColor(1, this.state.computerizationRisk, "computerization")
                }
              >
                <p>{computarization[1]}</p>
              </div>
              <div
                className={
                  "carditem p-5 " +
                  this.itemColor(0, this.state.computerizationRisk, "computerization")
                }
              >
                <p>{computarization[2]}</p>
              </div>
            </div>

            <div
              className="card m-3 col-sm rounded-0 p-0"
              style={{ width: "15rem" }}
              data-tip=""
              multiline="true"
            >
              <div
                className={
                  "carditem p-5 " +
                  this.itemColor(0, this.state.replacementsNeeds, "replacement")
                }
              >
                <p>{retirement[2]}</p>
              </div>
              <div
                className={
                  "carditem p-5 " +
                  this.itemColor(1, this.state.replacementsNeeds, "replacement")
                }
              >
                <p>{retirement[1]}</p>
              </div>
              <div
                className={
                  "carditem p-5 " +
                  this.itemColor(2, this.state.replacementsNeeds, "replacement")
                }
              >
                <p>{retirement[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WageBars;
