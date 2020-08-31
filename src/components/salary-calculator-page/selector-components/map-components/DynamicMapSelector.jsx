import React, { memo, Component } from "react";
import { API_URL, overall, noData } from "../../../../dictionary/text";
import { geoCentroid } from "d3-geo";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
import ee from "../../../../resources/ee.json";
import axios from "axios";
import {
  genderLabel,
  genderWageGap,
  averageWage,
  medianWage,
} from "../../../../dictionary/text";

const replaceMaakond = (maakond) => {
  return maakond.replace("maakond", "");
};

class DynamicMapSelector extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: "",
      averages: [],
      occupation: props.occupation,
      color: props.mapElementColor,
      mapType: "Gender Wage Gap",
      isco: "",
      median: "",
      average: "",
      genderGap: "",
      groups: [],
      colors: ["#CCB0FF", "#A476F9", "#6939C5", "#3F1A84", "#301563"],
      legendColors: ["#CCB0FF", "#A476F9", "#6939C5", "#3F1A84", "#301563"],
      noDataColor: "#eeeeee",
    };

    this.getMeansForAllRegions = this.getMeansForAllRegions.bind(this);
    this.getMeanForRegion = this.getMeanForRegion.bind(this);
    this.setColor = this.setColor.bind(this);
    this.getMeansForAllRegions = this.getMeansForAllRegions.bind(this);

    this.state.isco = props.isco;

    this.getMeansForAllRegions("");
    this.getMeanForRegion("Harju maakond");
  }

  componentWillReceiveProps(props) {
    this.state.isco = props.isco;

    this.getMeansForAllRegions(this.state.mapType);
  }

  getMeansForAllRegions(data) {
    var url_dataType = "";
    var isco = this.state.isco;
    url_dataType = "regions/wage-gap";



    if (data === "Median Wage") {
      url_dataType = "regions/median";
    }
    if (data === "Median Wage" && isco !== "") {
      url_dataType = "regions/median?isco=" + isco;
    }

    if (isco !== "" && data !== "Median Wage") {
      url_dataType = "jobs/average/mean?isco=" + isco;
    }

    const url = `${API_URL}/`;
    axios
      .get(url + url_dataType)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ averages: data.payload });
        this.setGroups(data.payload);
      });

    this.getAverageMeanMedian();
  }

  setGroups(data) {
    let list = [];
    let n = 5;
    if (this.state.mapType === "Gender Wage Gap") {
      data.map((el) => {
        list.push(parseInt(Math.abs(el.maleAverage - el.femaleAverage)));
        return;
      });
    } else if(this.state.mapType === "Median Wage") {
      data.map((el) => {
        let diff = parseInt(el.average);

        console.log(diff);
        list.push(diff);
        return;
      });
    }
    
    else {
      data.map((el) => {
        let diff = Math.ceil((el.maleAverage + el.femaleAverage) / 2);
        if (el.maleAverage === 0 || el.maleAverage === 0) {
          diff = el.maleAverage + el.femaleAverage;
        }
        list.push(diff);
        return;
      });
    }

    list.sort((a, b) => a - b);

    const result = [[], [], [], [], []];

    const wordsPerLine = Math.ceil(list.length / 5);

    for (let line = 0; line < n; line++) {
      for (let i = 0; i < wordsPerLine; i++) {
        const value = list[i + line * wordsPerLine];
        if (!value) continue;
        result[line].push(value);
      }
    }

    console.log(result);
    this.setState({ groups: result });
  }

  getGroupByItem(item) {
    for (let i = 0; i < this.state.groups.length; i++) {
      for (let j = 0; j < this.state.groups[i].length; j++) {
        if (this.state.groups[i][j] === Math.abs(item)) {
          return i;
        }
      }
    }
  }

  getLegends() {
    if (this.state.groups[0] !== undefined) {
      const div = this.state.groups.map((e) => {    
        if(e[0] !== undefined)   {
          return (
            <div>
            <div>
              <div
                className="circle-legend"
                style={{
                  background: this.state.colors[this.getGroupByItem(e[0])],
                  cursor: "pointer",
                }}
              ></div>
              <p
                className="map-legend"
                onClick={() => {
                  this.selectGroupColor(this.getGroupByItem(e[0]));
                }}
              >
                {(e.length > 1)? "€"+e[0]+"-"+ "€"+ e[e.length - 1]:"€"+e[0]}
              </p>
            </div>
            </div>
          );
              }return(<></>);
      });

      return div;
    }
  }

  selectGroupColor(index) {
    let colors = this.state.colors;

    if (colors[index] !== "#3e3d3d") colors[index] = "#3e3d3d";
    else colors[index] = this.state.legendColors[index];
    this.setState({ colors: colors });
  }

  styleForSelectedRegion(data) {
    let diff = 0;

    if (this.state.mapType === "Median Wage"){
      this.state.averages.map((el) => {
        if (el.region === data) {
          diff = el.average;

          return Math.abs(diff);
        }
      });
    }
    else if (this.state.mapType === "Gender Wage Gap") {
      this.state.averages.map((el) => {
        if (el.region === data) {
          diff = el.maleAverage - el.femaleAverage;

          return Math.abs(diff);
        }
      });
    } else {
      this.state.averages.map((el) => {
        if (el.region === data) {
          diff = Math.ceil((el.maleAverage + el.femaleAverage) / 2);

          if (el.maleAverage === 0 || el.maleAverage === 0) {
            diff = el.maleAverage + el.femaleAverage;
          }

          return Math.abs(diff);
        }
      });
    }

    let color = this.state.colors[this.getGroupByItem(diff)];

    if (color === undefined) {
      color = this.state.noDataColor;
    }

    return {
      default: {
        fill: color,
        outline: "none",
        stroke: this.state.selected === data ? "#000000" : "none",
        strokeWidth: 3,
      },
      hover: {
        fill: color,
        outline: "none",
        stroke: "#e6e6e6",
        strokeWidth: 2,
      },
      pressed: {
        fill: color,
        outline: "none",
        stroke: "#F58FA9",
        strokeWidth: 2,
      },
    };
  }

  generateValueString(val) {
    if (val !== 0) {
      return ": €" + val;
    }

    return ": no data";
  }

  getMeanForRegion(region) {
    let data = {};
    if(this.state.mapType === "Median Wage"){
     
      this.state.averages.map((el) => {
        if (el.region === region) {
          data = ("€" + el.average)
          console.log(data);
          return data;
        }
      });
    }else{
    this.state.averages.map((el) => {
      if (el.region === region) {
        data =
          genderLabel[0] +
          this.generateValueString(el.maleAverage) +
          "\n" +
          genderLabel[1] +
          this.generateValueString(el.femaleAverage);
        return data;
      }
    });
  }
    return data;
  }

  getMeanForRegionAverage(region) {
    let data = {};
    this.state.averages.map((el) => {
      if (el.region === region) {
        let avg = Math.ceil((el.maleAverage + el.femaleAverage) / 2);

        if (el.maleAverage === 0 || el.maleAverage === 0) {
          avg = el.maleAverage + el.femaleAverage;
        }

        if (avg !== 0) data = "€" + avg;
        else data = "No data";
        return data;
      }
    });
    return data;
  }

  setColor(mapType) {
    let color;

    switch (mapType) {
      case "Median Wage":
        this.setState({
          colors: ["#820525", "#BA1E46", "#E24A71", "#F58FA9", "#FFBFCF"],
          legendColors: ["#820525", "#BA1E46", "#E24A71", "#F58FA9", "#FFBFCF"],
        });
        break;
      case "Average Wage":
        this.setState({
          colors: ["#C0D2FF", "#648FF9", "#0F4FEF", "#0E3CB0", "#061D55"],
          legendColors: ["#C0D2FF", "#648FF9", "#0F4FEF", "#0E3CB0", "#061D55"],
        });
        break;
      default:
        this.setState({
          colors: ["#CCB0FF", "#A476F9", "#6939C5", "#3F1A84", "#301563"],
          legendColors: ["#CCB0FF", "#A476F9", "#6939C5", "#3F1A84", "#301563"],
        });
        break;
    }
    this.setState({ color: color, mapType: mapType });
  }

  getMapType() {
    let mapContentType;
    switch (this.state.mapType) {
      case "Median Wage":
        mapContentType = medianWage + ", 2020";
        break;

      case "Average Wage":
        mapContentType = averageWage + ", 2020";
        break;

      default:
        mapContentType = genderWageGap + ", 2020";
        break;
    }

    return mapContentType;
  }

  getOccupation() {
    return this.props.occupation === "" || this.props.region === ""
      ? overall
      : this.props.occupation + ", " + this.props.region;
  }

  getAverageMeanMedian() {
    const url = `${API_URL}/`;
    axios.get(url + "jobs/average?isco=" + this.state.isco).then((response) => {
      let averagesPayload = response.data.payload;

      this.setState({
        median: averagesPayload.median,
        average: averagesPayload.average,
        genderGap: averagesPayload.genderGap,
      });
    });
  }

  getAverageOrMean() {
    if (this.state.average === 0) {
      return "";
    } else {
      switch (this.state.mapType) {
        case "Median Wage":
          return "€" + this.state.median;

        case "Average Wage":
          return "€" + this.state.average;

        case "Gender Wage Gap":
          return Math.abs(parseInt(this.state.genderGap * 100)) + "%";

        default:
          return " ";
      }
    }
  }
  render() {
    return (
      <>
        <div className="c-tabs c-is-sticky" data-tabs="">
          <div className="c-tabs__nav">
            <ul>
              <li
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.setColor("Gender Wage Gap");
                  this.getMeansForAllRegions("Gender Wage Gap");
                }}
              >
                <a
                href="/#"
                className="c-btn c-btn--w-icon"
                  role="tab"
                  aria-controls="brand"
                  aria-label="brand menu"
                  aria-selected={
                    this.state.mapType === "Gender Wage Gap" ? "true" : "false"
                  }
                >
                  {genderWageGap}
                </a>
              </li>
              <li
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.setColor("Median Wage");
                  this.getMeansForAllRegions("Median Wage");
                }}
              >
                <a
                href="/#"
                className="c-btn c-btn--w-icon"
                  role="tab"
                  aria-controls="ui-juhised"
                  aria-label="ui-juhised menu"
                  aria-selected={
                    this.state.mapType === "Median Wage" ? "true" : "false"
                  }
                >
                  {medianWage}
                </a>
              </li>
              <li
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.setColor("Average Wage");
                  this.getMeansForAllRegions("Average Wage");
                }}
              >
                <a
                href="/#"
                className="c-btn c-btn--w-icon"
                  role="tab"
                  aria-controls="ui-juhised"
                  aria-label="ui-juhised menu"
                  aria-selected={
                    this.state.mapType === "Average Wage" ? "true" : "false"
                  }
                >
                  {averageWage}
                </a>
              </li>
            </ul>
          </div>
          <div className="c-tabs-line"></div>
        </div>
        <ComposableMap data-tip="" projectionConfig={{ scale: 340 }}>
          <Geographies geography={ee}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const l = geo.properties.MNIMI;
                      const data = this.getMeanForRegion(l);
                      if (this.state.mapType === "Gender Wage Gap" || this.state.mapType === "Median Wage")
                        this.props.setTooltipContent(data.toString());
                      else
                        this.props.setTooltipContent(
                          this.getMeanForRegionAverage(l).toString()
                        );
                    }}
                    onMouseLeave={() => {
                      this.props.setTooltipContent("");
                    }}
                    onClick={() => {
                      const selectedRegion = geo.properties.MNIMI;
                      this.setState({ selected: selectedRegion });
                      this.props.onRegionChange({ value: selectedRegion });
                    }}
                    style={this.styleForSelectedRegion(geo.properties.MNIMI)}
                  />
                ))}
                {geographies.map((geo) => {
                  const centroid = geoCentroid(geo);
                  return (
                    <g key={geo.rsmKey + "-name"}>
                      {true ? (
                        <Marker coordinates={centroid}>
                          <text
                            style={{
                              fontSize: "9pt",
                              fill: "#FFFFFF",
                              fontFamily: "Roboto",
                            }}
                            y="2"
                            textAnchor="middle"
                          >
                            {replaceMaakond(geo.properties.MNIMI)}
                          </text>
                        </Marker>
                      ) : (
                        <></>
                      )}
                    </g>
                  );
                })}
              </>
            )}
          </Geographies>
          <Annotation subject={[-80, 40]} dx={0} dy={0}>
            <text
              style={{
                fontSize: "12pt",
                fontFamily: "Roboto",
                fontWeight: "bold",
              }}
              x="-15"
              textAnchor="start"
              alignmentBaseline="start"
            >
              {this.getMapType()}
            </text>
            <text
              style={{
                fontSize: "12pt",
                fontFamily: "Roboto",
              }}
              x="-15"
              y="25"
              textAnchor="start"
              alignmentBaseline="start"
            >
              {this.getOccupation()}
            </text>
            <text
              style={{
                fontSize: "12pt",
                fontFamily: "Roboto",
              }}
              x="-15"
              y="50"
              textAnchor="start"
              alignmentBaseline="start"
            >
              {this.getAverageOrMean()}
            </text>
          </Annotation>
        </ComposableMap>
        <div
          className="legends"
          style={{ width: "100px", marginTop: "-120px" }}
        >
          {this.getLegends()}
          <div
              className="circle-legend"
              style={{
                background: this.state.noDataColor,
              }}
            ></div>
          <p
              className="map-legend"
            >
              {noData}
            </p>
        </div>
      </>
    );
  }
}

export default memo(DynamicMapSelector);
