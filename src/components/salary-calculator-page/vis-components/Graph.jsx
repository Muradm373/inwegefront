/* eslint-disable */
import React from "react";
import {
  AreaSeries, FlexibleWidthXYPlot,
  Highlight, Hint, HorizontalGridLines,
  LineSeries, VerticalGridLines, XAxis,
  YAxis
} from "react-vis";
import {
  genderLabel,
  menColor,
  noDataLabel, salary,
  womenColor
} from "../../../dictionary/text";
import { fetchData } from "../entityFunc";
import BarComponent from "./BarComponent";


const display = (myWage, mean, men) => {
  return Math.abs(parseInt(myWage) - parseInt(mean)) > 50 && men.length !== 0
    ? {}
    : { display: "none" };
};

const displayMessage = (data) => {
  return data.length === 0 ? {} : { display: "none" };
};

const displayMessageLocation = (myWage) => {
  return myWage === undefined || myWage === "0"
    ? { x: -0.65, y: 3 }
    : { x: parseInt(myWage) / 2.75, y: 3 };
};

const displayLegends = (menColor, womenColor) => {
  return (
    <div style={{ width: "100px" }}>
      <div
        className="circle-legend"
        style={{
          background: menColor,
        }}
      ></div>
      <p
        style={{
          textAlign: "left",
          marginTop: "-13px",
          marginLeft: "13px",
          fontSize: "9pt",
          fontFamily: "Roboto",
          fontSize: "14px",
          lineHeight: "18px",
          color: "#595959",
        }}
      >
        {genderLabel[0]}
      </p>

      <div
        className="circle-legend"
        style={{
          background: womenColor,
        }}
      ></div>
      <p
        style={{
          textAlign: "left",
          marginTop: "-13px",
          marginLeft: "13px",
          fontSize: "9pt",
          fontFamily: "Roboto",
          fontSize: "14px",
          lineHeight: "18px",
          color: "#595959",
        }}
      >
        {genderLabel[1]}
      </p>
    </div>
  );
};

function Graph(props) {
  let data = fetchData(props.entities);
  let men = data.men;
  let women = data.women;
  let menMean = data.menMean;
  let womenMean = data.womenMean;
  let myWage = props.myWage;
  let mean =
    props.myGender === genderLabel[0]
      ? parseInt(data.menMean)
      : parseInt(data.womenMean);

  return (
    <div className="centered" id="entity" style={{ marginTop: "15px" }}>
      <BarComponent
        menMean={menMean}
        womenMean={womenMean}
        menColor={menColor}
        womenColor={womenColor}
        occupation={props.occupation}
        label={
          props.differenceLabel[0] +
          " €" +
          Math.abs(parseInt(menMean) - parseInt(womenMean)) +
          (parseInt(menMean) - parseInt(womenMean) > 0
            ? props.differenceLabel[1]
            : props.differenceLabel[2]) +
          props.differenceLabel[3] +
          props.differenceLabel[4] +
          props.differenceLabel[7]
        }
      />

      
      <FlexibleWidthXYPlot height={400} animation="gentle">
        <VerticalGridLines
          style={{ stroke: "black", strokeWidth: 0.5, opacity: 0.5 }}
        />
        <HorizontalGridLines
          style={{ stroke: "black", strokeWidth: 0.5, opacity: 0.3 }}
        />
        <XAxis
          tickTotal={10}
          tickFormat={(v) => `€${v}`}
          style={{ stroke: "black", strokeWidth: 0.5, opacity: 0.9 }}
        />
        <YAxis
          tickTotal={4}
          style={{ stroke: "black", strokeWidth: 0.5, opacity: 0.9 }}
          tickFormat={(v) => `${v * 10}%`}
        />

        <AreaSeries
          className="area-series-women"
          curve="curveBasis"
          data={women}
          style={{ opacity: 0.8 }}
          fill={womenColor}
          strokeWidth="0"
        />

        <AreaSeries
          className="area-series-men"
          curve="curveBasis"
          data={men}
          fill={menColor}
          style={{ opacity: 0.8 }}
          strokeWidth="0"
        />

        <Hint
          value={displayMessageLocation(myWage)}
          style={displayMessage(men)}
        >
          <p style={{ fontSize: "10pt", textAlign: "center", color: "black" }}>
            {noDataLabel}
          </p>
        </Hint>

        <LineSeries
          data={[
            { x: mean, y: 0 },
            { x: mean, y: 5 },
          ]}
          strokeWidth="1"
          stroke="black"
          opacity="0.6"
          strokeDasharray="7, 3"
        />

        <Hint value={{ x: mean, y: 0 }} style={display(myWage, mean, men)}>
          <p style={{ fontSize: "10pt", textAlign: "center", color: "black" }}>
            {props.myGender === genderLabel[0]
              ? props.differenceLabel[5]
              : props.differenceLabel[4]}
            <br />
            {props.differenceLabel[7]}
          </p>
        </Hint>

        <Hint value={{ x: myWage, y: 0 }} style={display(myWage, mean, men)}>
          <p style={{ fontSize: "10pt", textAlign: "center", color: "black" }}>
            {salary[0]}
            <br /> {salary[1]}
          </p>
        </Hint>

        <LineSeries
          data={[
            { y: 0, x: myWage },
            { y: 5, x: myWage },
          ]}
          strokeWidth="1"
          stroke="black"
          strokeDasharray="7, 3"
        />

        <Hint
          style={display(myWage, mean, men)}
          value={{
            x: parseInt(myWage) / 2 + parseInt(mean) / 2,
            y: 3,
          }}
        >
          <p className="differenceLabel">
            {!isNaN(Math.abs(parseInt(myWage) - parseInt(mean)))
              ? props.differenceLabel[6] +
                " €" +
                Math.abs(parseInt(myWage) - parseInt(mean)) +
                (parseInt(myWage) - parseInt(mean) > 0
                  ? props.differenceLabel[1]
                  : props.differenceLabel[2]) +
                props.differenceLabel[3] +
                " " +
                (props.myGender === genderLabel[0]
                  ? props.differenceLabel[5]
                  : props.differenceLabel[4]) +
                " " +
                props.differenceLabel[7]
              : ""}
          </p>
        </Hint>
        <Highlight onBrushEnd="" highlightY="false" highlightX="false" />
        <div style={{ marginTop: "-370px", marginLeft: "90%" }}>
          {displayLegends(menColor, womenColor)}
        </div>
      </FlexibleWidthXYPlot>
    </div>
  );
}

export default Graph;
