import React, { memo, Component } from "react";
import { geoCentroid } from "d3-geo";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import ee from "../../../../resources/ee.json";
import axios from "axios";
import { API_URL, genderLabel } from "../../../../dictionary/text";
import tinycolor from "tinycolor2";

const replaceMaakond = (maakond) => {
  return maakond.replace("maakond", "");
};

class MapSelector extends Component {
    constructor(props) {
        super();
        this.state = {
          selected: "",
          averages: [],
          mapType: "Gender Wage Gap",
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
    
    
        this.getMeansForAllRegions("");
        this.getMeanForRegion("Harju maakond");
      }
    
      componentWillReceiveProps(props) {
        this.getMeansForAllRegions(this.state.mapType);
      }
    
      getMeansForAllRegions(data) {
        var url_dataType = "";
        url_dataType = "regions/average";
    
        if (data === "Median Wage") {
          url_dataType = "regions/median";
        }
    
        const url = `${API_URL}/`;
        axios
          .get(url + url_dataType)
          .then((response) => response.data)
          .then((data) => {
            this.setState({ averages: data.payload });
            this.setGroups(data.payload);
          });

      }
    
      setGroups(data) {
        let list = [];
        let n = 5;
        if (this.state.mapType === "Gender Wage Gap") {
          data.map((el) => {
            list.push(parseInt(Math.abs(el.maleAverage - el.femaleAverage)));
            return;
          });
        } else {
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
    

      styleForSelectedRegion(data) {
        let diff = 0;
        if (this.state.mapType === "Gender Wage Gap") {
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
            stroke: this.state.selected === data ? "#e6e6e6" : "none",
            strokeWidth: 2,
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
            stroke: "#e6e6e6",
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
            </ComposableMap>
          </>
        );
      }
}
export default memo(MapSelector);