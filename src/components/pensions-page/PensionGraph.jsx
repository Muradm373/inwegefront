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
  pensionDifferenceLabel2020,
  pensionFractionLabel, decileLabel
} from "../../dictionary/text";
import { connect } from "react-redux";

import axios from "axios";
import PensionBarComponent from "./PensionBarComponent";
import {formatNumber} from "../../actions/actions";

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
      if (i < 5) {
        menGraphObject.push({ x: parseInt(men[i]), y: i });
        womenGraphObject.push({ x: parseInt(women[i]), y: i });
      }else if(i===5){
        menGraphObject.push({ x: parseInt(men[i]), y: i+0.5 });

        womenGraphObject.push({
          x: parseInt(women[i]),
          y: i+0.5,
        });
      }
      else {
        menGraphObject.push({ x: parseInt(men[i]), y: 10 - i });
        womenGraphObject.push({
          x: parseInt(women[i]),
          y: 10 - i,
        });
      }

    }

    this.setState({ menMean: parseFloat(men[5]).toFixed(2),  womenMean: parseFloat(women[5]).toFixed(2) });

    let dataGraph = { men: menGraphObject, women: womenGraphObject };

    this.setState({ data: dataGraph });
  }

  clearData(data) {
    let { p1, p2, p3, p4, p5, mean, p6, p7, p8, p9 } = data;

    return { p1, p2, p3, p4, p5, mean, p6, p7, p8, p9, p10: "0"};
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

  getAmountFormatBasedOnLanguage(label, language){
    if(language === "en")
      return  "€" + label;
    else
      return label +  " €";
  }

  getLabel(type, difference, yearProp, language){
    let year = yearProp === "2020" ? pensionDifferenceLabel2020[0] : pensionDifferenceLabel2020[1] ;

    let label;
    if(type==="pension"){
        label =  (year + pensionDifferenceLabel2020[3] +
       this.getAmountFormatBasedOnLanguage(Math.abs(difference), this.props.language) +
        (difference >= 0 ? pensionDifferenceLabel2020[4]
        : pensionDifferenceLabel2020[5]) +
        " " +
        pensionDifferenceLabel2020[7]);
    }
    if(type==="palk"){
      label = year + pensionDifferenceLabel2020[2] + 
       this.getAmountFormatBasedOnLanguage(difference, this.props.language) +
      (difference >= 0 ? pensionDifferenceLabel2020[4]
      : pensionDifferenceLabel2020[5]) +
      pensionDifferenceLabel2020[6];
    }
    if(type === "am_kesk"){
      label = pensionFractionLabel[0] +
      Math.abs(difference) +
      pensionFractionLabel[2]
      +
      (difference >= 0 ? pensionFractionLabel[3]
      : pensionFractionLabel[4]) 
      +
      pensionFractionLabel[5]

      if(language === "ru")
        return pensionFractionLabel[0] +
            Math.abs(difference)
            +
            (difference >= 0 ? pensionFractionLabel[1]
                : pensionFractionLabel[2]) +
            pensionFractionLabel[3]
    }

    if(type === "am_oma"){
      label = pensionFractionLabel[1] +
      Math.abs(difference) +
      pensionFractionLabel[2]
      +
      (difference >= 0 ? pensionFractionLabel[3]
      : pensionFractionLabel[4]) 
      +
      pensionFractionLabel[5]

      if(language === "ru")
        return pensionFractionLabel[4] +
            Math.abs(difference)
            +
            (difference >= 0 ? pensionFractionLabel[1]
                : pensionFractionLabel[2]) +
            pensionFractionLabel[3]

    }


  return label.replace("2020", this.props.dates.pensionStartDate).replace("2071", this.props.dates.pensionEndDate);

  }

  render() {
    return (
      <div className="centered graph mb-5" id="bar-component">
        <PensionBarComponent
            pension={true}
          menMean={this.state.menMean}
          womenMean={this.state.womenMean}
          menColor={menColor}
          womenColor={womenColor}
          occupation={""}
          label={
          this.getLabel(this.props.type, parseInt(this.state.menMean) - parseInt(this.state.womenMean), this.props.year, this.props.language)
          }
        />


        <br/>
        <br/>

        <div className={"y-axis-label h6-stat-gray"}>
          {decileLabel}
        </div>

        <FlexibleWidthXYPlot height={350} animation="gentle">
          <VerticalGridLines className="grid-line-vertical" />
          <HorizontalGridLines className="grid-line-horizontal" />
          <XAxis
            className="grid-axis"
            tickTotal={parseInt(this.props.tickTotal)}
            tickFormat={(v) => `${formatNumber(v, this.props.language)}`}
          />
          <YAxis
            className="grid-axis"
            tickTotal={4}
            tickFormat={(v) => `${v * 10}`}
          />

          <AreaSeries
              className="area-series-men"
              curve="curveBasis"
              data={this.state.data.men}
              fill={menColor}
              style={{ opacity: 0.8 }}
              strokeWidth="0"
              stroke="transparent"
          />

          <AreaSeries
            className="area-series-women"
            curve="curveBasis"
            data={this.state.data.women}
            style={{ opacity: 0.8 }}
            fill={womenColor}
            strokeWidth="0"
            stroke="transparent"
          />

          <Highlight onBrushEnd="" highlightY="false" highlightX="false" />

        </FlexibleWidthXYPlot>
        <div className="pension-graph-xaxis-label">
          <p>{this.props.unit}</p>
        </div>
        <div className="graph-legends row">
          <div className={"row"}>
            <div
                className="circle-legend"
                style={{
                  background: menColor,
                }}
            ></div>
            <p className="graph-legend">{genderLabel[0]}</p>

            <div
                className="circle-legend ml-3"
                style={{
                  background: womenColor,
                }}
            ></div>
            <p className="graph-legend">{genderLabel[1]}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dates: state.dates,
    language: state.language
  };
};

export default connect(mapStateToProps)(PensionGraph);
