import axios from "axios";
import React, { Component } from "react";
import { RadialChart } from "react-vis";
import { API_URL, workingWomen, workingMen } from "../../../dictionary/text";

class PieChartComponent extends Component {
  constructor() {
    super();

    this.state = {
      men: 0,
      women: 0,
      region: ""
    };

    this.getAllMean();
  }

  componentWillReceiveProps(props) {
    if (props.region !== "" && props.region !== this.state.region) {
      this.getMean(props.region, props.isco);
      this.setState({region: props.region})
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
        men: parseInt(men),
        women: parseInt(women),
      });
    });
  }

  getMean(region, isco) {
    let url;

    if (isco !== "")
      url =
        `${API_URL}/entities/count-worker?region=` + region + "&isco=" + isco;
    else url = `${API_URL}/entities/count-worker?region=` + region;

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

        this.setState({
          men: parseInt(men),
          women: parseInt(women),
        });
      });
  }

  render() {
    return (
      <div>
        <div class="row">
          <div class="row m-3">
            <img
              className="col"
              src={require("../../../resources/male.svg")}
              height="60"
              width="60"
            />
            <div>
              <p className="mb-2">{workingMen}</p>
              <p
                class="shiny-html"
                id="maleAmount"
                style={{ fontSize: "18pt" }}
              >
                {this.state.men === 0 ? "<20 " : this.state.men}
              </p>
            </div>
          </div>
          <div class="row m-3">
            <img
              className="col"
              src={require("../../../resources/female.svg")}
              height="60"
              width="60"
            />
            <div>
              <p className="mb-2">{workingWomen}</p>
              <p
                class="shiny-html"
                id="femaleAmount"
                style={{ fontSize: "18pt" }}
              >
                {this.state.women === 0 ? "<20 " : this.state.women}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PieChartComponent;
