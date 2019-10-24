import React, { Component } from "react";
import axios from "axios";
import EntityComponent from "./EntityComponent";
import PieChartComponent from "./PieChart";

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
    description: ""
  };

  componentDidMount() {
    const url = `${API_URL}/`;
    axios
      .get(url + "regions/")
      .then(response => response.data)
      .then(data => {
        this.setState({ regions: data.payload });
      });
  }

  onRegionChange = event => {
    const url = `${API_URL}/`;
    const region = event.target.value;

    axios
      .get(url + "jobs/names?region=" + region + lang)
      .then(response => response.data)
      .then(data => {
        //this.setState({ iscos: data.payload });
        let names = [];
        data.payload.forEach(element => {
          names.push({
            name: element.name,
            id: element.id,
            iscoValid: element.iscoValid
          });
        });
        this.setState({ iscos: names });
      });

    this.setState({ region: region, regionSelected: true });
  };

  onIscoChange = event => {
    const region = this.state.region;
    let isco = event.target.value;

    isco = isco.split(",");

    this.setState({ isco: isco, iscoSelected: true });
    const url =
      `${API_URL}/jobs?region=` +
      region +
      "&isco=" +
      isco[1] +
      "&code=" +
      isco[0] +
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
  };

  render() {
    return (
      <div>
        <div className="btn-group">
          <select className="mdb-select md-form" onChange={this.onRegionChange}>
            {this.state.regions.map(region => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            className="list-group-item list-group-item-action active"
            onChange={this.onIscoChange}
            style={{
              visibility: this.state.regionSelected ? "visible" : "hidden"
            }}
          >
            {this.state.iscos.map(isco => (
              <option
                key={isco.id}
                value={[isco.id, isco.iscoValid]}
                className="alert alert-primary"
              >
                {isco.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className="graphContainer"
          style={{
            visibility: this.state.iscoSelected ? "visible" : "hidden"
          }}
        >
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
              {this.state.description}
            </p>
            <div style={{ flex: 1, marginRight: "5px", display: "flex" }}>
              <PieChartComponent key="PieChart" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GraphComponent;
