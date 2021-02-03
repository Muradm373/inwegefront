import axios from "axios";
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import {
  API_URL,
  averageData,
  averageDataSpec,
  genderLabel,
  lng,
  menColor,
  womenColor,
  occupationLabel,
  monthLabel,
  columnchartLabel,
  quarter,
  columnChartOccupationLabel,
  counties,
  source,
  overall,
  downloadJpeg,
  downloadPng,
} from "../../../dictionary/text";
import { connect } from "react-redux";
import { displayLegends } from "./Graph";
import {
  exportComponentAsJPEG,
  exportComponentAsPNG,
} from "react-component-export-image";
import { formatNumber } from "../../../actions/actions";

class ColumnChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapDownloadMenu: false,
      series: [
        {
          name: genderLabel[0],
          data: [0, 0, 0],
          color: menColor,
        },
        {
          name: genderLabel[1],
          data: [0, 0, 0],
          color: womenColor,
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "80%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: [menColor, womenColor],
        legend: {
          show: false,
          position: "top",
          floating: true,
          itemMargin: {
            horizontal: 5,
            vertical: 27,
          },
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [averageDataSpec[0], averageDataSpec[1], averageData],
          labels: {
            rotateAlways: false,
            trim: true,
            rotate: 0,
          },
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return formatNumber(value, props.language);
            },
            rotateAlways: false,
          },
          tickAmount: 5,
        },
        fill: {
          opacity: 1,
        },

        tooltip: {
          y: {
            formatter: function (val) {
              return val + " €";
            },
          },
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return `<div class="arrow-box-small text-left"> 
                  <p class="arrow-box-p">
                  ${
                    w.globals.labels[dataPointIndex].length === 2
                      ? w.globals.labels[dataPointIndex][0] +
                        w.globals.labels[dataPointIndex][1]
                          .charAt(0)
                          .toLocaleLowerCase() +
                        w.globals.labels[dataPointIndex][1].slice(1)
                      : w.globals.labels[dataPointIndex]
                  } </p><br/>
                    <br/>
                  <div class="row ml-3 " style="margin-top: -35px">
                  <div class="circle-legend mt-2" style="background-color: ${
                    seriesIndex === 0 ? menColor : womenColor
                  }"></div>
                  <p class="ml-1 h6-stat-white mt-1">
                  ${w.globals.seriesNames[seriesIndex]} 
                        ${
                          props.language === "en"
                            ? "€" +
                              formatNumber(
                                series[seriesIndex][dataPointIndex],
                                props.language
                              )
                            : formatNumber(
                                series[seriesIndex][dataPointIndex],
                                props.language
                              ) + "€"
                        }
                  </p>
                  </div>
                </div>`;
          },
        },
        title: {
          text: ``,
          floating: true,
          offsetY: 0,
          align: "center",
          style: {
            color: "#444",
            fontSize: "14px",
            fontWeight: "200",
          },
        },
      },
      menMean: 0,
      womenMean: 0,
      menMeanOccupation: 0,
      womenMeanOccupation: 0,
      region: undefined,
      isco: undefined,
      code: undefined,
    };

    this.getAllMean = this.getAllMean.bind(this);
    this.getRegion = this.getRegion.bind(this);
    this.componentRef = React.createRef();
    this.getAllMean();
  }

  setOccupationName(props) {
    let options = this.state.options;

    options.xaxis.categories[0] = [occupationLabel];

    if (props.language === "en"){
      if (props.region === overall || props.region==="")
        options.xaxis.categories[1] = [`County`];
      else
        options.xaxis.categories[1] = [
          `${this.translateCounty(props.region)}`,
          `${columnChartOccupationLabel[1]}`,
        ];
      }
    else
      options.xaxis.categories[1] = [
        `${columnChartOccupationLabel[0]} ${this.translateCounty(
          props.region
        )}`,
        `${columnChartOccupationLabel[1]}`,
      ];
    this.setState({ options: options });
  }

  translateCounty(countySelected) {
    if (countySelected === overall) return "";
    let county = countySelected.replace("maakond", "");
    switch (this.props.language) {
      case "et":
        return county;
      case "ru":
        if (countySelected === "") return "уезду";
        else
          return counties[countySelected] === undefined
            ? averageDataSpec[2]
            : counties[countySelected];
      case "en":
        if (countySelected === "") return "County";
        return county;
      default:
        return county;
    }
  }

  componentWillReceiveProps(props) {
    this.setOccupationName(props);
    this.getMean(props.region, props.isco, props.code, props.type);
    this.getMeanForRegion(props.region);

    this.setState({
      occupation: props.occupation,
      options: {
        ...this.state.options,
        tooltip: {
          ...this.state.options.tooltip,
          y: {
            formatter: function (val) {
              return val + " €";
            },
          },
          custom: this.getOccupation,
        },
      },
    });
  }

  getRegion(data) {
    return `<div class="arrow-box-small text-left"> 
                  <p class="arrow-box-p">
                    ${data.w.globals.labels[data.dataPointIndex]}: <br/>
                    <br/>
                    ${this.state.occupation} : 
                        ${formatNumber(
                          data.series[data.seriesIndex][data.dataPointIndex],
                          this.props.language
                        )} €
                  </p>
                </div>`;
  }

  getAllMean() {
    let url = `${API_URL}/average?region=All`;
    axios.get(url).then((data) => {
      let menMean = parseInt(data.data.payload.maleAverage);
      let womenMean = parseInt(data.data.payload.femaleAverage);

      this.setState({
        series: [
          {
            name: genderLabel[0],
            data: [
              this.state.menMeanOccupation,
              this.state.menMeanRegion,
              menMean,
            ],
          },
          {
            name: genderLabel[1],
            data: [
              this.state.womenMeanOccupation,
              this.state.womenMeanRegion,
              womenMean,
            ],
          },
        ],
        menMean: menMean,
        womenMean: womenMean,
        region: "",
      });
    });
  }

  getMean(region, isco, code, type) {
    if (region === overall) {
      this.setState({
        series: [
          {
            name: genderLabel[0],
            data: [
              this.props.menGraphMean,
              this.state.menMeanRegion,
              this.state.menMean,
            ],
          },
          {
            name: genderLabel[1],
            data: [
              this.props.womenGraphMean,
              this.state.womenMeanRegion,
              this.state.womenMean,
            ],
          },
        ],
      });
    }if(isco==="" || code===""){
      this.setState({
        series: [
          {
            name: genderLabel[0],
            data: [
              0,
              this.state.menMeanRegion,
              this.state.menMean,
            ],
          },
          {
            name: genderLabel[1],
            data: [
              0,
              this.state.womenMeanRegion,
              this.state.womenMean,
            ],
          },
        ],
        menMeanOccupation: 0,
        womenMeanOccupation: 0,
      });
    } 
    else {
      let url =
        `${API_URL}/jobs?region=` +
        "all" +
        "&isco=" +
        isco +
        "&code=" +
        code +
        "&lang=" +
        lng;

      if (
        isco !== "" &&
        !(isco === this.state.isco && region === this.state.region)
      ) {
        this.setState({
          code: code,
          isco: isco,
          region: region,
        });
        axios
          .get(url)
          .then((response) => response.data)
          .then((data) => {
            let entities = data.payload.salaryEntities;
            let jobEntity = data.payload.jobEntity;
            if (jobEntity !== undefined && entities[0] !== undefined) {
              if (entities[0].region !== "All") {
                let menMean = 0;
                let womenMean = 0;

                if (entities[0] !== undefined) {
                  if (entities[0].female === "1") womenMean = entities[0].mean;
                  else menMean = entities[0].mean;
                }
                if (entities[1] !== undefined) {
                  if (entities[1].female === "1") womenMean = entities[1].mean;
                  else menMean = entities[1].mean;
                }
                this.setState({
                  series: [
                    {
                      name: genderLabel[0],
                      data: [
                        menMean,
                        this.state.menMeanRegion,
                        this.state.menMean,
                      ],
                    },
                    {
                      name: genderLabel[1],
                      data: [
                        womenMean,
                        this.state.womenMeanRegion,
                        this.state.womenMean,
                      ],
                    },
                  ],
                  menMeanOccupation: menMean,
                  womenMeanOccupation: womenMean,
                });
              }
            }
          });
      }
    }
  }

  getMeanForRegion(region) {
    if (region !== this.state.region) {
      this.setState({ region: region });
      let url = `${API_URL}/average?region=${region}`;

      axios
        .get(url)
        .then((response) => response.data)
        .then((data) => {
          let averages = data.payload;
          this.setState({
            series: [
              {
                name: genderLabel[0],
                data: [
                  this.state.menMeanOccupation,
                  averages.maleAverage,
                  this.state.menMean,
                ],
              },
              {
                name: genderLabel[1],
                data: [
                  this.state.womenMeanOccupation,
                  averages.femaleAverage,
                  this.state.womenMean,
                ],
              },
            ],
            menMeanRegion: averages.maleAverage,
            womenMeanRegion: averages.femaleAverage,
          });
        });
    }
  }

  async promiseState() {
    new Promise((resolve) => {
      setTimeout(() => resolve(""), 3000);
      this.setState({ mapDownloadMenu: !this.state.mapDownloadMenu }, resolve);
    });
  }

  render() {
    return (
      <div>
        <div
          id="chart-column"
          className={"text-center mx-auto p-2"}
          ref={this.componentRef}
        >
          <p
            className="graph-legends mx-auto pl-4 h4-stat text-left w-100"
            style={{ height: "40px", position: "absolute" }}
          >
            {columnchartLabel +
              ` | ${this.props.dates.salaryEntityDateQuarter} ${quarter} ${this.props.dates.salaryEntityDate} `}
          </p>
          <br />
          <br />
          <div id="agebar-chart" className={"mb-0 mt-3"}>
            <ReactApexChart
              id="apexchart"
              className={"ml-2"}
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height={300}
              width={360}
            />
          </div>
          <div className="columnchart-xaxis-label h6-stat-gray-label">
            <p className="h6-stat-gray-label">{`€/${monthLabel}`}</p>
          </div>
          <div className={"source-tip"}>
            <p className={"source-label-style h6-stat font-weight-bold"}>
              {source}
            </p>
          </div>
          <div className="graph-legends mx-auto pl-5">
            {displayLegends(menColor, womenColor)}
          </div>

         

          {this.props.generalName !== null ? (
            <p className="graph-legends mx-auto pl-4 h6-stat-gray text-left mt-1">
              {`* ${this.props.generalName} (${this.props.occupationCode})`}
            </p>
          ) : (
            <p className="graph-legends mx-auto pl-4 h6-stat-gray text-left mt-1">
              {` `}
            </p>
          )}
        </div>

        <div className="apexcharts-toolbar apexcharts-toolbar-holder">
            <div
              className="apexcharts-menu-icon"
              style={{}}
              title="Menu"
              onClick={() => {
                this.setState({ mapDownloadMenu: !this.state.mapDownloadMenu, options: {...this.state.options, tooltip: {...this.state.options.tooltip, enabled: this.state.mapDownloadMenu} }});
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </div>
            <div
              className={
                "apexcharts-menu " +
                (this.state.mapDownloadMenu ? "apexcharts-menu-open" : "")
              }
            >
              <div
                className="apexcharts-menu-item exportPNG"
                onClick={() => {
                  this.promiseState().then(() =>
                    exportComponentAsPNG(this.componentRef)
                  );
                  this.setState({ mapDownloadMenu: !this.state.mapDownloadMenu, options: {...this.state.options, tooltip: {...this.state.options.tooltip, enabled: this.state.mapDownloadMenu} }});
                }}
                title={downloadPng}
              >
                {downloadPng}
              </div>
              <div
                className="apexcharts-menu-item exportPDF"
                title={downloadJpeg}
                onClick={() => {
                  this.promiseState().then(() =>
                    exportComponentAsJPEG(this.componentRef)
                  );
                  this.setState({ mapDownloadMenu: !this.state.mapDownloadMenu, options: {...this.state.options, tooltip: {...this.state.options.tooltip, enabled: this.state.mapDownloadMenu} }});
                }}
              >
                {downloadJpeg}
              </div>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(ColumnChartComponent);
