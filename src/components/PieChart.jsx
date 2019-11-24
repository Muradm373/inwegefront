import React, { Component } from "react";

import { RadialChart } from "react-vis";

class PieChartComponent extends Component {
  state = {
    data: [
      {
        angle: 1000,
        radius: 5,
        label: "€" + 1000,
        color: this.props.womenColor
      },
      {
        angle: 1000,
        radius: 5,
        label: "€" + 1000,
        color: this.props.menColor
      }
    ]
  };
  componentWillReceiveProps() {
    this.updatePiechart();
  }
  updatePiechart() {
    if (this.props.mean[0] !== undefined) {
      this.meanMen = this.props.mean[0].mean;
      this.meanWomen = this.props.mean[1].mean;
      this.menColor = this.props.menColor;
      this.womenColor = this.props.womenColor;

      const data = [
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

      this.setState({ data: data });
    }
  }

  render() {
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
          data={this.state.data}
          animation={true}
          padAngle={0.04}
          showLabels={true}
          labelsRadiusMultiplier={2.2}
        ></RadialChart>

        <p> Average in Estonia</p>
      </div>
    );
  }
}

export default PieChartComponent;
