import React, { Component } from "react";
import { HorizontalBarSeries, XYPlot, XAxis } from "react-vis";

class BarComponent extends Component {
  render() {
    return (
      <div className="barseries">
        <p> Average salary between men and women</p>
        <XYPlot width={1000} height={130} animation="gentle">
          <XAxis />
          <HorizontalBarSeries
            data={[{ y: 2, x: this.props.menMean }]}
            color={this.props.menColor}
          />
          <HorizontalBarSeries
            data={[{ y: 2, x: this.props.womenMean }]}
            color={this.props.womenColor}
          />
        </XYPlot>
      </div>
    );
  }
}

export default BarComponent;
