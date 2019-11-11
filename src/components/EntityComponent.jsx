import React, { Component } from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  LineSeries,
  Hint
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

      if (menData !== undefined && womenData !== undefined) {
        this.menMean = menData.mean;
        this.womenMean = womenData.mean;
        menData = this.clearData(menData);
        womenData = this.clearData(womenData);

        let menArray = [...new Map(Object.entries(menData)).values()];
        let womenArray = [...new Map(Object.entries(womenData)).values()];

        this.dataMen = this.distributeData(menArray, womenArray);
      }
    }
  }

  clearData(data) {
    console.log(data);
    let { mean, p1, p2, p3, p4, p6, p7, p8, p9, minVal, maxVal } = data;

    return { p1, p2, p3, p4, mean, p6, p7, p8, p9, minVal, maxVal };
  }

  getMax(men, women) {
    let maxMen = men.maxVal;
    let maxWomen = women.maxVal;
    let max = Math.max(maxMen, maxWomen);
    return max;
  }

  getMin(men, women) {
    let minMen = men.minVal;
    let minWomen = women.minVal;
    let min = Math.max(minMen, minWomen);
    return min;
  }

  distributeData(dataMen, dataWomen) {
    let men = dataMen.sort((a, b) => parseInt(a) - parseInt(b));
    let women = dataWomen.sort((a, b) => parseInt(a) - parseInt(b));

    this.men = [];
    this.women = [];
    for (let i = 0; i < 11; i++) {
      if (i <= 5) {
        this.men.push({ x: parseInt(men[i]), y: i });
        this.women.push({ x: parseInt(women[i]), y: i });
      } else {
        this.men.push({ x: parseInt(men[i]), y: 10 - i });
        this.women.push({ x: parseInt(women[i]), y: 10 - i });
      }
    }

    return this.men;
  }

  render() {
    this.fetchData(this.props.entities);

    return (
      <div className="centered">
        <XYPlot width={1000} height={400} animation="gentle">
          <VerticalGridLines
            style={{ stroke: "gray", strokeWidth: 0.5, opacity: 0.5 }}
          />
          <HorizontalGridLines
            style={{ stroke: "gray", strokeWidth: 0.5, opacity: 0.3 }}
          />
          <XAxis tickTotal={10} tickFormat={v => `€${v}`} />
          <YAxis tickTotal={4} tickFormat={v => `${v * 10}%`} />
          <AreaSeries
            className="area-series-women"
            curve="curveBasis"
            data={this.women}
            style={{ opacity: 0.8 }}
            fill="#C46440"
          />
          <LineSeries
            data={[{ x: this.womenMean, y: 0 }, { x: this.womenMean, y: 5 }]}
            strokeWidth="1"
            stroke="black"
          />
          <AreaSeries
            className="area-series-men"
            curve="curveBasis"
            data={this.men}
            fill="#593D3D"
            style={{ opacity: 0.8 }}
            onNearestX={this.hoveredCell}
          />
          <LineSeries
            data={[{ x: this.menMean, y: 0 }, { x: this.menMean, y: 5 }]}
            strokeWidth="1"
            stroke="black"
            label={this.menMean}
          />

          <LineSeries
            data={[{ x: this.menMean, y: 2 }, { x: this.womenMean, y: 2 }]}
            strokeWidth="1"
            stroke="black"
            strokeDasharray="7, 3"
            label={this.menMean}
          />
          <Hint
            value={{
              x: parseInt(this.menMean) / 2 + parseInt(this.womenMean) / 2,
              y: 3
            }}
          >
            <p style={{ color: "black" }}>
              Wage gap is: <br />€
              {Math.abs(parseInt(this.menMean) - parseInt(this.womenMean))}
            </p>
          </Hint>
        </XYPlot>
        <div style={{ marginLeft: "70%" }}>
          <div class="Column">
            <div class="Row">
              <div class="male"> </div>
              <p class="Column">Male</p>
            </div>
          </div>
          <div class="Column">
            <div class="Row">
              <div class="female"> </div>
              <p class="Column">Female</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EntityComponent;
