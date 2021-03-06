/* eslint-disable */
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
  occupationDescriptionLabel,
  noDataLabel,
  emailLabel,
  occupationLabel,
  overall,
  levelLabel,
  descriptionLabel,
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
  occupationToLowerCase,
} from "../../actions/actions";
import { translateCounty } from "./entityFunc";
const lang = "&lang=";

class SalaryCalculator extends Component {
  constructor(props) {
    super();
    this.state = {
      isco: "",
      region: overall,
      occupation: "",
      code: "",
      content: "",
      tab: 0,
      mobile: false,
    };

    this.setContent = this.setContent.bind(this);
    this.changeWage = this.changeWage.bind(this);
    props.getOccupations("Harju maakond");
    props.getSalaryEntities(overall, "", "");
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ mobile: window.innerWidth <= 1490 });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  setContent(content) {
    this.setState({ content: content });
  }

  decapitalize(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toLocaleLowerCase() + s.slice(1);
  }

  buildPiechartLabel(code, name, region) {
    let result = `${name} (${code})`;

    let ending = "";

    if (region === "" || region === overall) {
      return result + ", " + this.decapitalize(overall);
    } else {
      return (
        result + ", " + translateCounty(this.state.region, this.props.language)
      );
    }
  }

  onRegionChange = (event) => {
    const region = event.value;
    const tab = event.tab;
    const isco = this.state.isco;
    const code = this.state.code;
    if (this.state.isco !== "") {
      this.props.getSalaryEntities(region, isco, code);
    } else {
      this.props.getSalaryEntities(region, "averages", code);
    }
    this.setState({ region: region });
    this.props.onDataChange(region, isco, code, "");
    this.props.getOccupations(region, tab);
  };

  onOverallDataForMapSelected = (event) => {
    const region = event.value;
    const isco = this.state.isco;
    const code = this.state.code;

    if (this.state.isco !== "") {
      this.props.getSalaryEntities(region, isco, code);
    } else {
      this.props.getSalaryEntities(region, "", "");
    }
    this.setState({ region: overall });
  };

  onIscoChange = (event) => {
    if (event.value === "reset") {
      if (this.state.region !== "" && this.state.region !== overall) {
        this.props.getSalaryEntities(
          this.state.region,
          "averages",
          this.state.code
        );
        this.setState({
          isco: "",
          occupation: "",
          code: "",
          content: "",
          tab: 0,
        });
      } else {
        this.setState({
          isco: "",
          occupation: "",
          code: "",
          content: "",
          tab: 0,
        });
        this.props.getSalaryEntities(overall, "", "");
      }

      this.props.getOccupations("Harju maakond");
    } else {
      const region = this.state.region;

      let isco = event.value.iscoValid;
      let code = event.value.code;

      this.setState({ isco: isco, code: code });
      this.props.getSalaryEntities(region, isco, code);
      this.props.onDataChange(this.state.region, isco, code, event.value.name);

      this.setState({
        occupation: event.value.name + " (" + code.substring(0, 4) + ")",
      });
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
        <div className="card-shadow card-occupation-selector mt-3 mx-auto">
          <br></br>

          <ol className={"ol-stat"}>
            <li className={"body-stat"}>{sideParagraph2[0]}</li>
            <li className={"body-stat"}>{sideParagraph2[1]}</li>
          </ol>
          <div className="form-group shiny-input-container">
            <div id="occupation-selector" className={"mt-3"}>
              <OccupationSelector
                onChange={this.onIscoChange}
                region={this.state.region}
                occupations={this.props.occupations}
              />

              <ol className={"ol-stat"}>
                <li className={"body-stat"}>{sideParagraph1}</li>
              </ol>

              <div
                className={"mt-3"}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div className="w-50">
                  <div>
                    <div id={"salary-selector"}>
                      <p className="mnimi-w">
                        <input
                          id="inputWage"
                          type="text"
                          required
                          onChange={this.props.setWage}
                          value={this.props.wage}
                        />
                        <label
                          htmlFor={"input"}
                          alt={`${salary[0]} ${salary[1]}`}
                          placeholder={`${salary[0]} ${salary[1]}`}
                        ></label>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="w-50"
                  style={{ marginLeft: "10px" }}
                  id={"gender-selector"}
                >
                  <GenderSelector onGenderChange={this.props.setGender} />
                </div>
              </div>
              <br></br>
              <div>
                {this.props.description !== "" &&
                this.props.description !== null ? (
                  <>
                    {this.props.occupationCode !== null ? (
                      <div className={"body-stat ml-1 row text-left"}>
                        <p className={"text-left body-stat"}>
                          {levelLabel[0]}&nbsp;
                        </p>
                        <p className={"text-left body-stat-bold "}>
                          {` ${occupationToLowerCase(this.props.generalName)} `}{" "}
                          &nbsp;
                        </p>
                        <p
                          className={"text-left body-stat"}
                        >{` (${this.props.occupationCode}, ${levelLabel[1]} ${this.props.occupationCode.length} ${levelLabel[2]}).`}</p>
                      </div>
                    ) : (
                      <></>
                    )}
                    <br />
                    <p className={"description-label "}>
                      {`${occupationDescriptionLabel}`}{" "}
                    </p>
                  </>
                ) : (
                  <></>
                )}
                <p className={"body-stat"}>{this.props.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-shadow card-dynamic-map mt-3 mx-auto">
          <div>
            <div className="methodology-component">
              <div className="pns-graphs">
                <p className={"body-stat"}>{wageDifferencesText}</p>
                <br></br>
              </div>
            </div>

            <div className="map_selector " style={{ width: "100%" }}>
              <DynamicMapSelector
                isco={this.state.isco}
                onRegionChange={this.onRegionChange}
                onTabChange={this.props.getOccupations}
                onOverallDataForMapSelected={this.onOverallDataForMapSelected}
                setTooltipContent={this.setContent}
                mapElementColor={this.props.mapElementColor}
                occupation={
                  this.props.generalName +
                  " (" +
                  this.props.occupationCode +
                  ")"
                }
                region={this.state.region}
              />
            </div>
            <div className="c-tabs-line my-4"></div>

            <Graph
              entities={this.props.entities}
              menColor={menColor}
              womenColor={womenColor}
              differenceLabel={differenceLabel}
              changeWage={this.changeWage}
              genderLabel={genderLabel}
              myWage={this.props.wage}
              myGender={this.props.gender}
              occupation={
                this.props.generalName + " (" + this.props.occupationCode + ")"
              }
              region={this.state.region}
            ></Graph>

            <div class="c-tabs-line my-4"></div>

            <div className="feature-1 text-center my-3 h4-stat">
              {this.state.occupation === "" && (
                <>
                  <p
                    className={"h4-stat text-left ml-3"}
                    style={{ color: "black" }}
                  >
                    {totalNumberOfEmployees}
                  </p>
                  <p className={"body-stat ml-3"}>
                    {translateCounty(this.state.region, this.props.language)}
                  </p>
                </>
              )}

              {this.state.occupation !== "" &&
                this.props.occupationCode !== null && (
                  <>
                    <p
                      className={"h4-stat text-left ml-3"}
                      style={{ color: "black" }}
                    >
                      {totalNumberOfEmployeesOccupation[0]}
                    </p>
                    <p className={"body-stat ml-3"}>
                      {this.buildPiechartLabel(
                        this.props.occupationCode,
                        this.props.generalName,
                        this.state.region
                      )}
                    </p>
                  </>
                )}
              <div className="row d-flex ml-2">
                <PieChartComponent
                  style={{ paddingTop: "-1000px" }}
                  key="PieChart"
                  region={this.state.region}
                  isco={this.state.isco}
                  code={this.state.code}
                  type="region"
                />
              </div>

              <div class="c-tabs-line my-4"></div>

              {
                <div>
                  <div className="graph-component-cards row">
                    <div className={"col-sm"}>
                      <ColumnChartComponent
                        region={this.state.region}
                        isco={this.state.isco}
                        code={this.state.code}
                        occupation={
                          this.props.generalName +
                          " (" +
                          this.props.occupationCode +
                          ")"
                        }
                      />
                    </div>
                    <div className={"col-sm"}>
                      {this.state.isco ? (
                        <div>
                          <div
                            className={
                              this.state.mobile ? "age-bar-mobile" : ""
                            }
                          >
                            <AgeBarChartComponent
                              isco={this.state.isco}
                              label={[`${ageLabel} `]}
                              occupation={
                                this.props.generalName +
                                " (" +
                                this.props.occupationCode +
                                ")"
                              }
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
    getOccupations: (region, tab) => {
      getOccupations(dispatch, region, tab);
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
    occupationCode: state.occupationCode,
    language: state.language,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalaryCalculator);
