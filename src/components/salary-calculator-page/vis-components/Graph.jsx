/* eslint-disable */
import React from "react";
import {
  AreaSeries,
  FlexibleWidthXYPlot,
  Hint,
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  XAxis,
  YAxis,
} from "react-vis";
import {
  genderLabel,
  menColor,
  noDataLabel,
  salary,
  womenColor,
  noOccupationSelectedLabel,
  decileLabel,
} from "../../../dictionary/text";
import { formatNumber, setOccupationData } from "../../../actions/actions";
import { fetchData } from "../entityFunc";
import BarComponent from "./BarComponent";
import { useMediaQuery } from "react-responsive";
import { connect } from "react-redux";

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

export const displayLegends = (menColor, womenColor) => {
  return (
    <div className={"row"}>
      <div
        className="circle-legend"
        style={{
          background: menColor,
        }}
      ></div>
      <p className="graph-legend  h6-stat-gray py-auto">{genderLabel[0]}</p>

      <div
        className="circle-legend ml-4"
        style={{
          background: womenColor,
        }}
      ></div>
      <p className="graph-legend  h6-stat-gray py-auto">{genderLabel[1]}</p>
    </div>
  );
};
const getAmountFormatBasedOnLanguage = (label, language) => {
  if (language === "en") return "€" + label;
  else return label + " €";
};

function Graph(props) {
  let data = fetchData(props.entities);
  let men = data.men;
  let women = data.women;
  let menMean = data.menMean;
  let womenMean = data.womenMean;
  props.setOccupationData(menMean, womenMean);
  let myWage = props.myWage;
  let mean =
    props.myGender === genderLabel[0]
      ? parseInt(data.menMean)
      : parseInt(data.womenMean);

  const isMobile = useMediaQuery({ query: "(max-width: 760px)" });

  return (
    <div className="centered" id="entity" className="graph">
      <BarComponent
        menMean={menMean}
        womenMean={womenMean}
        menColor={menColor}
        womenColor={womenColor}
        occupation={props.occupation}
        region={props.region}
        label={
          props.differenceLabel[0] +
          " " +
          getAmountFormatBasedOnLanguage(
            formatNumber(
              Math.abs(parseInt(menMean) - parseInt(womenMean)),
              props.language
            ),
            props.language
          ) +
          (parseInt(menMean) - parseInt(womenMean) > 0
            ? props.differenceLabel[1]
            : props.differenceLabel[2]) +
          props.differenceLabel[3] +
          props.differenceLabel[4] +
          props.differenceLabel[7]
        }
      />

      <br />
      <br />
      <div className={"y-axis-label h6-stat-gray"}>{decileLabel}</div>
      <FlexibleWidthXYPlot
        height={350}
        margin={{ right: 20 }}
        animation="gentle"
      >
        <VerticalGridLines className="grid-line-vertical" />
        <HorizontalGridLines className="grid-line-horizontal" />
        {men.length !== 0 ? (
          <XAxis
            className="grid-axis"
            tickTotal={isMobile ? 5 : 10}
            tickFormat={(v) => `${formatNumber(v, props.language)}`}
          />
        ) : (
          <></>
        )}
        <YAxis
          className="grid-axis"
          tickTotal={4}
          tickFormat={(v) => `${v * 10}`}
        />

        <AreaSeries
          className="area-series-men"
          curve="curveBasis"
          data={men}
          fill={menColor}
          style={{ opacity: 0.8 }}
          strokeWidth="0"
          stroke={"transparent"}
        />
        <AreaSeries
          className="area-series-women"
          curve="curveBasis"
          data={women}
          style={{ opacity: 0.8 }}
          fill={womenColor}
          strokeWidth="0"
          stroke={"transparent"}
        />

        <Hint
          value={displayMessageLocation(myWage)}
          style={displayMessage(men)}
        >
          {props.occupation !== "null (undefined)" ? (
            <p className="no-data-label ">{noDataLabel}</p>
          ) : (
            <p className={"no-data-label"}>{noOccupationSelectedLabel}</p>
          )}
        </Hint>

        <LineSeries
          data={[
            { x: mean, y: 0 },
            { x: mean, y: 6 },
          ]}
          strokeWidth="1"
          stroke="black"
          opacity="0.6"
        />

        <Hint value={{ x: mean, y: 0 }}>
          <p className="no-data-label text-left h6-stat ml-1">
            {props.myGender === genderLabel[0]
              ? props.differenceLabel[5]
              : props.differenceLabel[4]}
            <br />
            {props.differenceLabel[7]}
          </p>
        </Hint>

        <Hint
          value={{ x: parseInt(myWage === undefined ? 0 : myWage), y: 1 }}
          style={display(myWage, mean, men)}
        >
          <p className="no-data-label text-left h6-stat ml-1">
            {salary[0]}
            <br /> {salary[1]}
          </p>
        </Hint>

        {myWage !== 0 && myWage !== undefined && myWage !== "" ? (
          <LineSeries
            data={[
              { y: 0, x: myWage },
              { y: 6, x: myWage },
            ]}
            strokeWidth="1"
            stroke="black"
            strokeDasharray="7, 3"
          />
        ) : (
          <></>
        )}

        {/*<Hint*/}
        {/*  style={display(myWage, mean, men)}*/}
        {/*  value={{*/}
        {/*    x: parseInt(myWage)/2 + parseInt(mean)/ 2,*/}
        {/*    y: 3,*/}
        {/*  }}*/}
        {/*>*/}

        {/*</Hint>*/}
      </FlexibleWidthXYPlot>
      <div style={display(myWage, mean, men)}>
        <p className="differenceLabel text-left h6-stat graph-salary-label">
          {!isNaN(Math.abs(parseInt(myWage) - parseInt(mean)))
            ? props.differenceLabel[6] +
              " " +
              formatNumber(
                Math.abs(parseInt(myWage) - parseInt(mean)),
                props.language
              ) +
              " €" +
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
          .
        </p>
      </div>

      <div
        className="graph-xaxis-label"
        style={men.length === 0 ? { display: "none" } : {}}
      >
        <p>€</p>
      </div>

      <div className="graph-legends">
        {displayLegends(menColor, womenColor)}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOccupationData: (menMean, womenMean) => {
      dispatch(setOccupationData(menMean, womenMean));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
