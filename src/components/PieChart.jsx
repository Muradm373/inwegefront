import React, { Component } from "react";

import { RadialChart } from "react-vis";

class PieChartComponent extends Component {
  updatePiechart() {
    let data = [];
    if (this.props.mean[0] !== undefined) {
      this.meanMen = this.props.mean[0].mean;
      this.meanWomen = this.props.mean[1].mean;
      this.menColor = this.props.menColor;
      this.womenColor = this.props.womenColor;

      data = [
        {
          angle: this.meanMen,
          radius: 5,
          label: "€" + parseInt(this.meanMen),
          color: this.menColor
        },
        {
          angle: this.meanWomen,
          radius: 5,
          label: "€" + parseInt(this.meanWomen),
          color: this.womenColor
        }
      ];
    }
    return data;
  }

  render() {
    let data = this.updatePiechart();

    return (
      <div>
        <RadialChart
          className={"donut-chart-example"}
          opacity={0.9}
          innerRadius={50}
          radius={55}
          height={200}
          width={250}
          colorType="literal"
          data={data}
          padAngle={0.04}
          showLabels={true}
          labelsRadiusMultiplier={2.2}
        ></RadialChart>
      </div>
    );
  }
}

export default PieChartComponent;
