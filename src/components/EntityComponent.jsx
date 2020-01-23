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
import BarComponent from "./graph-representation/BarComponent";
import { genderLabel, salary } from "../text";

class EntityComponent extends Component {
  render() {
    let data = fetchData(this.props.entities);
    let men = data.men;
    let women = data.women;
    let menMean = data.menMean;
    let womenMean = data.womenMean;
    let myWage = this.props.myWage;
    let mean =
      this.props.myGender === genderLabel[0]
        ? parseInt(data.menMean)
        : parseInt(data.womenMean);
    this.menColor = this.props.menColor;
    this.womenColor = this.props.womenColor;

    return (
      <div className="centered" id="entity">
        <BarComponent
          menMean={menMean}
          womenMean={womenMean}
          menColor={this.menColor}
          womenColor={this.womenColor}
          occupation={this.props.occupation}
          label={
            this.props.differenceLabel[0] +
            " €" +
            Math.abs(parseInt(menMean) - parseInt(womenMean)) +
            (parseInt(menMean) - parseInt(womenMean) > 0
              ? this.props.differenceLabel[1]
              : this.props.differenceLabel[2]) +
            this.props.differenceLabel[3] +
            this.props.differenceLabel[4] +
            this.props.differenceLabel[7]
          }
        />

        <div className="genderTicks">
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
        <FlexibleWidthXYPlot height={400} animation="gentle">
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
              { x: mean, y: 0 },
              { x: mean, y: 5 }
            ]}
            strokeWidth="1"
            stroke="black"
            strokeDasharray="7, 3"
          />

          <Hint
            value={{ x: mean, y: 0 }}
            style={
              parseInt(menMean) - parseInt(womenMean) !== 0
                ? {}
                : { display: "none" }
            }
          >
            <p
              style={{ fontSize: "10pt", textAlign: "center", color: "black" }}
            >
              {this.props.myGender === genderLabel[0]
                ? this.props.differenceLabel[5]
                : this.props.differenceLabel[4]}
              <br />
              {this.props.differenceLabel[7]}
            </p>
          </Hint>

          <Hint
            value={{ x: myWage, y: 0 }}
            style={
              parseInt(menMean) - parseInt(womenMean) !== 0
                ? {}
                : { display: "none" }
            }
          >
            <p
              style={{ fontSize: "10pt", textAlign: "center", color: "black" }}
            >
              {salary[0]}
              <br /> {salary[1]}
            </p>
          </Hint>

          <LineSeries
            data={[
              { x: myWage, y: 0 },
              { x: myWage, y: 5 }
            ]}
            strokeWidth="1"
            stroke="black"
            strokeDasharray="7, 3"
          />

          <LineSeries
            data={[
              { x: myWage, y: 2 },
              { x: mean, y: 2 }
            ]}
            strokeWidth="1"
            stroke="black"
            strokeDasharray="7, 3"
          />

          <Hint
            style={
              parseInt(menMean) - parseInt(womenMean) !== 0
                ? {}
                : { display: "none" }
            }
            value={{
              x: parseInt(menMean) / 8 + parseInt(womenMean) / 8,
              y: 3
            }}
          >
            <p className="differenceLabel">
              {!isNaN(Math.abs(parseInt(myWage) - parseInt(mean)))
                ? this.props.differenceLabel[6] +
                  " €" +
                  Math.abs(parseInt(myWage) - parseInt(mean)) +
                  (parseInt(myWage) - parseInt(mean) > 0
                    ? this.props.differenceLabel[1]
                    : this.props.differenceLabel[2]) +
                  this.props.differenceLabel[3] +
                  " " +
                  (this.props.myGender === genderLabel[0]
                    ? this.props.differenceLabel[5]
                    : this.props.differenceLabel[4]) +
                  " " +
                  this.props.differenceLabel[7]
                : ""}
            </p>
          </Hint>
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}

export default EntityComponent;
