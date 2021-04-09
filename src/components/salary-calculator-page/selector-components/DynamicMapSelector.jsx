import React, { memo, Component } from "react";
import {
  API_URL,
  overall,
  noData,
  quarter,
  noDataInfo,
  source,
  counties,
  averageTabInfo,
  medianTabInfo,
  wageGapInfoTab,
  genderLabel,
  genderWageGap,
  averageWage,
  medianWage,
  downloadPng,
  downloadJpeg,
  euroUnits,
} from "../../../dictionary/text";
import { geoCentroid } from "d3-geo";
import * as htmlToImage from "html-to-image";
import downloadjs from "downloadjs";
import infoIcon from "../../../resources/info.svg";
import linkIcon from "../../../resources/arrow-link.svg";
import linkIconHovered from "../../../resources/arrow-link-hovered.png";
import { translateCounty } from "../entityFunc";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
import ee from "../../../resources/ee.json";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { connect } from "react-redux";
import { formatNumber } from "../../../actions/actions";

const replaceMaakond = (maakond) => {
  return maakond.replace("maakond", "");
};

const StyledTooltip = styled(ReactTooltip)`
  opacity: 1 !important;
  color: white !important;
  width: 190px;
  white-space: normal;
  font-size: 18px;
  padding: 15px;
  border-radius: 0% !important;
`;

class DynamicMapSelector extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: "all",
      averages: [],
      occupation: props.occupation,
      color: props.mapElementColor,
      mapType: "Gender Wage Gap",
      isco: props.isco,
      median: "",
      average: "",
      genderGap: "",
      groups: [[], [], []],
      colors: ["#CCB0FF", "#A476F9", "#6939C5", "#3F1A84", "#301563"],
      legendColors: ["#CCB0FF", "#A476F9", "#6939C5", "#3F1A84", "#301563"],
      noDataColor: "#eeeeee",
      content: "",
      mapDownloadMenu: false,
      noDataModal: false,

      linkHovered: false,
    };

    this.getMeansForAllRegions = this.getMeansForAllRegions.bind(this);
    this.getMeanForRegion = this.getMeanForRegion.bind(this);
    this.setColor = this.setColor.bind(this);
    this.getMeansForAllRegions = this.getMeansForAllRegions.bind(this);

    this.getMeansForAllRegions("", props.isco);
    this.getMeanForRegion("Harju maakond");
  }

  componentWillReceiveProps(props) {
    this.setState({ isco: props.isco });

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

    if (isco !== "" && data !== "Median Wage" && data !== "Avwer") {
      url_dataType = "jobs/average/mean?isco=" + isco;
    }

    if (data === "Average Wage") {
      url_dataType = "regions/average";
    }
    if (data === "Average Wage" && isco !== "") {
      url_dataType = "regions/average?isco=" + isco;
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
        if (el.maleAverage !== 0 && el.femaleAverage !== 0)
          list.push({
            item: parseInt(Math.abs(el.maleAverage - el.femaleAverage)),
            percentage:
              parseFloat((el.maleAverage - el.femaleAverage) / el.maleAverage) *
              100,
          });
      });
    } else {
      data.forEach((el) => {
        let diff = parseInt(el.average);
        list.push({ item: diff, percentage: 0 });
      });
    }

    if (this.state.mapType !== "Gender Wage Gap")
      list.sort((a, b) => a.item - b.item);
    else list.sort((a, b) => a.percentage - b.percentage);

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
      const div = this.state.groups.map((e, index) => {
        if (e[0] !== undefined) {
          return (
            <div key={index}>
              <div className="mt-2">
                <div
                  className="circle-legend m-1"
                  style={{
                    background: this.state.colors[
                      this.getGroupByItem(e[0].item)
                    ],
                    cursor: "pointer",
                  }}
                ></div>
                <p
                  className="map-legend h6-stat-gray text-left ml-3"
                  onClick={() => {
                    this.selectGroupColor(this.getGroupByItem(e[0].item));
                  }}
                >
                  {this.state.mapType !== "Gender Wage Gap"
                    ? e.length > 1
                      ? `${formatNumber(
                          e[0].item,
                          this.props.language
                        )}–${formatNumber(
                          e[e.length - 1].item,
                          this.props.language
                        )} ${euroUnits}`
                      : `${formatNumber(
                          e[0].item,
                          this.props.language
                        )} ${euroUnits}`
                    : e.length > 1
                    ? this.props.language === "en"
                      ? `${e[0].percentage.toFixed(2)}–${e[
                          e.length - 1
                        ].percentage.toFixed(2)}%`
                      : `${e[0].percentage.toFixed(2).replace(".", ",")}–${e[
                          e.length - 1
                        ].percentage
                          .toFixed(2)
                          .replace(".", ",")}%`
                    : this.props.language === "en"
                    ? `${e[0].percentage.toFixed(2)}%`
                    : `${e[0].percentage.toFixed(2).replace(".", ",")}%`}
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
          if (el.region === data) {
            diff = el.average;

            return Math.abs(diff);
          }
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
        stroke: "#F58FA9",
        strokeWidth: 2,
      },
    };
  }

  generateValueString(val) {
    if (val !== "0") {
      if (this.props.language === "en") return ": €" + val;
      return ": " + val + " €";
    }

    return ": " + noData;
  }

  getMeanForRegion(region) {
    let data = {};
    if (
      this.state.mapType === "Median Wage" ||
      this.state.mapType === "Average Wage"
    ) {
      this.state.averages.map((el) => {
        if (el.region === region) {
          if (this.props.language === "en")
            data = "€" + formatNumber(el.average, this.props.language);
          else data = formatNumber(el.average, this.props.language) + " €";

          return data;
        }

        return 0;
      });
    } else {
      this.state.averages.map((el) => {
        if (el.region === region) {
          data =
            genderLabel[0] +
            this.generateValueString(
              formatNumber(el.maleAverage, this.props.language)
            ) +
            "<br/>" +
            genderLabel[1] +
            this.generateValueString(
              formatNumber(el.femaleAverage, this.props.language)
            );
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

        if (avg !== 0) data = avg + " €";
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
        mapContentType = medianWage;
        break;

      case "Average Wage":
        mapContentType = averageWage;
        break;

      default:
        mapContentType = genderWageGap;
        if (this.props.language === "en") mapContentType += " by county";
        break;
    }

    return `${mapContentType} | ${this.props.dates.occupationEntityDateQuarter} ${quarter} ${this.props.dates.occupationEntityDate}`;
  }

  getOccupation() {
    return this.props.generalName === null
      ? ""
      : `${this.props.generalName} (${this.props.occupationCode})`;
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
          if (this.props.language === "en")
            return "€" + formatNumber(this.state.median, this.props.language);
          else
            return formatNumber(this.state.median, this.props.language) + " €";

        case "Average Wage":
          if (this.props.language === "en")
            return "€" + formatNumber(this.state.average, this.props.language);
          else
            return formatNumber(this.state.average, this.props.language) + " €";

        case "Gender Wage Gap":
          return parseInt(this.state.genderGap * 100) + "%";

        default:
          return " ";
      }
    }
  }

  onMapHover(geo) {
    const l = geo.properties.MNIMI;
    const data = this.getMeanForRegion(l);
    let dataString = Object.keys(data).length === 0 ? noData : data.toString();
    this.setState({
      content: `<p class="h6-stat-white-bold text-left">${translateCounty(
        l,
        this.props.language
      )}:</p> <br/> <p class="h6-stat-white text-left">${dataString}</p> `,
    });
  }

  onOccupationHover() {
    if (this.props.generalName !== null)
      this.setState({
        content: this.props.occupation,
      });
  }

  getComposableMap() {
    return (
      <div
        id="composable-map"
        style={{
          backgroundColor:
            this.state.groups[0].length !== 0 ? "" : "rgba(247,247,247,0.46)",
        }}
      >
        <ComposableMap
          data-tip=""
          projectionConfig={{ scale: 300 }}
          viewBox="40 30 800 600"
        >
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
                      this.props.onRegionChange({
                        value: selectedRegion,
                        tab: this.state.mapType,
                      });
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
                              fontFamily: "Roboto",
                              fontWeight: "normal",
                              fontSize:
                                this.props.language === "ru" ? "10px" : "13px",
                              lineHeight: "16px",
                              fill: "#FFFFFF",
                              cursor: "default",
                            }}
                            onClick={() => {
                              const selectedRegion = geo.properties.MNIMI;
                              this.setState({ selected: selectedRegion });
                              this.props.onRegionChange({
                                value: selectedRegion,
                                tab: this.state.mapType,
                              });
                            }}
                            x={
                              geo.properties.MNIMI.includes("Lääne maakond")
                                ? "-5"
                                : "0"
                            }
                            y="2"
                            textAnchor={
                              geo.properties.MNIMI.includes("Lääne maakond")
                                ? ""
                                : "middle"
                            }
                          >
                            {this.props.language === "ru"
                              ? counties[geo.properties.MNIMI]
                              : replaceMaakond(geo.properties.MNIMI)}
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
                fontFamily: "Roboto",
              }}
              x="-8"
              fontWeight="bold"
              lineHeight="20px"
              fontSize="14px"
              textAnchor="start"
              alignmentBaseline="start"
            >
              {this.getMapType()}
            </text>
            <image
              x="-33"
              y={"-16"}
              alignmentBaseline="bottom"
              href={infoIcon}
              width={21}
              height={21}
              onMouseEnter={() => {
                let content = "";

                switch (this.state.mapType) {
                  case "Median Wage":
                    content = medianTabInfo;
                    break;

                  case "Average Wage":
                    content = averageTabInfo;
                    break;

                  default:
                    content = wageGapInfoTab;
                    break;
                }
                this.setState({
                  content: `<p class="text-left">${content} </p>`,
                });
              }}
              onMouseLeave={() => {
                this.setState({ content: "" });
              }}
            />

            <text
              style={{
                fontFamily: "Roboto",
                fontWeight: "normal",
                fontSize: "13px",
                lineHeight: "16px",
                fill: "#595959",
              }}
              x="-30"
              y="25"
              textAnchor="start"
              alignmentBaseline="start"
            >
              {this.getOccupation()}
            </text>
            <image
              x="-31"
              y={this.props.generalName === null ? "12" : "37"}
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                this.setState({ selected: "all" });
                this.props.onOverallDataForMapSelected({ value: "all" });
              }}
              alignmentBaseline="bottom"
              href={this.state.linkHovered ? linkIconHovered : linkIcon}
              width={17}
              height={17}
              onMouseEnter={() => this.setState({ linkHovered: true })}
              onMouseLeave={() => this.setState({ linkHovered: false })}
            />
            <text
              style={{
                fontFamily: "Roboto",
                fontSize: "13px",
                lineHeight: "16px",
                fill: "#000",
                fontWeight: this.state.selected === "all" ? "bold" : "",
                textDecoration: this.state.linkHovered ? "underline" : "none",
                cursor: "pointer",
              }}
              x="-8"
              y={this.props.generalName === null ? "25" : "50"}
              textAnchor="start"
              alignmentBaseline="start"
              onMouseEnter={() => this.setState({ linkHovered: true })}
              onMouseLeave={() => this.setState({ linkHovered: false })}
              onClick={() => {
                this.setState({ selected: "all" });
                this.props.onOverallDataForMapSelected({ value: "all" });
              }}
            >
              {overall}
            </text>

            <text
              style={{
                fontFamily: "Roboto",
                fontWeight: "normal",
                fontSize: "13px",
                lineHeight: "16px",
                fill: "#595959",
              }}
              x="-30"
              y={this.props.generalName === null ? "55" : "75"}
              textAnchor="start"
              alignmentBaseline="start"
            >
              {this.getAverageOrMean()}
            </text>
            <text
              style={{
                fontFamily: "Roboto",
                fontWeight: "normal",
                fontSize: "11px",
                lineHeight: "16px",
                fill: "#595959",
              }}
              x="550"
              y={"43"}
              textAnchor="start"
              alignmentBaseline="start"
            >
              {source}
            </text>
            <g
              width="20"
              height="20"
              x="637"
              style={{ cursor: "pointer" }}
              y={"4"}
              onClick={() => {
                this.setState({ mapDownloadMenu: !this.state.mapDownloadMenu });
              }}
            >
              <svg
                width="20"
                height="20"
                backgroundColor="#fff"
                viewBox="0 0 24 24"
                style={{ fill: "#000" }}
                x={
                  this.props.language === "en"
                    ? "655"
                    : this.props.language === "ru"
                    ? "717"
                    : "637"
                }
                y={"12"}
              >
                <path fill="#fff" d="M0 0h24v24H0V0z"></path>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </g>
          </Annotation>
        </ComposableMap>
        <StyledTooltip multiline={true} html={true}>
          {this.state.content}
        </StyledTooltip>
        {this.state.groups[0].length !== 0 ? (
          <div className="legends ml-3">
            {this.getLegends()}
            <div className="mt-2">
              <div
                className="circle-legend m-1"
                style={{
                  background: this.state.noDataColor,
                }}
              ></div>
              <p className="map-legend text-left ml-3 h6-stat-gray">{noData}</p>
            </div>
          </div>
        ) : (
          <div className="legends-info text-left ml-2 mb-5">
            <p className={"text-left ml-5"}>{noDataInfo}</p>
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <>
        <div className="c-tabs c-is-sticky" data-tabs="">
          <div className="c-tabs__nav">
            <ul className={"w-100 row"}>
              <li
                style={{ cursor: "pointer" }}
                className={"col-sm px-1"}
                onClick={() => {
                  this.setColor("Gender Wage Gap");
                  this.getMeansForAllRegions(
                    "Gender Wage Gap",
                    this.state.isco
                  );
                  this.props.onRegionChange({
                    value: this.state.selected,
                    tab: this.state.mapType,
                  });
                }}
              >
                <a
                  className="c-btn c-btn--w-icon h-100"
                  role="tab"
                  aria-controls="brand"
                  aria-label="brand menu"
                  href={"#"}
                  aria-selected={
                    this.state.mapType === "Gender Wage Gap" ? "true" : "false"
                  }
                >
                  {genderWageGap}
                </a>
              </li>
              <li
                style={{ cursor: "pointer" }}
                className={"col-sm px-1"}
                onClick={() => {
                  this.setColor("Median Wage");
                  this.getMeansForAllRegions("Median Wage", this.state.isco);
                  this.props.onRegionChange({
                    value: this.state.selected,
                    tab: this.state.mapType,
                  });
                }}
              >
                <a
                  className="c-btn c-btn--w-icon h-100"
                  role="tab"
                  aria-controls="ui-juhised"
                  aria-label="ui-juhised menu"
                  href={"#"}
                  aria-selected={
                    this.state.mapType === "Median Wage" ? "true" : "false"
                  }
                >
                  {medianWage}
                </a>
              </li>
              <li
                style={{ cursor: "pointer" }}
                className={"col-sm px-1"}
                onClick={() => {
                  this.setColor("Average Wage");
                  this.getMeansForAllRegions("Average Wage", this.state.isco);
                  this.props.onRegionChange({
                    value: this.state.selected,
                    tab: this.state.mapType,
                  });
                }}
              >
                <a
                  className="c-btn c-btn--w-icon h-100"
                  role="tab"
                  aria-controls="ui-juhised"
                  aria-label="ui-juhised menu"
                  href={"#"}
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
          <div>
            <div className="apexcharts-toolbar-map">
              <div
                className="apexcharts-menu-icon"
                style={{}}
                title="Menu"
                onClick={() => {
                  this.setState({
                    mapDownloadMenu: !this.state.mapDownloadMenu,
                  });
                }}
              ></div>
              <div
                className={
                  "apexcharts-menu " +
                  (this.state.mapDownloadMenu ? "apexcharts-menu-open" : "")
                }
              >
                <div
                  className="apexcharts-menu-item exportPNG text-left"
                  onClick={() => {
                    htmlToImage
                      .toPng(document.getElementById("composable-map"))
                      .then(function (dataUrl) {
                        downloadjs(dataUrl, "map.png");
                      });
                  }}
                  title={downloadPng}
                >
                  {downloadPng}
                </div>
                <div
                  className="apexcharts-menu-item exportPDF text-left"
                  title={downloadJpeg}
                  onClick={() => {
                    htmlToImage
                      .toJpeg(document.getElementById("composable-map"), {
                        quality: 0.95,
                        backgroundColor: "#FFF",
                      })
                      .then(function (dataUrl) {
                        downloadjs(dataUrl, "map.jpg");
                      });
                  }}
                >
                  {downloadJpeg}
                </div>
              </div>
            </div>
          </div>
          {this.getComposableMap()}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default memo(connect(mapStateToProps)(DynamicMapSelector));
