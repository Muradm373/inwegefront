/* eslint-disable */
import React, { Component } from "react";
import axios from "axios";
import EntityComponent from "./EntityComponent";
import PieChartComponent from "./PieChart";
import FileUploadComponent from "./Modals/file-upload/FileUploadComponent";
import Select from "react-select";
import Modal from "react-modal";
import Feedback from "./Modals/feedback/send/Feedback";

import { Container, Button, Link } from "react-floating-action-button";

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
  salary
} from "../text";
import Login from "./Modals/Login";
import FeedbacksList from "./Modals/feedback/fetch/FeedbacksList";

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
    wage: 0,
    gender: genderLabel[0],
    showModal: false,
    showLoginModal: false,
    showFeedbacksModal: false,
    showFileUploadModal: false,
    userToken: null,
    feedbacks: []
  };

  constructor() {
    super();

    this.salaryChange = this.salaryChange.bind(this);
    this.genderChange = this.genderChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenLoginModal = this.handleOpenLoginModal.bind(this);
    this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);
    this.handleOpenFeedbacksModal = this.handleOpenFeedbacksModal.bind(this);
    this.handleCloseFeedbacksModal = this.handleCloseFeedbacksModal.bind(this);
    this.handleOpenFileUploadModal = this.handleOpenFileUploadModal.bind(this);
    this.handleCloseFileUploadModal = this.handleCloseFileUploadModal.bind(
      this
    );
    this.logout = this.logout.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleOpenLoginModal() {
    this.setState({ showLoginModal: true });
  }

  handleCloseLoginModal(userToken) {
    this.setState({ showLoginModal: false, userToken: userToken });
  }

  handleCloseFileUploadModal() {
    this.setState({ showFileUploadModal: false });
  }

  handleOpenFeedbacksModal() {
    axios
      .get(`${API_URL}/feedbacks`, {
        headers: {
          Authorization: `Bearer ${this.state.userToken}`
        }
      })
      .then(data => {
        this.setState({
          feedbacks: data.data.payload,
          showFeedbacksModal: true
        });
      });
  }

  handleOpenFileUploadModal() {
    this.setState({
      showFileUploadModal: true
    });
  }

  handleCloseFeedbacksModal() {
    this.setState({ showFeedbacksModal: false });
  }

  logout() {
    this.setState({ userToken: null });
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

    axios
      .get(url)
      .then(response => response.data)
      .then(data => this.saveData(data))
      .then(response => response.data)
      .then(data => {
        let mean = data.payload;
        this.setState({
          mean: mean
        });
      });
  }

  saveData(data) {
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

  salaryChange(event) {
    if (
      event.target.value < 1000000 &&
      event.target.value >= 0 &&
      !isNaN(event.target.value)
    )
      this.setState({ wage: event.target.value });
  }

  genderChange(event) {
    this.setState({ gender: event.value });
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          className="contentModal"
        >
          <Feedback handleCloseModal={this.handleCloseModal}></Feedback>
        </Modal>
        <Modal
          isOpen={this.state.showLoginModal}
          onRequestClose={this.handleCloseLoginModal}
          className="contentModal"
        >
          <Login handleCloseModal={this.handleCloseLoginModal}></Login>
        </Modal>

        <Modal
          isOpen={this.state.showFeedbacksModal}
          onRequestClose={this.handleCloseFeedbacksModal}
          className="contentModal"
        >
          <FeedbacksList
            handleCloseModal={this.handleCloseFeedbacksModal}
            feedbacks={this.state.feedbacks}
          ></FeedbacksList>
        </Modal>

        <Modal
          isOpen={this.state.showFileUploadModal}
          onRequestClose={this.handleCloseFileUploadModal}
          className="contentModal"
        >
          <FileUploadComponent
            handleCloseModal={this.handleCloseFileUploadModal}
            userToken={this.state.userToken}
          ></FileUploadComponent>
        </Modal>

        <div>
          <div className="col-xl mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
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
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <label
                        style={{
                          width: "10%",
                          textAlign: "center",
                          marginTop: "5px"
                        }}
                      >
                        {salary[0] + " " + salary[1]}
                      </label>
                      <input
                        name="salary"
                        className="form-control"
                        onChange={this.salaryChange}
                        type="number"
                        value={this.state.wage}
                      />
                    </div>
                    <div>
                      <Select
                        onChange={this.genderChange}
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
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <EntityComponent
                    entities={this.state.entities}
                    menColor={this.state.menColor}
                    womenColor={this.state.womenColor}
                    differenceLabel={differenceLabel}
                    genderLabel={genderLabel}
                    myWage={this.state.wage}
                    myGender={this.state.gender}
                    occupation={this.state.occupation}
                  ></EntityComponent>
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
                    <div
                      className="donut"
                      style={{
                        visibility: this.state.iscoSelected
                          ? "visible"
                          : "hidden"
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
            </div>
          </div>
        </div>
        <Container>
          {this.state.userToken != null ? (
            <div>
              <Button
                tooltip={"Upload new data file"}
                icon="fa fa-upload"
                onClick={this.handleOpenFileUploadModal}
                style={{
                  position: "fixed",
                  bottom: "100px",
                  right: "0px"
                }}
              />
              <Button
                tooltip={"Read feedbacks"}
                icon="fa fa-book"
                onClick={this.handleOpenFeedbacksModal}
                style={{
                  position: "fixed",
                  bottom: "100px",
                  right: "0px"
                }}
              />
              <Button
                tooltip={"Logout"}
                icon="fa fa-user"
                onClick={this.logout}
                style={{
                  position: "fixed",
                  bottom: "100px",
                  right: "0px"
                }}
              />
              <Button
                tooltip={leaveAFeedBack}
                icon="fa fa-envelope"
                onClick={this.handleOpenModal}
                style={{
                  position: "fixed",
                  bottom: "0px",
                  right: "0px"
                }}
              />

              <Button
                icon="fa fa-cog"
                style={{
                  position: "fixed",
                  bottom: "0px",
                  right: "0px"
                }}
              />
            </div>
          ) : (
            <div>
              <Button
                tooltip={"Login"}
                icon="fa fa-user"
                onClick={this.handleOpenLoginModal}
                style={{
                  position: "fixed",
                  bottom: "100px",
                  right: "0px"
                }}
              />
              <Button
                tooltip={leaveAFeedBack}
                icon="fa fa-envelope"
                onClick={this.handleOpenModal}
                style={{
                  position: "fixed",
                  bottom: "0px",
                  right: "0px"
                }}
              />

              <Button
                icon="fa fa-cog"
                style={{
                  position: "fixed",
                  bottom: "0px",
                  right: "0px"
                }}
              />
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default GraphComponent;
