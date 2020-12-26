import React, { Component } from "react";
import {
  API_URL,
  retirement,
  computarization,
  pensionLabel,
  lessMoreLabel,
  levels, yearLabel, averageWageLabel,
} from "../../dictionary/text";
import {connect} from "react-redux"
import axios from "axios";

class WageBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: {
        wageCategory19Min: 0,
        wageCategory19Max: 0,
        wageCategory30Min: 0,
        wageCategory30Max: 0,
        compProbability: 0.0,
        meanWageSep19: 0,
        meanWage30: 0,
        share: 0,
        computerizationRisk: levels[0],
        replacementsNeeds: levels[0],
      },
      row: true
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
    if (props.isco !== -1) this.getWageForecast(props.isco);
    else {
      this.setState({
        payload: {
          wageCategory19Min: 0,
          wageCategory19Max: 0,
          wageCategory30Min: 0,
          wageCategory30Max: 0,
          compProbability: 0.0,
          meanWageSep19: 0,
          meanWage30: 0,
          share: 0,
          computerizationRisk: levels[0],
          replacementsNeeds: levels[0],
        },
      });
    }


    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }


  resize() {
    this.setState({row: window.innerWidth <= 1100?false:true});
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
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
    if (levels[self] === grade && grade !== undefined) {
      if (type === "computerization") return "pns-active-" + self;
      else {
        return "pns-active-comp-" + self;
      }
    } else return "pns";
  }

  idToColor(itemId, id) {
    if (id === itemId || (itemId > 9 && id === 9) || (itemId <= 0 && id === 1))
      return "pns-salary-active";
    return;
  }

  formatNumber(numberInt){
    let number = numberInt.toString();

    console.log(number + " " + this.props.language)
    let formattedNumber = "";
      for(let i = 1; i <= number.length; i++) {
        formattedNumber = number[number.length - i] + formattedNumber;
        if (i !== number.length && i % 3 === 0) {
          if (this.props.language === "en")
            formattedNumber = "," + formattedNumber;
          else
            formattedNumber = " " + formattedNumber;
        }
      }

    return formattedNumber;
  }

  getColor(salary) {
    let id = Math.round(salary / 500 );
    let items = [];

    for (let i = 2; i < 9; i++) {
      items.push(
        <div className={"p-2 carditem " + this.idToColor(id, i)}>
          <p>
            {this.formatNumber(1000 + (i - 2) * 500)}–{this.formatNumber(1499 + (i - 2) * 500)} €
          </p>
        </div>
      );
    }
    let result = (
      <div>
        <div className={"p-2 carditem " + this.idToColor(id, 1)}>
          <p>{lessMoreLabel[1]} {this.formatNumber(1000)} € </p>
        </div>
        {items}
        <div className={"p-2 carditem " + this.idToColor(id, 9)}>
          <p>{lessMoreLabel[0]} {this.formatNumber(4500)} € {lessMoreLabel[2]}</p>
        </div>
      </div>
    );

    return result;
  }

  render() {
    return (
      <div>
        <div className="bar-holders">
          <br />
          <br />
          {this.state.payload.wageCategory30_max !==
          this.state.payload.wageCategory30_min ? (
            <p
              className={"h4-stat text-left"}
            >
              {pensionLabel[0]} {this.state.payload.wageCategory30_min}€{" "}
              {pensionLabel[1]} {this.state.payload.wageCategory30_max}€ .{" "}
              {pensionLabel[2]} {this.state.computerizationRisk}{" "}
              {pensionLabel[3]} {this.state.replacementsNeeds}.
              <isindex />
            </p>
          ) : (
            <></>
          )}

          <div className={this.state.row?"row":""}>
            {/* <!-- Wages distribution --> */}

              <div
                className="card  col-sm rounded-0 p-0 bar"
                style={{ width: "15rem" }}
            >
              <div className="p-2 carditem">
                <p className={"h4-stat"}>{`${yearLabel} 2019`}</p><p>{`${averageWageLabel} (${this.formatNumber(1404)} €)`}</p>
              </div>
              {this.getColor(this.state.payload.wageCategory19Min)}
            </div>

            {/* 2030 */}
            <div
              className="card  col-sm rounded-0 p-0 bar"
              style={{ width: "15rem" }}
            >
              <div className="p-2 h-3 carditem">
                <p className={"h4-stat"}>{`${yearLabel} 2030`}</p><p>{`${averageWageLabel} (${this.formatNumber(2315)} €)`}</p>
              </div>
              {this.getColor(this.state.payload.wageCategory30Min)}
            </div>
            {/* End of wages */}
            <div
              className="card  col-sm rounded-0 p-0 bar"
              style={{ width: "15rem" }}
            >
              <div
                className={
                  "carditem p-5 " +
                  this.itemColor(
                    2,
                    this.state.computerizationRisk,
                    "computerization"
                  )
                }
              >
                <p>{computarization[0]}</p>
              </div>
              <div
                className={
                  "carditem p-5 " +
                  this.itemColor(
                    1,
                    this.state.computerizationRisk,
                    "computerization"
                  )
                }
              >
                <p>{computarization[1]}</p>
              </div>
              <div
                className={
                  "carditem p-5 " +
                  this.itemColor(
                    0,
                    this.state.computerizationRisk,
                    "computerization"
                  )
                }
              >
                <p>{computarization[2]}</p>
              </div>
            </div>

            <div
              className="card col-sm rounded-0 p-0 bar"
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

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps) (WageBars);
