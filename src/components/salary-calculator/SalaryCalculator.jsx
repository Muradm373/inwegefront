/* eslint-disable */
import React, { Component } from "react";
import axios from "axios";
import Graph from "./Graph";
import Select from "react-select";
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
  womenColor
} from "../../text";
import "react-svg-map/lib/index.css";
import { getLocationName } from "../../utils/utils";
const lang = "&lang=";
import MapSelector from "./MapSelector";

class SalaryCalculator extends Component {
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
    wage: 0,
    gender: genderLabel[0],
    userToken: null,
    feedbacks: [],
    pointedLocation: null,
    content: ""
  };

  constructor() {
    super();

    this.onSalaryChange = this.onSalaryChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.getOccupations = this.getOccupations.bind(this);
    this.setContent = this.setContent.bind(this);
  }

  setContent(content) {
    this.setState({ content: content });
  }
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

    this.getOccupations(region);
    if (this.state.isco !== "") {
      this.getMean(region, isco, code);
    }
    this.setState({ region: region, regionSelected: true });
  };

  onIscoChange = event => {
    const region = this.state.region;

    let isco = event.value.iscoValid;
    let code = event.value.code;

    this.setState({ isco: isco, iscoSelected: true, code: code });
    this.getMean(region, isco, code);

    this.props.onDataChange(this.state.region, isco, code, event.value.name);
    this.setState({ occupation: event.value.name });
  };

  getMean(region, isco, code) {
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
      .then(response => response.data)
      .then(data => this.getSalaryEntities(data))
      .then(response => response.data)
      .then(data => {
        let mean = data.payload;
        this.setState({
          mean: mean
        });
      });
  }

  getSalaryEntities(data) {
    let entities = data.payload.salaryEntities;
    let jobEntity = data.payload.jobEntity;
    if (jobEntity !== undefined && entities !== undefined) {
      if (entities[0].region !== "All") {
        let description = jobEntity.description;
        this.setState({
          entities: entities,
          description: description
        });
      } else {
        this.setState({
          entities: entities,
          description: noDescr
        });
      }
    } else {
      this.setState({
        entities: [],
        description: noDescr
      });
    }
    return axios.get(`${API_URL}/jobs/${this.state.entities[0].id}/average`);
  }

  getOccupations(region) {
    const url = `${API_URL}/`;
    axios
      .get(url + "jobs/names?region=" + region + lang + lng)
      .then(response => {
        return response.data;
      })
      .then(data => {
        let names = [];
        data.payload.forEach(element => {
          names.push({
            label: element.name,
            value: element
          });
        });
        this.setState({ iscos: names, region: region });
        const isco = this.state.isco;
        const code = this.state.code;
        if (this.state.isco !== "") {
          this.getMean(region, isco, code);
        }
        this.props.onDataChange(
          this.state.region,
          isco,
          code,
          this.state.occupation
        );
      });
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
  render() {
    return (
      <div>
        <div className="graph-component">
          <div
            className="map_selector p-3"
            style={{ width: "65%", marginLeft: "10%", marginTop: "-10%" }}
          >
            <MapSelector
              onRegionChange={this.getOccupations}
              setTooltipContent={this.setContent}
              mapElementColor={this.props.mapElementColor}
            />
            <ReactTooltip>{this.state.content}</ReactTooltip>
          </div>
          <Select
            onChange={this.onRegionChange}
            options={this.state.regions}
            placeholder={selectRegion}
            className="region-select mb-md-1"
          ></Select>
          <Select
            onChange={this.onIscoChange}
            options={this.state.iscos}
            placeholder={selectOccupation}
            className="occupation-select  mb-md-1"
          ></Select>

          <div className="row">
            <div className="salary_select  mb-md-1">
              <input
                name="salary"
                className="form-control"
                onChange={this.onSalaryChange}
                type="number"
                value={this.state.wage}
              />
            </div>
            <div className="gender-selector ">
              <Select
                onChange={this.onGenderChange}
                className="gender-select"
                defaultValue={{
                  label: genderLabel[0],
                  value: genderLabel[0]
                }}
                options={[
                  { label: genderLabel[0], value: genderLabel[0] },
                  { label: genderLabel[1], value: genderLabel[1] }
                ]}
              ></Select>
            </div>
          </div>
        </div>

        <div className="col-xl my-4" data-aos="fade-up" data-aos-delay="200">
          <Graph
            entities={this.state.entities}
            menColor={menColor}
            womenColor={womenColor}
            differenceLabel={differenceLabel}
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
                textAlign: "left"
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
