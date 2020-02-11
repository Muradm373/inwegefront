import React, { Component } from "react";
import { menColor, womenColor, API_URL, lng } from "../text";
import axios from "axios";

import { RadialChart } from "react-vis";

class PieChartComponent extends Component {
  constructor() {
    super();

    this.state = {
      data: [
        {
          angle: 1000,
          radius: 5,
          label: "€" + parseInt(1000),
          color: menColor
        },
        {
          angle: 1000,
          radius: 5,
          label: "€" + parseInt(1000),
          color: womenColor
        }
      ]
    };

    this.getAllMean();
  }

  componentWillReceiveProps(props) {
    if (
      props.code !== undefined &&
      props.code !== "" &&
      props.type === "occupation"
    ) {
      this.getMean(props.region, props.isco, props.code);
    } else if (
      props.code !== undefined &&
      props.code !== "" &&
      props.type === "all"
    ) {
      this.getAllMean();
    }
  }
  updatePiechart(mean) {
    let data = [];
    if (mean[0] !== undefined) {
      this.meanMen = mean[0].mean;
      this.meanWomen = mean[1].mean;

      data = [
        {
          angle: this.meanMen,
          radius: 5,
          label: "€" + parseInt(this.meanMen),
          color: menColor
        },
        {
          angle: this.meanWomen,
          radius: 5,
          label: "€" + parseInt(this.meanWomen),
          color: womenColor
        }
      ];
    }

    this.setState({ data: data });
  }

  getAllMean() {
    let url = `${API_URL}/average?region=All`;
    axios.get(url).then(data => {
      this.setState({
        data: [
          {
            angle: data.data.payload.maleAverage,
            radius: 5,
            label: "€" + parseInt(data.data.payload.maleAverage),
            color: menColor
          },
          {
            angle: data.data.payload.femaleAverage,
            radius: 5,
            label: "€" + parseInt(data.data.payload.femaleAverage),
            color: womenColor
          }
        ]
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
      .then(response => response.data)
      .then(data => this.getSalaryEntities(data))
      .then(data => data.data.payload)
      .then(mean => {
        this.updatePiechart(mean);
      });
  }

  getSalaryEntities = data => {
    let entities = data.payload.salaryEntities;
    let jobEntity = data.payload.jobEntity;
    let entitiesContainer = [];
    if (jobEntity !== undefined && entities !== undefined) {
      entitiesContainer = entities;
    } else {
      this.setState({
        entities: []
      });
    }
    return axios.get(`${API_URL}/jobs/${entitiesContainer[0].id}/average`);
  };

  render() {
    let data = [];
    return (
      <div>
        <RadialChart
          className={"donut-chart-example"}
          opacity={0.9}
          innerRadius={50}
          radius={55}
          height={200}
          width={250}
          colorType="literal"
          data={this.state.data}
          padAngle={0.04}
          showLabels={true}
          labelsRadiusMultiplier={2.2}
        ></RadialChart>
      </div>
    );
  }
}

export default PieChartComponent;
