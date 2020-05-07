/* eslint-disable */
import React, { Component } from "react";
import axios from "axios";
import Graph from "./Graph";
import ReactTooltip from "react-tooltip";
import {
  noDescr,
  averageLabel,
  differenceLabel,
  genderLabel,
  lng,
  selectRegion,
  selectOccupation,
  leaveAFeedBack,
  API_URL,
  salary,
  menColor,
  womenColor,
} from "../../text";
import "react-svg-map/lib/index.css";
import { getLocationName } from "../../utils/utils";
const lang = "&lang=";
import MapSelector from "./MapSelector";
import GenderSelector from "./GenderSelector";
import RegionSelector from "./RegionSelector";
import OccupationSelector from "./OccupationSelector";

class SalaryCalculator extends Component {
  state = {
    entities: [],
    iscos: [],
    isco: "",
    region: "",
    description: noDescr,
    occupation: "",
    mean: [],
    code: "",
    wage: undefined,
    gender: genderLabel[0],
    content: "",
  };

  constructor() {
    super();

    this.onSalaryChange = this.onSalaryChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.setContent = this.setContent.bind(this);
    this.changeWage = this.changeWage.bind(this);
  }

  setContent(content) {
    this.setState({ content: content });
  }

  onRegionChange = (event) => {
    const region = event.value;
    const isco = this.state.isco;
    const code = this.state.code;
    if (this.state.isco !== "") {
      this.getSalaryEntitiesForRegionAndIsco(region, isco, code);
    }
    this.setState({ region: region });
  };

  onIscoChange = (event) => {
    const region = this.state.region;

    let isco = event.value.iscoValid;
    let code = event.value.code;

    this.setState({ isco: isco, code: code });
    this.getSalaryEntitiesForRegionAndIsco(region, isco, code);

    this.props.onDataChange(this.state.region, isco, code, event.value.name);
    this.setState({ occupation: event.value.name });
  };

  getSalaryEntitiesForRegionAndIsco(region, isco, code) {
    const url =
      `${API_URL}/jobs?region=` +
      region +
      "&isco=" +
      isco +
      "&code=" +
      code +
      lang +
      lng;

    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => this.parseSalaryEntities(data))
      .then((response) => response.data)
      .then((data) => {
        let mean = data.payload;
        this.setState({
          mean: mean,
        });
      });
  }

  parseSalaryEntities(data) {
    let entities = data.payload.salaryEntities;
    let jobEntity = data.payload.jobEntity;
    if (jobEntity !== undefined && entities !== undefined) {
      if (entities[0].region !== "All") {
        let description = jobEntity.description;
        this.setState({
          entities: entities,
          description: description,
        });
      } else {
        this.setState({
          entities: entities,
          description: noDescr,
        });
      }
    } else {
      this.setState({
        entities: [],
        description: noDescr,
      });
    }
    return axios.get(`${API_URL}/jobs/${this.state.entities[0].id}/average`);
  }

  onSalaryChange(event) {
    if (
      event.target.value < 1000000 &&
      event.target.value >= 0 &&
      !isNaN(event.target.value)
    )
      this.setState({ wage: event.target.value });
  }

  onGenderChange(event) {
    this.setState({ gender: event.value });
  }

  changeWage(d) {
    if (this.state.wage == d.left) this.setState({ wage: d.right });
    else this.setState({ wage: d.left });
  }

  render() {
    return (
      <div>
        <div className="graph-component">
          <div
            className="map_selector p-3"
            style={{ width: "65%", marginLeft: "10%", marginTop: "-10%" }}
          >
            <MapSelector
              onRegionChange={this.onRegionChange}
              setTooltipContent={this.setContent}
              mapElementColor={this.props.mapElementColor}
            />
            <ReactTooltip>{this.state.content}</ReactTooltip>
          </div>

          <RegionSelector onChange={this.onRegionChange} />

          <OccupationSelector
            onChange={this.onIscoChange}
            region={this.state.region}
          />

          <div className="row">
            <div className="salary_select  mb-md-1">
              <input
                name="salary"
                className="form-control"
                onChange={this.onSalaryChange}
                type="number"
                placeholder={`${salary[0]} ${salary[1]}`}
                value={this.state.wage}
              />
            </div>
            <GenderSelector onGenderChange={this.onGenderChange} />
          </div>
        </div>

        <div className="col-xl my-4" data-aos="fade-up" data-aos-delay="200">
          <Graph
            entities={this.state.entities}
            menColor={menColor}
            womenColor={womenColor}
            differenceLabel={differenceLabel}
            changeWage={this.changeWage}
            genderLabel={genderLabel}
            myWage={this.state.wage}
            myGender={this.state.gender}
            occupation={this.state.occupation}
          ></Graph>
          <div className="donutHolder">
            <p
              style={{
                flex: 5,
                display: "flex",
                textAlign: "left",
              }}
            >
              {this.state.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SalaryCalculator;
