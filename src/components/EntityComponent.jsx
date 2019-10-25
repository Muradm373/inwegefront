import React, { Component } from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  LineSeries
} from "react-vis";

class EntityComponent extends Component {
  constructor() {
    super();
    this.menMean = 0;
    this.womenMean = 0;
  }
  fetchData(prop) {
    if (prop !== undefined) {
      let entities = prop;
      let menData = entities[1];
      let womenData = entities[0];
      let maxVal = 0;

      if (menData !== undefined && womenData !== undefined) {
        this.menMean = menData.mean;
        this.womenMean = womenData.mean;
        menData = this.clearData(menData);
        womenData = this.clearData(womenData);
        maxVal = this.getMax(menData, womenData);

        this.XAxis = this.createXAxis(maxVal / 10);

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

    this.men = [];
    this.women = [];
    for (let i = 0; i < 10; i++) {
      this.men.push({ x: XAxis[i], y: entitiesMen[i] });
      this.women.push({ x: XAxis[i], y: entitiesWomen[i] });
    }

    return this.men;
  }

  render() {
    this.fetchData(this.props.entities);

    return (
      <div className="centered-and-flexed">
        <XYPlot width={1000} height={400} animation="gentle">
          <VerticalGridLines
            style={{ stroke: "gray", strokeWidth: 0.5, opacity: 0.5 }}
          />
          <HorizontalGridLines
            style={{ stroke: "gray", strokeWidth: 0.5, opacity: 0.3 }}
          />
          <XAxis tickTotal={10} />
          <YAxis tickTotal={10} />
          <AreaSeries
            className="area-series-women"
            curve="curveNatural"
            data={this.women}
            style={{ opacity: 0.8 }}
            fill="#3e59c8"
          />
          <LineSeries
            data={[{ x: this.womenMean, y: 0 }, { x: this.womenMean, y: 10 }]}
            stroke="black"
          />
          <AreaSeries
            className="area-series-men"
            curve="curveNatural"
            data={this.men}
            fill="#f5c324"
            style={{ opacity: 0.8 }}
            onNearestX={this.hoveredCell}
          />
          <LineSeries
            data={[{ x: this.menMean, y: 0 }, { x: this.menMean, y: 10 }]}
            stroke="black"
            label={this.menMean}
          />
        </XYPlot>
      </div>
    );
  }
}

export default EntityComponent;
