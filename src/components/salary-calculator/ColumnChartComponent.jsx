import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { menColor, womenColor, API_URL, lng } from "../../text";
import axios from "axios";

class ColumnChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "Men",
          data: [0, 0, 0],
        },
        {
          name: "Women",
          data: [0, 0, 0],
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
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Average for occupation",
            "Average for Estonia",
            "Average for county",
          ],
        },
        yaxis: {
          title: {
            text: "Euros",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "€ " + val;
            },
          },
        },
      },
      menMean: 0,
      womenMean: 0,
      menMeanOccupation: 0,
      womenMeanOccupation: 0,
    };

    this.getAllMean = this.getAllMean.bind(this);
    this.getAllMean();
  }

  setOccupationName(props) {
    let occupationName = props.occupation;
    let region = props.region;

    let options = this.state.options;
    let occupationArray = occupationName.split(" ");
    if (occupationArray.length >= 3) {
      options.xaxis.categories[0] = [
        "Average for ",
        occupationArray[0],
        occupationArray[1] + " " + occupationArray[2],
      ];
    } else {
      options.xaxis.categories[0] = [
        "Average for ",
        occupationName === "" ? "occupation" : occupationName,
      ];
    }
    options.xaxis.categories[2] = [
      "Average for ",
      region === "" ? "county" : region,
    ];
    this.setState({ options: options });
  }

  componentWillReceiveProps(props) {
    this.setOccupationName(props);
    this.getAllMean();

    this.getMean(props.region, props.isco, props.code, props.type);
    this.getMeanForRegion(props.region);
  }

  getAllMean() {
    let url = `${API_URL}/average?region=All`;
    axios.get(url).then((data) => {
      let menMean = parseInt(data.data.payload.maleAverage);
      let womenMean = parseInt(data.data.payload.femaleAverage);

      this.setState({
        series: [
          {
            name: "Men",
            data: [
              this.state.menMeanOccupation,
              menMean,
              this.state.menMeanRegion,
            ],
          },
          {
            name: "Women",
            data: [
              this.state.womenMeanOccupation,
              womenMean,
              this.state.womenMeanRegion,
            ],
          },
        ],
        menMean: menMean,
        womenMean: womenMean,
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

    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        let entities = data.payload.salaryEntities;
        let jobEntity = data.payload.jobEntity;
        if (jobEntity !== undefined && entities !== undefined) {
          if (entities[0].region !== "All") {
            let menMean = 0;
            let womenMean = 0;

            if (entities[0] != undefined) {
              if (entities[0].female === "1") womenMean = entities[0].mean;
              else menMean = entities[0].mean;
            }
            if (entities[1] != undefined) {
              if (entities[1].female === "1") womenMean = entities[1].mean;
              else menMean = entities[1].mean;
            }

            this.setState({
              series: [
                {
                  name: "Men",
                  data: [menMean, this.state.menMean, this.state.menMeanRegion],
                },
                {
                  name: "Women",
                  data: [
                    womenMean,
                    this.state.womenMean,
                    this.state.womenMeanRegion,
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

  getMeanForRegion(region) {
    let url = `${API_URL}/average?region=${region}`;

    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        let averages = data.payload;
        this.setState({
          series: [
            {
              name: "Men",
              data: [
                this.state.menMeanOccupation,
                this.state.menMean,
                averages.maleAverage,
              ],
            },
            {
              name: "Women",
              data: [
                this.state.womenMeanOccupation,
                this.state.womenMean,
                averages.femaleAverage,
              ],
            },
          ],
          menMeanRegion: averages.maleAverage,
          womenMeanRegion: averages.femaleAverage,
        });
      });
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          id="apexchart"
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={400}
        />
      </div>
    );
  }
}

export default ColumnChartComponent;
