import React, { Component } from "react";

import { PieChart, Pie, Cell } from "recharts";

class PieChartComponent extends Component {
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
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
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

    this.data = [
      { name: "Group A", value: 400 },
      { name: "Group B", value: 300 }
    ];
    this.COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    this.RADIAN = Math.PI / 180;
    return (
      <div>
        <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
          <Pie
            data={this.data}
            dataKey="value"
            cx={220}
            cy={100}
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={1}
            labelLine={false}
            label={this.renderCustomizedLabel}
          >
            {this.data.map((entry, index) => (
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
