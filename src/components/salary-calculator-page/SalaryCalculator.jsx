/* eslint-disable */
import axios from "axios";
import React, { Component } from "react";
import "react-svg-map/lib/index.css";
import {
  differenceLabel,
  genderLabel,
  ageLabel,
  menColor,
  salary,
  wageDifferencesText,
  sideParagraph1,
  sideParagraph2,
  totalNumberOfEmployees,
  totalNumberOfEmployeesOccupation,
  womenColor,
  wageChangeInfo,
  noDataLabel, emailLabel, occupationLabel,
} from "../../dictionary/text";
import AgeBarChartComponent from "./vis-components/AgeBarChartComponent";
import ColumnChartComponent from "./vis-components/ColumnChartComponent";
import DynamicMapSelector from "./selector-components/DynamicMapSelector";
import GenderSelector from "./selector-components/GenderSelector";
import Graph from "./vis-components/Graph";
import OccupationSelector from "./selector-components/OccupationSelector";
import PieChartComponent from "./vis-components/PieChart";
import { connect } from "react-redux";
import {
  getOccupations,
  setGender,
  setWage,
  getSalaryEntities,
} from "../../actions/actions";
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
    } else {
      this.props.getSalaryEntities(region, "averages", code);
    }
    this.setState({ region: region });
    this.props.onDataChange(region, isco, code, "");
    this.props.getOccupations(region);
  };

  onOverallDataForMapSelected=(event)=>{
    const region = event.value;
    const isco = this.state.isco;
    const code = this.state.code;

    if (this.state.isco !== "") {
      this.props.getSalaryEntities(region, isco, code);
    } else {
      this.props.getSalaryEntities(region, "averages", 0);
    }
  }

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

      this.setState({ occupation: event.value.name + " ("+code.substring(0,4)+")"});
    }
  };

  changeWage(d) {
    let event = { target: { value: 0 } };

    if (this.props.wage == d.left) event.value = d.right;
    else event.value = d.left;

    this.props.setWage(event);
  }

  render() {
    return (
      <div className="graph-component graph-component-cards mb-5">
        <div className="card-shadow card-occupation-selector m-3">
          <br></br>
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
            {sideParagraph2[0]}
            <br></br>
            <br></br>
            {sideParagraph2[1]}
            <br></br>
          </p>
          <div className="form-group shiny-input-container">
            <div id="occupation-selector" className={"mt-3"}>
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
              <div className={"mt-3"} style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <div >
                    <div id={"salary-selector"}>
                      <p
                          className="mnimi-w"
                      >
                        <input
                            id="input"
                            type="text"
                            required
                            onChange={this.props.setWage}
                            value={this.props.wage}
                        />
                        <label
                            htmlFor={"input"}
                            alt={`${salary[0]} ${salary[1]}`}
                            placeholder={`${salary[0]} ${salary[1]}`}
                        >
                        </label>
                      </p>
                    </div>
                  </div>


                </div>
                <div style={{ marginLeft: "10px" }} id={"gender-selector"}>
                  <GenderSelector onGenderChange={this.props.setGender} />
                </div>
              </div>
              <br></br>
              <div>
                {this.props.wage !== undefined ? (
                  <p className="mb-1">{wageChangeInfo}</p>
                ) : (
                  <></>
                )}
                {this.props.description !== "" && this.props.description !== null ?
                    <>
                      <p className={"description-text"}
                      >
                        Valitud ametinimetus kuulub ametirühma {this.props.generalName} ({this.props.occupationCode}, tase {this.props.occupationCode.length} ametite klassifikaatoris).
                      </p>
                      <br/>
                      <br/>
                    <p className={"description-label"}>Ametikirjeldus </p>
                    </>
                    :
                    <></>
                }
                <br/>
                <p className={"description-text"}
                >
                  {this.props.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-shadow card-dynamic-map my-3">
          <div>
            <div className="methodology-component">
              <div className="pns-graphs">
                <p>{wageDifferencesText}</p>
                <br></br>
              </div>
            </div>

            <div className="map_selector " style={{ width: "100%" }}>
              <DynamicMapSelector
                isco={this.state.isco}
                onRegionChange={this.onRegionChange}
                onOverallDataForMapSelected={this.onOverallDataForMapSelected}
                setTooltipContent={this.setContent}
                mapElementColor={this.props.mapElementColor}
                occupation={this.props.generalName + " ("+this.props.occupationCode + ")"}
                region={this.state.region}
              />
            </div>
            <div className="c-tabs-line my-3"></div>

            <Graph
              entities={this.props.entities}
              menColor={menColor}
              womenColor={womenColor}
              differenceLabel={differenceLabel}
              changeWage={this.changeWage}
              genderLabel={genderLabel}
              myWage={this.props.wage}
              myGender={this.props.gender}
              occupation={this.props.generalName + " ("+this.props.occupationCode + ")"}
              region={this.state.region}
            ></Graph>

            <div className="feature-1 text-center my-3">
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
              {this.state.occupation === "" && (
                  <p className="mb-3" style={{ color: "black" }}>
                    {totalNumberOfEmployees + " " + this.state.region}
                  </p>
              )}

              {this.state.occupation !== "" && (
                  <p className="mb-3" style={{ color: "black" }}>
                    {totalNumberOfEmployeesOccupation[0] +
                    this.props.generalName + " ("+this.props.occupationCode + ")" +
                    totalNumberOfEmployeesOccupation[1] +
                    this.state.region}
                  </p>
              )}

              <br/>

              {
                <div>
                  <div className="graph-component-cards mt-3">
                    <div>
                      <ColumnChartComponent
                        region={this.state.region}
                        isco={this.state.isco}
                        code={this.state.code}
                        occupation={this.props.generalName + " ("+this.props.occupationCode + ")"}
                      />
                    </div>
                    <div>
                      {this.state.isco ? (
                        <div>
                          <div className="row justify-content-center text-center">
                            <AgeBarChartComponent
                              isco={this.state.isco}
                              label={[`${ageLabel} `]}
                            ></AgeBarChartComponent>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOccupations: (region) => {
      getOccupations(dispatch, region);
    },
    setGender: (gender) => {
      dispatch(setGender(gender.value));
    },
    setWage: (wage) => {
      dispatch(setWage(wage.target.value));
    },
    getSalaryEntities: (region, isco, code) => {
      getSalaryEntities(region, isco, code, dispatch);
    },
  };
};

const mapStateToProps = (state) => {
  return {
    occupations: state.occupations,
    gender: state.gender,
    wage: state.wage,
    entities: state.entities,
    description: state.description,
    mean: state.mean,
    generalName: state.generalName,
    occupationCode: state.occupationCode
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalaryCalculator);
