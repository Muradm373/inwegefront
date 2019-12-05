import React, { Component } from "react";
import axios from "axios";
import EntityComponent from "./EntityComponent";
import PieChartComponent from "./PieChart";
import Select from "react-select";
import {
  noDescr,
  averageLabel,
  differenceLabel,
  genderLabel,
  lng,
  selectRegion,
  selectOccupation
} from "../text";

const API_URL = "https://inwege.herokuapp.com/api";
const lang = "&lang=";

class GraphComponent extends Component {
  state = {
    regions: [],
    entities: [],
    iscos: [],
    isco: "",
    region: "",
    regionSelected: false,
    iscoSelected: false,
    description: noDescr,
    occupation: "",
    mean: [],
    code: "",
    menColor: "#7db0ff",
    womenColor: "#f00044",
    display: false
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
    const region = event.value;
    const isco = this.state.isco;
    const code = this.state.code;

    this.requestFields(region);
    if (this.state.isco !== "") {
      this.request(region, isco, code);
    }
    this.setState({ region: region, regionSelected: true });
  };

  onIscoChange = event => {
    const region = this.state.region;

    let isco = event.value.iscoValid;
    let code = event.value.code;

    this.setState({ isco: isco, iscoSelected: true, code: code });
    this.request(region, isco, code);

    this.setState({ occupation: event.value.name });
  };

  request(region, isco, code) {
    const url =
      `${API_URL}/jobs?region=` +
      region +
      "&isco=" +
      isco +
      "&code=" +
      code +
      lang +
      lng;

    console.log(url);
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        if (
          data.payload.jobEntity !== undefined &&
          data.payload.salaryEntities !== undefined
        ) {
          let description = data.payload.jobEntity.description;
          this.setState({
            entities: data.payload.salaryEntities,
            description: description
          });
        } else {
          this.setState({
            entities: [],
            display: false,
            description: noDescr
          });
        }
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
  }

  requestFields(region) {
    const url = `${API_URL}/`;
    axios
      .get(url + "jobs/names?region=" + region + lang + lng)
      .then(response => response.data)
      .then(data => {
        let names = [];
        data.payload.forEach(element => {
          names.push({
            label: element.name,
            value: element
          });
        });
        this.setState({ iscos: names });
      });
  }

  render() {
    return (
      <div>
        <div>
          <Select
            onChange={this.onRegionChange}
            options={this.state.regions}
            placeholder={selectRegion}
          ></Select>
          <Select
            onChange={this.onIscoChange}
            options={this.state.iscos}
            placeholder={selectOccupation}
          ></Select>
        </div>
        <div className="graphContainer">
          <EntityComponent
            entities={this.state.entities}
            menColor={this.state.menColor}
            womenColor={this.state.womenColor}
            differenceLabel={differenceLabel}
            genderLabel={genderLabel}
          ></EntityComponent>
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
              {this.state.description}
            </p>
            <div
              style={{
                flex: 1,
                marginRight: "5px",
                display: "flex",
                visibility: this.state.iscoSelected ? "visible" : "hidden"
              }}
            >
              <PieChartComponent
                key="PieChart"
                mean={this.state.mean}
                menColor={this.state.menColor}
                womenColor={this.state.womenColor}
                averageLabel={averageLabel + this.state.occupation}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GraphComponent;
