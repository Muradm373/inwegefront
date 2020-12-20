/* eslint-disable */
import React, { Component } from "react";
import {
  HorizontalBarSeries,
  FlexibleWidthXYPlot,
  XAxis,
  LabelSeries,
} from "react-vis";
import { averageBetweenMenAndWomen, quarter } from "../../../dictionary/text";
import {connect} from "react-redux";

class BarComponent extends Component {

  render() {
    return (
        <div>
          <div className={"bar-series-label"} style={{display: this.props.pension ? "none" : "block"}}>
            <p className={"h4-stat text-left ml-3"}> {`${averageBetweenMenAndWomen} | ${this.props.dates.salaryEntityDateQuarter} ${quarter} ${this.props.dates.salaryEntityDate}`} </p>
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
        {this.props.occupation !== "null (null)" && this.props.occupation !== ""
            ?
        <div className={"bar-series-label"}>

        <p className={"body-stat ml-3"}>{`${this.props.occupation }. ${this.props.region}`}</p></div>
            :
          <div className={"bar-series-label"}>
          <p className={"body-stat ml-3"}>{this.props.region}</p></div>
      }
        <FlexibleWidthXYPlot height={130} animation="gentle" style={{marginLeft: "-22px"}}>
          {this.props.language === "en" ? <XAxis
              style={{ stroke: "black", strokeWidth: 0.5, opacity: 1 }}
              tickTotal={7}
              title={"euro"}
                />:
              <XAxis
                  style={{stroke: "black", strokeWidth: 0.5, opacity: 1,
                    fontFamily: "Roboto",
                    fontWeight: "normal",
                    fontSize: "13px",
                    lineHeight: "16px",
                    color: "#595959"
                  }}
                  tickTotal={7}
                  tickFormat={d => {
                    return d;
                  }
                  }
                  title={"€"}

              />
          }

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
                label: this.props.menMean.toString(),
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
                label: this.props.womenMean.toString(),
                yOffset: 20,
              },
            ]}
            labelAnchorY="middleAlignment"
          />
        </FlexibleWidthXYPlot>
        <p className={"body-stat ml-3"}>{this.props.label}</p>
      </div>
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(BarComponent);
