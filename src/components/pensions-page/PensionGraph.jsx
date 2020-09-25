import React, { Component } from "react";
import {
  AreaSeries,
  FlexibleWidthXYPlot,
  Highlight,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
} from "react-vis";
import {
  genderLabel,
  menColor,
  womenColor,
  API_URL,
} from "../../dictionary/text";

import axios from "axios";
import BarComponent from "../salary-calculator-page/vis-components/BarComponent";

class PensionGraph extends Component {
  constructor() {
    super();
    this.state = {
      menMean: 0,
      womenMean: 0,
      data: {
        men: [],
        women: [],
      },
    };
  }

  getPensionData(type) {
    const url = `${API_URL}/pension?variable=` + type;

    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        console.log(data.payload.pensionDistributionList);
        this.parseData(data.payload.pensionDistributionList);
      });
  }

  parseData(data) {
    let menClear = this.clearData(data[0]);
    let womenClear = this.clearData(data[1]);
    let menArray = [...new Map(Object.entries(menClear)).values()];
    let womenArray = [...new Map(Object.entries(womenClear)).values()];

    let men = menArray.sort(
      (a, b) => parseFloat(a).toFixed(2) - parseFloat(b).toFixed(2)
    );
    let women = womenArray.sort(
      (a, b) => parseFloat(a).toFixed(2) - parseFloat(b).toFixed(2)
    );

    let menGraphObject = [];
    let womenGraphObject = [];

    for (let i = 0; i < 11; i++) {
      if (i <= 5) {
        menGraphObject.push({ x: parseFloat(men[i]).toFixed(2), y: i });
        womenGraphObject.push({ x: parseFloat(women[i]).toFixed(2), y: i });
      } else {
        menGraphObject.push({ x: parseFloat(men[i]).toFixed(2), y: 10 - i });
        womenGraphObject.push({
          x: parseFloat(women[i]).toFixed(2),
          y: 10 - i,
        });
      }
    }

    this.setState({ menMean: parseFloat(men[5]).toFixed(2),  womenMean: parseFloat(women[5]).toFixed(2) });

    let dataGraph = this.state.data;

    dataGraph = { men: menGraphObject, women: womenGraphObject };

    this.setState({ data: dataGraph });
  }

  clearData(data) {
    let { p1, p2, p3, p4, p5, mean, p6, p7, p8, p9 } = data;

    return { p1, p2, p3, p4, p5, mean, p6, p7, p8, p9, p10: 0 };
  }

  componentDidMount() {
    this.getPensionData(this.props.type);
  }

  displayLegends(menColor, womenColor) {
    return (
      <div style={{ width: "100px" }}>
        <div
          className="circle-legend"
          style={{
            background: menColor,
          }}
        ></div>
        <p className="graph-legend">{genderLabel[0]}</p>

        <div
          className="circle-legend"
          style={{
            background: womenColor,
          }}
        ></div>
        <p className="graph-legend">{genderLabel[1]}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="centered graph" id="bar-component">
        <BarComponent
          menMean={this.state.menMean}
          womenMean={this.state.womenMean}
          menColor={menColor}
          womenColor={womenColor}
          occupation={""}
        />

        <FlexibleWidthXYPlot height={350} animation="gentle">
          <VerticalGridLines className="grid-line-vertical" />
          <HorizontalGridLines className="grid-line-horizontal" />
          <XAxis
            className="grid-axis"
            tickTotal={this.props.tickTotal}
            tickFormat={(v) => `${this.props.unit}${v}`}
          />
          <YAxis
            className="grid-axis"
            tickTotal={4}
            tickFormat={(v) => `${v * 10}%`}
          />

          <AreaSeries
            className="area-series-women"
            curve="curveBasis"
            data={this.state.data.women}
            style={{ opacity: 0.8 }}
            fill={womenColor}
            strokeWidth="0"
          />

          <AreaSeries
            className="area-series-men"
            curve="curveBasis"
            data={this.state.data.men}
            fill={menColor}
            style={{ opacity: 0.8 }}
            strokeWidth="0"
          />

          <Highlight onBrushEnd="" highlightY="false" highlightX="false" />
          <div className="graph-legends">
            {this.displayLegends(menColor, womenColor)}
          </div>
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}

export default PensionGraph;
