/* eslint-disable */
import React, { Component } from "react";
import { HorizontalBarSeries, FlexibleWidthXYPlot, XAxis } from "react-vis";
import { averageBetweenMenAndWomen } from "../text";

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
        <p> {averageBetweenMenAndWomen} </p>
        <FlexibleWidthXYPlot height={130} animation="gentle">
          <XAxis tickTotal={10} />
          <HorizontalBarSeries
            data={[{ y: 2, x: this.props.menMean }]}
            color={this.props.menColor}
          />
          <HorizontalBarSeries
            data={[{ y: 2, x: this.props.womenMean }]}
            color={this.props.womenColor}
          />
        </FlexibleWidthXYPlot>
        <p>{this.props.label}</p>
      </div>
    );
  }
}

export default BarComponent;
