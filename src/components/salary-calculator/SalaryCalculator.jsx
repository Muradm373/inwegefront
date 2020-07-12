/* eslint-disable */
import React, { Component } from "react";
import axios from "axios";
import Graph from "./Graph";
import ReactTooltip from "react-tooltip";
import {
  noDescr,
  differenceLabel,
  genderLabel,
  lng,
  API_URL,
  salary,
  menColor,
  womenColor,
} from "../../text";
import "react-svg-map/lib/index.css";
const lang = "&lang=";
import DynamicMapSelector from "./DynamicMapSelector";
import GenderSelector from "./GenderSelector";
import OccupationSelector from "./OccupationSelector";
import PieChartComponent from "./PieChart";
import ColumnChartComponent from "./ColumnChartComponent";
import AgeBarChartComponent from "./AgeBarChartComponent";

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
    tab: 0,
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
    this.props.onDataChange(region, isco, code, "");
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
  renderGraph() {
    return (
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
    );
  }

  changeWage(d) {
    if (this.state.wage == d.left) this.setState({ wage: d.right });
    else this.setState({ wage: d.left });
  }

  render() {
    return (
      <div>
        <div className="graph-component">
          <div className="graph-component-cards">
            <div className="card-shadow card-occupation-selector">
              <p
                style={{
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  lineHeight: "22px",
                }}
              >
                Search
              </p>
              <p
                style={{
                  textAlign: "left",
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: "normal",
                  color: "#595959",
                  flex: 5,
                  display: "flex",
                }}
              >
                After selecting county from the map, you can search for a job by
                job title.
              </p>
              <div className="form-group shiny-input-container">
                <div>
                  <OccupationSelector
                    onChange={this.onIscoChange}
                    region={this.state.region}
                  />
                  <br></br>
                  <p
                    style={{
                      textAlign: "left",
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      lineHeight: "20px",
                      fontWeight: "normal",
                      color: "#595959",
                    }}
                  >
                    To see the difference between your and average wages you can
                    fill the boxes below.
                  </p>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                      <input
                        name="salary"
                        className="form-control selector"
                        onChange={this.onSalaryChange}
                        type="number"
                        placeholder={`${salary[0]} ${salary[1]}`}
                        value={this.state.wage}
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <GenderSelector onGenderChange={this.onGenderChange} />
                    </div>
                  </div>
                  <br></br>
                  <div>
                    <p
                      style={{
                        flex: 5,
                        display: "flex",
                        textAlign: "left",
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        lineHeight: "20px",
                        fontWeight: "normal",
                        color: "#595959",
                      }}
                    >
                      {this.state.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-shadow card-dynamic-map">
              <div>
                {
                  <div className="map_selector p-3 " style={{ width: "100%" }}>
                    <DynamicMapSelector
                      isco={this.state.isco}
                      onRegionChange={this.onRegionChange}
                      setTooltipContent={this.setContent}
                      mapElementColor={this.props.mapElementColor}
                      occupation={this.state.occupation}
                      region={this.state.region}
                    />
                    <ReactTooltip>{this.state.content}</ReactTooltip>
                  </div>
                }

                {this.renderGraph()}
                {
                  <div>
                    <div className="graph-component-cards">
                      <div>
                        <ColumnChartComponent
                          region={this.state.region}
                          isco={this.state.isco}
                          code={this.state.code}
                          occupation={this.state.occupation}
                        />
                      </div>
                      <div>
                        <div className="feature-1 text-center">
                          <div className="row d-flex justify-content-center">
                            <div style={{ height: "5px" }}></div>
                            <PieChartComponent
                              style={{ paddingTop: "-1000px" }}
                              key="PieChart"
                              region={this.state.region}
                              isco={this.state.isco}
                              code={this.state.code}
                              type="region"
                            />
                          </div>
                          {this.state.occupation !== "" && (
                            <p className="mb-3" style={{ color: "black" }}>
                              {"Total number of employees in occupation " +
                                this.state.occupation +
                                " in " +
                                this.state.region}
                            </p>
                          )}
                          {this.state.occupation === "" && (
                            <p className="mb-3" style={{ color: "black" }}>
                              {"Total number of employees in Estonia "}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                }
                <AgeBarChartComponent
                  isco={this.state.isco}
                ></AgeBarChartComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SalaryCalculator;
