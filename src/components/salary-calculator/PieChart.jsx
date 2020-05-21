import React, { Component } from "react";
import { menColor, womenColor, API_URL, lng } from "../../text";
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
          label: parseInt(1000),
          color: menColor,
        },
        {
          angle: 1000,
          radius: 5,
          label: parseInt(1000),
          color: womenColor,
        },
      ],
    };

    this.getAllMean();
  }

  componentWillReceiveProps(props) {
    if (props.isco != "") {
      this.getMean(props.region, props.isco);
    } else if (
      props.code !== undefined &&
      props.code !== "" &&
      props.type === "all"
    ) {
      this.getAllMean();
    }
  }

  getAllMean() {
    let url = `${API_URL}/entities/count-worker`;
    axios.get(url).then((data) => {
      let men;
      let women;

      if (data.data.payload[0].female === 0) {
        men = data.data.payload[0].count;
        women = data.data.payload[1].count;
      } else {
        men = data.data.payload[1].count;
        women = data.data.payload[0].count;
      }
      this.setState({
        data: [
          {
            angle: men,
            radius: 5,
            label: parseInt(men),
            color: menColor,
          },
          {
            angle: women,
            radius: 5,
            label: parseInt(women),
            color: womenColor,
          },
        ],
      });
    });
  }

  getMean(region, isco) {
    console.log(region + " " + isco);
    let url =
      `${API_URL}/entities/count-worker?region` + region + "&isco=" + isco;

    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => data.payload)
      .then((payload) => {
        let men;
        let women;

        if (payload[0].female === 0) {
          men = payload[0].count;
          women = payload[1].count;
        } else {
          men = payload[1].count;
          women = payload[0].count;
        }

        let data = [
          {
            angle: men,
            radius: 5,
            label: parseInt(men),
            color: menColor,
          },
          {
            angle: women,
            radius: 5,
            label: parseInt(women),
            color: womenColor,
          },
        ];

        this.setState({ data: data });
      });
  }

  render() {
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
