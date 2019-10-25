import React, { Component } from "react";
import axios from "axios";
import EntityComponent from "./EntityComponent";
import PieChartComponent from "./PieChart";
import Select from "react-select";
const API_URL = "https://inwege.herokuapp.com/api";
const lang = "&lang=en";

class GraphComponent extends Component {
  state = {
    regions: [],
    entities: [],
    iscos: [],
    isco: "",
    region: "",
    regionSelected: false,
    iscoSelected: false,
    description: "",
    mean: []
  };

  componentDidMount() {
    const url = `${API_URL}/`;
    axios
      .get(url + "regions/")
      .then(response => response.data)
      .then(data => {
        let dict = [];
        data.payload.forEach(element => {
          dict.push({ label: element, value: element });
        });
        this.setState({ regions: dict });
      });
  }

  onRegionChange = event => {
    const url = `${API_URL}/`;
    const region = event.value;

    axios
      .get(url + "jobs/names?region=" + region + lang)
      .then(response => response.data)
      .then(data => {
        //this.setState({ iscos: data.payload });
        let names = [];
        data.payload.forEach(element => {
          names.push({
            label: element.name,
            value: element
          });
        });
        this.setState({ iscos: names });
      });

    this.setState({ region: region, regionSelected: true });
  };

  onIscoChange = event => {
    const region = this.state.region;

    let isco = event.value.iscoValid;
    let code = event.value.code;

    this.setState({ isco: isco, iscoSelected: true });
    const url =
      `${API_URL}/jobs?region=` +
      region +
      "&isco=" +
      isco +
      "&code=" +
      code +
      lang;
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        let description = data.payload.jobEntity.description;
        this.setState({
          entities: data.payload.salaryEntities,
          description: description
        });
      });

    const url_mean = `${API_URL}/average-mean?isco=${isco}`;
    axios
      .get(url_mean)
      .then(response => response.data)
      .then(data => {
        let mean = data.payload;
        this.setState({
          mean: mean
        });
      });
  };

  render() {
    return (
      <div>
        <div>
          <Select
            onChange={this.onRegionChange}
            options={this.state.regions}
            placeholder="Select region"
          ></Select>
          <Select
            onChange={this.onIscoChange}
            options={this.state.iscos}
            placeholder="Select job title"
          ></Select>
        </div>
        <div className="graphContainer">
          <EntityComponent entities={this.state.entities}></EntityComponent>
          <div
            style={{
              flexDirection: "row",
              display: "flex"
            }}
          >
            <p
              style={{
                flex: 5,
                display: "flex",
                alignSelf: "stretch",
                textAlign: "left"
              }}
            >
              {this.state.description === ""
                ? "No description"
                : this.state.description}
            </p>
            <div
              style={{
                flex: 1,
                marginRight: "5px",
                display: "flex",
                visibility: this.state.iscoSelected ? "visible" : "hidden"
              }}
            >
              <PieChartComponent key="PieChart" mean={this.state.mean} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GraphComponent;
