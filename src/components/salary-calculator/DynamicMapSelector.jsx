import React, { memo, Component } from "react";
import { API_URL, overall } from "../../text";
import { geoCentroid } from "d3-geo";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
import ee from "../../ee.json";
import axios from "axios";
import { genderLabel } from "../../text";
import tinycolor from "tinycolor2";

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
    url_dataType = "regions/average";

    if (data === "Median Wage") {
      url_dataType = "regions/median";
    }

    if (isco !== "" && data === "Gender Wage Gap") {
      url_dataType = "jobs/average/mean?isco=" + isco;
    }
    if (isco !== "" && data === "Gender Wage Gap") {
      url_dataType = "jobs/average/median?isco=" + isco;
    }

    const url = `${API_URL}/`;
    axios
      .get(url + url_dataType)
      .then((response) => response.data)
      .then((data) => {
        let flag = false;
        let element;

        for (element in data.payload) {
          if (parseInt(data.payload[element].femaleAverage) === 0) {
            flag = true;
          }
          if (parseInt(data.payload[element].maleAverage) === 0) {
            flag = true;
          }
        }
        if (flag !== true) this.setState({ averages: data.payload });
      });

    this.getAverageMeanMedian();
  }

  getGradientMax() {
    let diff = 0;
    this.state.averages.map((el) => {
      let diff_av = el.maleAverage - el.femaleAverage;
      if (diff < diff_av) {
        diff = diff_av;
      }
    });

    return tinycolor(this.state.color)
      .darken((diff / 1300) * 100)
      .toString();
  }

  styleForSelectedRegion(data) {
    let diff = 0;
    this.state.averages.map((el) => {
      if (el.region === data) {
        diff = el.maleAverage - el.femaleAverage;

        return diff;
      }
    });
    let color = tinycolor(this.state.color)
      .darken((diff / 1300) * 100)
      .toString();

    return {
      default: {
        fill: color,
        outline: "none",
      },
      hover: {
        fill: color,
        outline: "none",
        stroke: "#6e6e6e",
      },
      pressed: {
        fill: color,
        outline: "none",
        stroke: "#6e6e6e",
      },
    };
  }

  styleForNotSelectedRegion(data) {
    let diff = 0;
    this.state.averages.map((el) => {
      if (el.region === data) {
        diff = el.maleAverage - el.femaleAverage;

        return diff;
      }
    });

    let color = tinycolor(this.state.color)
      .darken((diff / 1300) * 100)
      .toString();

    return {
      default: {
        fill: color,
        outline: "none",
        stroke: "#515152",
      },
      hover: {
        fill: color,
        outline: "none",
        stroke: "#000",
      },
      pressed: {
        fill: color,
        outline: "none",
      },
    };
  }

  getMeanForRegion(region) {
    let data = {};
    this.state.averages.map((el) => {
      if (el.region === region) {
        data =
          genderLabel[0] +
          ": €" +
          el.maleAverage +
          "\n" +
          genderLabel[1] +
          ": €" +
          el.femaleAverage;
        return data;
      }
    });
    return data;
  }

  getMeanForRegionAverage(region) {
    let data = {};
    this.state.averages.map((el) => {
      if (el.region === region) {
        data = "€" + Math.ceil((el.maleAverage + el.femaleAverage) / 2);
        return data;
      }
    });
    return data;
  }

  setColor(mapType) {
    let color;

    switch (mapType) {
      case "Median Wage":
        color = "#AB75E7";
        break;
      case "Average Wage":
        color = "#43C7F6";
        break;
      default:
        color = "#73e8ff";
        break;
    }
    this.setState({ color: color, mapType: mapType });
  }

  getMapType() {
    let mapContentType = this.state.mapType + ", 2020";

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
          return this.state.genderGap + "%";

        default:
          return " ";
      }
    }
  }
  render() {
    return (
      <>
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
                      if (this.state.mapType !== "Average Wage")
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
                    style={
                      this.state.selected !== geo.properties.MNIMI
                        ? this.styleForSelectedRegion(geo.properties.MNIMI)
                        : this.styleForNotSelectedRegion(geo.properties.MNIMI)
                    }
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
                              fontSize: "10pt",
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
          style={{
            width: "80%",
            height: "20px",
            borderRadius: "10px",
            marginLeft: "10%",
            marginTop: "-40px",
            marginBottom: "80px",
            background: `linear-gradient(to right, ${
              this.state.color
            },${this.getGradientMax()})`,
          }}
        >
          <p
            style={{
              color: "#FFF",
              textAlign: "left",
              marginLeft: "15px",
              float: "left",
              width: "50%",
            }}
          >
            Lower
          </p>

          <p style={{ color: "#FFF", textAlign: "right", marginRight: "15px" }}>
            Higher
          </p>
        </div>

        <div class="c-tabs c-is-sticky" data-tabs="">
          <div class="c-tabs__nav">
            <ul>
              <li
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.setColor("Gender Wage Gap");
                  this.getMeansForAllRegions("Gender Wage Gap");
                }}
              >
                <a
                  class="c-btn c-btn--w-icon"
                  role="tab"
                  aria-controls="brand"
                  aria-label="brand menu"
                  aria-selected={
                    this.state.mapType === "Gender Wage Gap" ? "true" : "false"
                  }
                >
                  Gender Wage Gap
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
                  class="c-btn c-btn--w-icon"
                  role="tab"
                  aria-controls="ui-juhised"
                  aria-label="ui-juhised menu"
                  aria-selected={
                    this.state.mapType === "Median Wage" ? "true" : "false"
                  }
                >
                  Median Wage
                </a>
              </li>
              <li
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.setColor("Average Wage");
                }}
              >
                <a
                  class="c-btn c-btn--w-icon"
                  role="tab"
                  aria-controls="ui-juhised"
                  aria-label="ui-juhised menu"
                  aria-selected={
                    this.state.mapType === "Average Wage" ? "true" : "false"
                  }
                >
                  Average Wage
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default memo(DynamicMapSelector);
