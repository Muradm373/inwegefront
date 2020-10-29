import React, { Component } from "react";
import {updateDates} from "../../../../actions/actions"
import {connect} from "react-redux"
class FeedbacksList extends Component {

  constructor(props){
    super();

    this.state = {
      ageDate: props.dates.ageDate,
      pensionDate: props.dates.pensionDate,
      salaryEntityDate: props.dates.salaryEntityDate,
      occupationEntityDate: props.dates.occupationEntityDate,
      wageForecasetDate: props.dates.wageForecasetDate,
      quarter: props.dates.quarter
    }
  }
  render() {
    return (
      <div>
        <div className="card-shadow-forecast ">
          <div className="feedback-list-nav">
            <div class="input-group input-group-sm mb-3">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Age date
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  value={this.state.ageDate}
                  onChange={(e)=>this.setState({ageDate: e.target.value})}
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Pension date
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  value={this.state.pensionDate}
                  onChange={(e)=>this.setState({pensionDate: e.target.value})}
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Salary entity date
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  value={this.state.salaryEntityDate}
                  onChange={(e)=>this.setState({salaryEntityDate: e.target.value})}
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Occupation entity date
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  value={this.state.occupationEntityDate}
                  onChange={(e)=>this.setState({occupationEntityDate: e.target.value})}
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Wage forecast date
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  value={this.state.wageForecasetDate}
                  onChange={(e)=>this.setState({wageForecasetDate: e.target.value})}
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                     Quarter
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  value={this.state.quarter}
                  onChange={(e)=>this.setState({quarter: e.target.value})}
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <button onClick={this.props.updateDates(this.state, this.props.userToken)} className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateDates: (dates, token) => {
      updateDates(dates, token, dispatch);
    },
  };
};

const mapStateToProps = (state) => {
  return {
    dates: state.dates,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)( FeedbacksList );
