import React, { memo, Component } from "react";
import { API_URL } from "../../text";
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
      notSelectedStyle: {
        default: {
          fill: props.mapElementColor,
          outline: "none",
        },
        hover: {
          fill: "#FFFFFF",
          outline: "none",
        },
        pressed: {
          fill: "#FFF",
          outline: "none",
        },
      },
      selectedStyle: {
        default: {
          fill: "#FFF",
          outline: "none",
        },
        hover: {
          fill: "#FFF",
          outline: "none",
        },
        pressed: {
          fill: "#FFF",
          outline: "none",
        },
      },

      mapType: "Gender Wage Gap",
      isco: "",
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
  }

  styleForNotSelectedRegion(data) {
    return this.styleForNotSelectedRegionAverage(data);
  }

  styleForNotSelectedRegionAverage(data) {
    let diff = 0;
    this.state.averages.map((el) => {
      if (el.region === data) {
        diff = el.maleAverage - el.femaleAverage;

        return diff;
      }
    });

    return {
      default: {
        fill: tinycolor(this.state.color)
          .darken((diff / 1300) * 100)
          .toString(),
        outline: "none",
      },
      hover: {
        fill: "#FFFFFF",
        outline: "none",
      },
      pressed: {
        fill: "#FFF",
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
    let mapContentOccupation;

    if (this.props.occupation !== undefined) {
      mapContentOccupation = this.props.occupation;
    }

    return mapContentOccupation;
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
                        ? this.styleForNotSelectedRegion(geo.properties.MNIMI)
                        : this.state.selectedStyle
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
                            fontSize={14}
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
          <Annotation subject={[-80, 30]} dx={0} dy={0}>
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
          </Annotation>
        </ComposableMap>

        <div className="row" style={{ alignContent: "center" }}>
          <div
            className="card m-1"
            style={{ height: "3rem", cursor: "pointer" }}
            onClick={() => {
              this.setColor("Gender Wage Gap");
              this.getMeansForAllRegions("Gender Wage Gap");
            }}
          >
            <div className="carditem p-1">
              <p
                style={{
                  color: "black",
                  fontSize: "10pt",
                  fontFamily: "Roboto",
                }}
              >
                Gender Wage Gap
              </p>
            </div>
          </div>
          <div
            className="card m-1"
            style={{ height: "3rem", cursor: "pointer" }}
            onClick={() => {
              this.setColor("Median Wage");
              this.getMeansForAllRegions("Median Wage");
            }}
          >
            <div className="carditem p-1">
              <p
                style={{
                  color: "black",
                  fontSize: "10pt",
                  fontFamily: "Roboto",
                }}
              >
                Median Wage
              </p>
            </div>
          </div>
          <div
            className="card m-1"
            style={{ height: "3rem", cursor: "pointer" }}
            onClick={() => {
              this.setColor("Average Wage");
            }}
          >
            <div className="carditem p-1">
              <p
                style={{
                  color: "black",
                  fontSize: "10pt",
                  fontFamily: "Roboto",
                }}
              >
                Average Wage
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default memo(DynamicMapSelector);
