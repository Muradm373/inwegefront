import React, { Component } from "react";

import { RadialChart } from "react-vis";

class PieChartComponent extends Component {
  state = {
    data: [
      {
        angle: 1000,
        radius: 5,
        label: "€" + 1000,
        color: "#593D3D"
      },
      {
        angle: 1000,
        radius: 5,
        label: "€" + 1000,
        color: "#C46440"
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

      const data = [
        {
          angle: this.meanMen,
          radius: 5,
          label: "€" + parseInt(this.meanMen),
          color: "#593D3D"
        },
        {
          angle: this.meanWomen,
          radius: 5,
          label: "€" + parseInt(this.meanWomen),
          color: "#C46440"
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
          height={250}
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
