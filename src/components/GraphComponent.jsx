import React, { Component } from "react";
import axios from "axios";
import EntityComponent from "./EntityComponent";

const API_URL = "https://inwege.herokuapp.com/api";

class GraphComponent extends Component {
  state = {
    regions: [],
    entities: [],
    iscos: [],
    isco: "",
    region: "",
    regionSelected: false,
    iscoSelected: false
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

  retrieveData = () => {};

  onRegionChange = event => {
    const url = `${API_URL}/`;
    const region = event.target.value;

    axios
      .get(url + "iscos?region=" + region)
      .then(response => response.data)
      .then(data => {
        this.setState({ iscos: data.payload });
      });

    this.setState({ region: region, regionSelected: true });
  };

  onIscoChange = event => {
    const region = this.state.region;
    const isco = event.target.value;

    this.setState({ isco: isco, iscoSelected: true });

    const url =
      `${API_URL}/salary-entities?region=` + region + "&iscoValid=" + isco;
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({ entities: data.payload });
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
              <option key={isco} value={isco} className="alert alert-primary">
                {isco}
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
        </div>
      </div>
    );
  }
}

export default GraphComponent;
