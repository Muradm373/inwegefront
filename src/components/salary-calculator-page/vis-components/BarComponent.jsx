/* eslint-disable */
import React, { Component } from "react";
import {
  HorizontalBarSeries,
  FlexibleWidthXYPlot,
  XAxis,
  LabelSeries,
} from "react-vis";
import { averageBetweenMenAndWomen } from "../../../dictionary/text";

class BarComponent extends Component {
  render() {
    return (
      <div
        className="barseries"
        style={{ width: "80%", marginLeft: "10%" }}
        style={
          parseInt(this.props.menMean) - parseInt(this.props.womenMean) !== 0
            ? {}
            : { display: "none" }
        }
      >
        <p> {averageBetweenMenAndWomen + this.props.occupation} </p>
        <FlexibleWidthXYPlot height={130} animation="gentle">
          <XAxis
            tickTotal={10}
            style={{ stroke: "black", strokeWidth: 0.5, opacity: 1 }}
          />
          <HorizontalBarSeries
            data={[{ y: 2, x: this.props.menMean }]}
            color={this.props.menColor}
          />
          <LabelSeries
            style={{ fill: "white", fontSize: "15px", opacity: "0.8" }}
            data={[
              {
                y: 2,
                x: this.props.menMean * 0.5,
                label: "€" + this.props.menMean,
                yOffset: -15,
              },
            ]}
            labelAnchorY="middleAlignment"
          />
          <HorizontalBarSeries
            data={[{ y: 2, x: this.props.womenMean }]}
            color={this.props.womenColor}
          />

          <LabelSeries
            style={{ fill: "white", fontSize: "15px", opacity: "0.8" }}
            data={[
              {
                y: 2,
                x: this.props.menMean * 0.5,
                label: "€" + this.props.womenMean,
                yOffset: 20,
              },
            ]}
            labelAnchorY="middleAlignment"
          />
        </FlexibleWidthXYPlot>
        <p>{this.props.label}</p>
      </div>
    );
  }
}

export default BarComponent;