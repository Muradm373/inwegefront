import React, { Component } from "react";
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class EntityComponent extends Component {
  fetchData() {
    let pureEntities = this.props.entities;

    console.log("Here:");
    this.entities = [];
    if (pureEntities.length !== 0) {
      for (let i = 8; i < 19; i++) {
        this.entities.push({
          name: "" + i - 8,
          man: Object.values(pureEntities[0])[i],
          woman: Object.values(pureEntities[1])[i]
        });
      }
    }
  }

  render() {
    this.fetchData();
    return (
      <ComposedChart
        width={1000}
        height={500}
        data={this.entities}
        margin={{ top: 20, right: 80, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Wage", angle: -90, position: "insideLeft" }} />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />

        <Area type="monotone" dataKey="woman" fill="#FF0000" stroke="#8884d8" />
        <Area type="monotone" dataKey="man" fill="#8884d8" stroke="#8884d8" />
      </ComposedChart>
    );
  }
}

export default EntityComponent;
