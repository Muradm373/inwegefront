/* eslint-disable */
import React, { Component } from "react";
import {
  HorizontalBarSeries,
  FlexibleWidthXYPlot,
  XAxis,
  LabelSeries,
} from "react-vis";
import {
  averageBetweenMenAndWomen,
  quarter,
  overall,
} from "../../../dictionary/text";
import { connect } from "react-redux";
import { translateCounty } from "../entityFunc";
import {
  formatNumber,
  getOccupations,
  getSalaryEntities,
  setGender,
  setWage,
} from "../../../actions/actions";

class BarComponent extends Component {
  decapitalize (s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toLocaleLowerCase() + s.slice(1)
  }


  render() {
    return (
      <div>
        <div
          className={"bar-series-label"}
          style={{ display: this.props.pension ? "none" : "block" }}
        >
          <p className={"h4-stat text-left ml-3"}>
            {" "}
            {`${averageBetweenMenAndWomen} | ${this.props.dates.salaryEntityDateQuarter} ${quarter} ${this.props.dates.salaryEntityDate}`}{" "}
          </p>
        </div>
        <div
          className="barseries h4-stat"
          style={{ width: "80%", marginLeft: "10%" }}
          style={
            parseInt(this.props.menMean) - parseInt(this.props.womenMean) !== 0
              ? {}
              : { display: "none" }
          }
        >
          {this.props.occupation !== "null (null)" &&
          this.props.occupation !== "" &&
          this.props.occupation !== "null (undefined)" ? (
            <div className={"bar-series-label"}>
                           <p className={"body-stat ml-3"}>{`${this.props.occupation}${
                this.props.region !== overall && this.props.region !== ""
                  ? (", " + translateCounty(this.props.region, this.props.language))
                  : (", " + this.decapitalize(overall))
              }`}</p>
            </div>
          ) : (
            <div className={"bar-series-label"}>
              <p className={"body-stat ml-3"}>
                {translateCounty(this.props.region, this.props.language)}
              </p>
            </div>
          )}
          <FlexibleWidthXYPlot
            height={130}
            animation="gentle"
            style={{ marginLeft: "-22px" }}
          >
            {this.props.language === "en" ? (
              <XAxis
                style={{ stroke: "black", strokeWidth: 0.5, opacity: 1 }}
                tickTotal={7}
              />
            ) : (
              <XAxis
                style={{
                  stroke: "black",
                  strokeWidth: 0.5,
                  opacity: 1,
                  fontFamily: "Roboto",
                  fontWeight: "normal",
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#595959",
                }}
                tickTotal={7}
                tickFormat={(d) => {
                  return d;
                }}
              />
            )}

            <HorizontalBarSeries
              data={[{ y: 2, x: parseInt(this.props.menMean) }]}
              color={this.props.menColor}
            />
            <LabelSeries
              style={{ fill: "white", fontSize: "15px", opacity: "0.8" }}
              data={[
                {
                  y: 2,
                  x: this.props.menMean * 0.5,
                  label: formatNumber(
                    this.props.menMean.toString(),
                    this.props.language
                  ),
                  yOffset: -15,
                },
              ]}
              labelAnchorY="middleAlignment"
            />
            <HorizontalBarSeries
              data={[{ y: 2, x: parseInt(this.props.womenMean) }]}
              color={this.props.womenColor}
            />

            <LabelSeries
              style={{ fill: "white", fontSize: "15px", opacity: "0.8" }}
              data={[
                {
                  y: 2,
                  x: this.props.menMean * 0.5,
                  label: formatNumber(
                    this.props.womenMean.toString(),
                    this.props.language
                  ),
                  yOffset: 20,
                },
              ]}
              labelAnchorY="middleAlignment"
            />
          </FlexibleWidthXYPlot>
          <div className="xaxis-tick body-stat">
          <p>{"€"}</p>
        </div>
          <p className={"body-stat ml-3"}>{this.props.label}.</p>
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

export default connect(mapStateToProps)(BarComponent);
