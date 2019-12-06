/* eslint-disable */
import React, { Component } from "react";

import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  LineSeries,
  Hint
} from "react-vis";
import { fetchData } from "./entityFunc";
import BarComponent from "./BarComponent";

class EntityComponent extends Component {
  render() {
    let data = fetchData(this.props.entities);
    let men = data.men;
    let women = data.women;
    let menMean = data.menMean;
    let womenMean = data.womenMean;
    this.menColor = this.props.menColor;
    this.womenColor = this.props.womenColor;

    return (
      <div className="centered" id="entity">
        <BarComponent
          menMean={menMean}
          womenMean={womenMean}
          menColor={this.menColor}
          womenColor={this.womenColor}
        />

        <FlexibleWidthXYPlot height={400} animation="gentle">
          <div style={{ marginLeft: "80%", marginTop: "-39%" }}>
            <div className="Column">
              <div className="Row">
                <div className="male"> </div>
                <p className="Column">{this.props.genderLabel[0]}</p>
              </div>
            </div>
            <div className="Column">
              <div className="Row">
                <div className="female"> </div>
                <p className="Column">{this.props.genderLabel[1]}</p>
              </div>
            </div>
          </div>
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
            data={women}
            style={{ opacity: 0.8 }}
            fill={this.womenColor}
            strokeWidth="0"
          />

          <AreaSeries
            className="area-series-men"
            curve="curveBasis"
            data={men}
            fill={this.menColor}
            style={{ opacity: 0.8 }}
            strokeWidth="0"
          />
          <LineSeries
            data={[
              { x: menMean, y: 0 },
              { x: menMean, y: 5 }
            ]}
            strokeWidth="1"
            stroke="black"
            strokeDasharray="7, 3"
          />

          <LineSeries
            data={[
              { x: womenMean, y: 0 },
              { x: womenMean, y: 5 }
            ]}
            strokeWidth="1"
            stroke="black"
            strokeDasharray="7, 3"
          />

          <LineSeries
            data={[
              { x: menMean, y: 2 },
              { x: womenMean, y: 2 }
            ]}
            strokeWidth="1"
            stroke="black"
            strokeDasharray="7, 3"
            label={menMean}
          />

          <Hint
            style={
              parseInt(menMean) - parseInt(womenMean) !== 0
                ? {}
                : { display: "none" }
            }
            value={{
              x: parseInt(menMean) / 2 + parseInt(womenMean) / 2,
              y: 3
            }}
          >
            <p
              style={{
                color: "black",
                marginLeft: "-100%"
              }}
            >
              {this.props.differenceLabel[0]} <br />€
              {Math.abs(parseInt(menMean) - parseInt(womenMean))}
              {parseInt(menMean) - parseInt(womenMean) > 0
                ? this.props.differenceLabel[1]
                : this.props.differenceLabel[2]}
              <br />
              {this.props.differenceLabel[3]}
            </p>
          </Hint>
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}

export default EntityComponent;
