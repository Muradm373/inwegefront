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
  columnchartLabel, quarter,
} from "../../../dictionary/text";
import {connect} from "react-redux";
import {displayLegends} from "./Graph";

class ColumnChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
            vertical: 27
          },
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [averageDataSpec[0],  averageDataSpec[1], averageData,],
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val + "€/" + monthLabel;
            },
          },
          tickAmount: 5
        },
        fill: {
          opacity: 1,
        },

        tooltip: {
          y: {
            formatter: function (val) {
              return val + "€";
            },
          },
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            return (
                `<div class="arrow-box-small text-left wrap-stat">
                ${w.globals.labels[dataPointIndex]}: 
                <br/>
                ${w.globals.seriesNames[seriesIndex]}: ${series[seriesIndex][dataPointIndex]} 
                </div>`            );
          }
        },
        title: {
          text: columnchartLabel + `, ${this.props.dates.salaryEntityDate} (${this.props.dates.salaryEntityDateQuarter} ${quarter})`,
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
    this.getAllMean();
  }

  setOccupationName(props) {
    let options = this.state.options;

    options.xaxis.categories[0] = [occupationLabel];
    options.xaxis.categories[1] = [props.region.split(" ")[0]];
    this.setState({ options: options });
  }

  componentWillReceiveProps(props) {
    this.setOccupationName(props);
    this.getMean(props.region, props.isco, props.code, props.type);
    this.getMeanForRegion(props.region);

    this.setState({ occupation:props.occupation,options: {
        ...this.state.options, tooltip: {
          y: {
            formatter: function (val) {
              return val + "%";
            },
          },
          custom: this.getOccupation
        },
      }
    })
  }

  getRegion(data){
    return (
        `<div class="arrow_box text-left"> 
                  <p class="arrow-box-p">
                    ${data.w.globals.labels[data.dataPointIndex]}: <br/>
                    
                    ${this.splitWords(this.state.occupation, 30)} : 
                        ${data.series[data.seriesIndex][data.dataPointIndex]}%
                  </p>
                </div>`
    );
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
    let url =
      `${API_URL}/jobs?region=` +
      region +
      "&isco=" +
      isco +
      "&code=" +
      code +
      "&lang=" +
      lng;

    if (
      isco !== "" &&
      !(isco === this.state.isco &&
      region === this.state.region)
    ) {
      this.setState({                code: code,
        isco: isco,
        region: region})
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

  render() {
    return (
      <div id="chart" className={"row text-center age-bar mx-auto"}>
        <ReactApexChart
          id="apexchart"
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={300}
          width = {360}
        />
        <div className="graph-legends">
          {displayLegends(menColor, womenColor)}
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

export default  connect(mapStateToProps) (ColumnChartComponent);
