import React, { Component } from "react";

import { PieChart, Pie, Cell } from "recharts";

class PieChartComponent extends Component {
  state = {
    data: [{ name: "Men", value: 100 }, { name: "Women", value: 150 }]
  };

  componentWillReceiveProps() {
    this.updatePiechart();
  }

  updatePiechart() {
    if (this.props.mean[0] !== undefined) {
      this.meanMen = this.props.mean[0].mean;
      this.meanWomen = this.props.mean[1].mean;

      const data = [
        { name: "Men", value: this.meanMen },
        { name: "Women", value: this.meanWomen }
      ];

      this.setState({ data: data });
    }
  }

  render() {
    this.renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
      const x = cx + radius * Math.cos(-midAngle * this.RADIAN);
      const y = cy + radius * Math.sin(-midAngle * this.RADIAN);
      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    this.COLORS = ["#593D3D", "#C46440"];
    this.RADIAN = Math.PI / 180;

    return (
      <div>
        <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
          <text x={220} y={230} textAnchor="middle" dominantBaseline="middle">
            Average in Estonia
          </text>
          <Pie
            style={{ opacity: 0.7 }}
            data={this.state.data}
            dataKey="value"
            cx={220}
            cy={120}
            innerRadius={45}
            outerRadius={80}
            isAnimationActive={false}
            fill="#8884d8"
            paddingAngle={1}
            labelLine={false}
            label={this.renderCustomizedLabel}
          >
            {this.state.data.map((entry, index) => (
              <Cell
                key={index}
                fill={this.COLORS[index % this.COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  }
}

export default PieChartComponent;
