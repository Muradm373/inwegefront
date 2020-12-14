import axios from "axios";
import React, { Component } from "react";
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

    if (
      props.code !== undefined &&
      props.code !== "" &&
      props.type === "all"
    ) {
      this.getAllMean();
    }else{
      this.getMean(props.region, props.isco);
      this.setState({region: props.region})
    }
  }

  getAllMean() {
    let url = `${API_URL}/entities/count-worker`;
    axios.get(url).then((data) => {
      let men;
      let women;

      if(data.data.payload[0].female !== undefined) {

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
      }
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

        if(payload[0] !== undefined) {

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
        }
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="row m-3">
            <img
              className="col"
              alt={""}
              src={require("../../../resources/male.svg")}
              height="60"
              width="60"
            />
            <div>
              <p className="mb-2 h6-stat-gray">{workingMen}</p>
              <p
                className="shiny-html body-stat text-center"
                id="maleAmount"
                style={{ fontSize: "18pt" }}
              >
                {this.state.men === 0 ? "<20 " : this.state.men}
              </p>
            </div>
          </div>
          <div className="row m-3">
            <img
              className="col"
              src={require("../../../resources/female.svg")}
              alt={""}
              height="60"
              width="60"
            />
            <div>
              <p className="mb-2 h6-stat-gray">{workingWomen}</p>
              <p
                className="shiny-html body-stat text-center"
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
