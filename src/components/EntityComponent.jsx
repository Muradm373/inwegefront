import React, { Component } from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class EntityComponent extends Component {
  fetchData(prop) {
    if (prop !== undefined) {
      let entities = prop;
      let menData = entities[1];
      let womenData = entities[0];
      //let maxVal = 0;

      if (menData !== undefined && womenData !== undefined) {
        menData = this.clearData(menData);
        womenData = this.clearData(womenData);
        // maxVal = this.getMax(menData, womenData);

        this.XAxis = this.createXAxis(500);

        let menArray = [...new Map(Object.entries(menData)).values()];
        let womenArray = [...new Map(Object.entries(womenData)).values()];

        this.dataMen = this.distributeData(this.XAxis, menArray, womenArray);
      }
    }
  }

  clearData(data) {
    let { mean, p1, p2, p3, p4, p6, p7, p8, p9, minVal, maxVal } = data;

    return { p1, p2, p3, p4, mean, p6, p7, p8, p9, minVal, maxVal };
  }

  createXAxis(step) {
    return Array.from(Array(10), (x, i) => Math.floor(i * step));
  }

  getMax(men, women) {
    let maxMen = men.maxVal;
    let maxWomen = women.maxVal;
    let max = Math.max(maxMen, maxWomen);
    return max;
  }

  distributeData(XAxis, dataMen, dataWomen) {
    let entitiesMen = Array(10).fill(0);
    let entitiesWomen = Array(10).fill(0);
    for (let i = 0; i < 10; i++) {
      entitiesMen[Math.floor(dataMen[i] / XAxis[1])]++;
      entitiesWomen[Math.floor(dataWomen[i] / XAxis[1])]++;
    }

    let dict = [];
    for (let i = 0; i < 10; i++) {
      dict.push({ x: XAxis[i], men: entitiesMen[i], women: entitiesWomen[i] });
    }

    return dict;
  }

  render() {
    this.fetchData(this.props.entities);
    return (
      <div>
        <ComposedChart
          key="composedChart"
          width={1000}
          height={500}
          data={this.dataMen}
          margin={{
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="women"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Area type="monotone" dataKey="men" fill="#FF0000" stroke="#FF0000" />
          {/* <Scatter dataKey="cnt" fill="red" /> */}
        </ComposedChart>
      </div>
    );
  }
}

export default EntityComponent;
