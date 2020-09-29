/* eslint-disable */
import axios from "axios";
import React, { Component } from "react";
import "react-svg-map/lib/index.css";
import {
  differenceLabel,
  genderLabel,
  ageLabel,
  menColor, noInformationLabel,
  salary,
  searchLabel,
  sideParagraph1,
  sideParagraph2,
  totalNumberOfEmployees,
  totalNumberOfEmployeesOccupation, womenColor
} from "../../dictionary/text";
import AgeBarChartComponent from "./vis-components/AgeBarChartComponent";
import ColumnChartComponent from "./vis-components/ColumnChartComponent";
import DynamicMapSelector from "./selector-components/map-components/DynamicMapSelector";
import GenderSelector from "./selector-components/GenderSelector";
import Graph from "./vis-components/Graph";
import OccupationSelector from "./selector-components/OccupationSelector";
import PieChartComponent from "./vis-components/PieChart";
import {connect} from "react-redux";
import {getOccupations, setGender, setWage, getSalaryEntities} from "../../actions/actions";
const lang = "&lang=";

class SalaryCalculator extends Component {

  constructor() {
    super();
    this.state = {
      isco: "",
      region: "",
      occupation: "",
      code: "",
      content: "",
      tab: 0,
    };
  

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
      this.props.getSalaryEntities(region, isco, code);
    }else{
      this.props.getSalaryEntities(region, "averages", code);
    }
    this.setState({ region: region });
    this.props.onDataChange(region, isco, code, "");
    this.props.getOccupations(region);
  };



  onIscoChange = (event) => {
    if (event.value === "reset") {
      this.setState({
        entities: [],
        iscos: [],
        isco: "",
        region: "",
        occupation: "",
        mean: [],
        code: "",
        wage: undefined,
        gender: genderLabel[0],
        content: "",
        tab: 0,
      });
    } else {
      const region = this.state.region;

      let isco = event.value.iscoValid;
      let code = event.value.code;

      this.setState({ isco: isco, code: code });
      this.props.getSalaryEntities(region, isco, code);
      this.props.onDataChange(this.state.region, isco, code, event.value.name);
      
      this.setState({ occupation: event.value.name });
    }
  };

  changeWage(d) {
    let event ={target: {value: 0}};

    
    if (this.props.wage == d.left) event.value = d.right;
    else 
    event.value = d.left;

    this.props.setWage(event);
  }

 

  render() {
    return (
        <div className="graph-component graph-component-cards">
            <div className="card-shadow card-occupation-selector m-3">
              <p
                style={{
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  lineHeight: "22px",
                }}
              >
                {searchLabel}
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
                {sideParagraph2}
              </p>
              <div className="form-group shiny-input-container">
                <div>
                  <OccupationSelector
                    onChange={this.onIscoChange}
                    region={this.state.region}
                    occupations={this.props.occupations}
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
                    {sideParagraph1}
                  </p>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                      <input
                        name="salary"
                        className="form-control selector"
                        onChange={this.props.setWage}
                        type="number"
                        placeholder={`${salary[0]} ${salary[1]}`}
                        value={this.props.wage}
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <GenderSelector onGenderChange={this.props.setGender} />
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
                      {this.props.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-shadow card-dynamic-map m-3">
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
                    
                  </div>
                }

          <Graph
                  entities={this.props.entities}
                  menColor={menColor}
                  womenColor={womenColor}
                  differenceLabel={differenceLabel}
                  changeWage={this.changeWage}
                  genderLabel={genderLabel}
                  myWage={this.props.wage}
                  myGender={this.props.gender}
                  occupation={this.state.occupation}
                ></Graph>
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
                              {totalNumberOfEmployeesOccupation[0] +
                                this.state.occupation +
                                totalNumberOfEmployeesOccupation[1] +
                                this.state.region}
                            </p>
                          )}
                          {this.state.occupation === "" && (
                            <p className="mb-3" style={{ color: "black" }}>
                              {totalNumberOfEmployees + " " + this.state.region}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                }
                <div className="row justify-content-center text-center">
                  <AgeBarChartComponent
                    isco={this.state.isco}
                  ></AgeBarChartComponent>
                </div>
                {this.state.isco ? (
                  <p className="mb-3" style={{ color: "black" }}>
                    {ageLabel}
                  </p>
                ) : null}
              </div>
            </div>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getOccupations: (region) => {(getOccupations(dispatch, region))},
      setGender: (gender) => {dispatch(setGender(gender.value))},
      setWage: (wage) => {dispatch(setWage(wage.target.value))},
      getSalaryEntities: (region, isco, code) => {(getSalaryEntities(region, isco, code, dispatch))}
    }
}

const mapStateToProps = (state) => {
  return {
    occupations: state.occupations,
    gender: state.gender,
    wage: state.wage,
    entities: state.entities,
    description: state.description,
    mean: state.mean
  }
}

export default connect( mapStateToProps,mapDispatchToProps)(SalaryCalculator);
