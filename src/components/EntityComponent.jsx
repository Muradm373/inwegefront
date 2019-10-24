import React, { Component } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries
} from "react-vis";

class EntityComponent extends Component {
  fetchData() {
    if (this.props.entities !== undefined) {
      let entities = this.props.entities;
      let menData = entities[1];
      let womenData = entities[0];
      let maxVal = 0;

      if (menData !== undefined && womenData !== undefined) {
        menData = this.clearData(menData);
        womenData = this.clearData(womenData);
        maxVal = this.getMax(menData, womenData);

        this.XAxis = this.createXAxis(maxVal / 10);

        let menArray = [...new Map(Object.entries(menData)).values()];
        let womenArray = [...new Map(Object.entries(womenData)).values()];

        this.dataMen = this.distributeData(this.XAxis, menArray);
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

  distributeData(XAxis, data) {
    let entities = Array(10).fill(0);
    for (let i = 0; i < 10; i++) {
      entities[Math.floor(data[i] / XAxis[1])]++;
    }

    console.log(entities);
    let dict = [];
    for (let i = 0; i < 10; i++) {
      dict.push({ x: XAxis[i], y: entities[i] });
    }

    return dict;
  }

  render() {
    this.fetchData();
    return (
      <div>
        <XYPlot width={300} height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <AreaSeries
            className="area-series-example"
            curve="curveNatural"
            data={this.dataMen}
          />
        </XYPlot>
      </div>
    );
  }
}

export default EntityComponent;
