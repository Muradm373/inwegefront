import React, { memo, Component } from "react";
import { API_URL, overall, noData, averageData } from "../../../../dictionary/text";
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
import ReactTooltip from "react-tooltip";

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
      content: "",
    };

    this.getMeansForAllRegions = this.getMeansForAllRegions.bind(this);
    this.getMeanForRegion = this.getMeanForRegion.bind(this);
    this.setColor = this.setColor.bind(this);
    this.getMeansForAllRegions = this.getMeansForAllRegions.bind(this);

    this.setState({isco: props.isco});

    this.getMeansForAllRegions("", props.isco);
    this.getMeanForRegion("Harju maakond");
  }

  componentWillReceiveProps(props) {
    this.setState({ isco: props.isco});

    this.getMeansForAllRegions(this.state.mapType, props.isco);

  }

  getMeansForAllRegions(data, isco_props) {
    var url_dataType = "";
    var isco = isco_props;
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
      data.forEach((el) => {
        if(el.maleAverage !== 0 && el.femaleAverage !== 0)
          list.push({item: parseInt(Math.abs(el.maleAverage - el.femaleAverage)), percentage: parseFloat(Math.abs(el.maleAverage - el.femaleAverage)/el.maleAverage)*100});
      });
    } else if (this.state.mapType === "Median Wage") {
      data.forEach((el) => {
        let diff = parseInt(el.average);
        list.push({item: diff, percentage: 0});
      });
    } else {
      data.forEach((el) => {
        let diff = Math.ceil((el.maleAverage + el.femaleAverage) / 2);
        if (el.maleAverage === 0 || el.maleAverage === 0) {
          diff = el.maleAverage + el.femaleAverage;
        }else
          list.push({item:diff, percentage: 0});
      });
    }

    if(this.state.mapType !== "Gender Wage Gap")
      list.sort((a, b) => a.item - b.item);
    else
      list.sort((a, b) => a.percentage - b.percentage);


    const result = [[], [], [], [], []];

    const wordsPerLine = Math.ceil(list.length / 5);

    for (let line = 0; line < n; line++) {
      for (let i = 0; i < wordsPerLine; i++) {
        const value = list[i + line * wordsPerLine];
        if (!value) continue;
        result[line].push(value);
      }
    }

    this.setState({ groups: result });
  }

  getGroupByItem(item) {
    for (let i = 0; i < this.state.groups.length; i++) {
      for (let j = 0; j < this.state.groups[i].length; j++) {
        if (this.state.groups[i][j].item === Math.abs(item)) {
          return i;
        }
      }
    }
  }

  getLegends() {
    if (this.state.groups[0] !== undefined) {
      const div = this.state.groups.map((e) => {
        if (e[0]!== undefined) {
         
          return (
            <div>
              <div>
                <div
                  className="circle-legend m-1"
                  style={{
                    background: this.state.colors[this.getGroupByItem(e[0].item)],
                    cursor: "pointer",
                  }}
                ></div>
                <p
                  className="map-legend"
                  onClick={() => {
                    this.selectGroupColor(this.getGroupByItem(e[0].item));
                  }}
                >
                  {this.state.mapType!=="Gender Wage Gap"?
                  e.length > 1 ? `€${e[0].item} - €${e[e.length - 1].item}` : `€${e[0].item}`:
                  e.length > 1 ? `${e[0].percentage.toFixed(2)}% - ${e[e.length - 1].percentage.toFixed(2)}%` : `${e[0].percentage.toFixed(2)}%`
                }

                </p>
              </div>
            </div>
          );
        }
        return <></>;
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

    if (this.state.mapType === "Median Wage") {
      this.state.averages.map((el) => {
        if (el.region === data) {
          diff = el.average;

          return Math.abs(diff);
        }

        return 0;
      });
    } else if (this.state.mapType === "Gender Wage Gap") {
      this.state.averages.map((el) => {
        if (el.region === data) {
          diff = el.maleAverage - el.femaleAverage;

          return Math.abs(diff);
        }

        return 0;
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

        return 0;
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
        stroke:
          this.state.mapType === "Median Wage"
            ? this.state.selected === data
              ? "#000000"
              : "none"
            : this.state.selected === data
            ? "#F58FA9"
            : "none",

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

    return ": " + noData;
  }

  getMeanForRegion(region) {
    let data = {};
    if (this.state.mapType === "Median Wage") {
      this.state.averages.map((el) => {
        if (el.region === region) {
          data = "€" + el.average;
          return data;
        }

        return 0;
      });
    } else {
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
        return 0;
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
        else data = noData;
        return data;
      }
      return 0;
    });
    return data;
  }

  setColor(mapType) {
    let color;

    switch (mapType) {
      case "Median Wage":
        this.setState({
          colors: ["#FFBFCF", "#F58FA9", "#E24A71", "#BA1E46", "#820525"],
          legendColors: ["#FFBFCF", "#F58FA9", "#E24A71", "#BA1E46", "#820525"],
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
      : this.props.occupation + ", " + averageData;
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

  onMapHover(geo) {
      const l = geo.properties.MNIMI;
      const data = this.getMeanForRegion(l);
      if (
        this.state.mapType === "Gender Wage Gap" ||
        this.state.mapType === "Median Wage"
      ){
        let dataString =Object.keys(data).length === 0 ? noData : data.toString();
        this.setState({ content: dataString });
      }
      else
        this.setState({
          content: this.getMeanForRegionAverage(l).toString(),
        });
    
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
                  this.getMeansForAllRegions("Gender Wage Gap", this.state.isco);
                }}
              >
                <a
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
                  this.getMeansForAllRegions("Median Wage", this.state.isco);
                }}
              >
                <a
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
                  this.getMeansForAllRegions("Average Wage", this.state.isco);
                }}
              >
                <a
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
        <ComposableMap data-tip="" projectionConfig={{ scale: 350,}}>
          <Geographies geography={ee}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => this.onMapHover(geo)}
                    onMouseLeave={() => {
                      this.setState({ content: "" });
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
          <Annotation subject={[-75, 35]} dx={0} dy={0}>
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
        <ReactTooltip>{this.state.content}</ReactTooltip>
        <div
          className="legends"
        >
          {this.getLegends()}
          <div
            className="circle-legend m-1"
            style={{
              background: this.state.noDataColor,
            }}
          ></div>
          <p className="map-legend">{noData}</p>
        </div>
      </>
    );
  }
}

export default memo(DynamicMapSelector);
