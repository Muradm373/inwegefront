import React, { Component } from "react";
import PensionGraph from "./PensionGraph";
import {
  menColor,
  womenColor,
  genderLabel,
  differenceLabel,
  pensionDescription,
  replacementNeeds1,
  replacementNeeds2,
  gapsWageLabel,
  gapsPensionLabel,
  checkMyPlanLabel,
  pensionLink,
  PensionsText, Livelihood

} from "../../dictionary/text";
import {connect} from "react-redux";

class PensionsComponent extends Component {

  render() {
    return (
      <div className="text-center mx-auto card-shadow-forecast mb-5 m-3 pension-component">
        <div className="methodology-component" id="pensions-component">
          <div className="pns-graphs description-page">
            <p className="text-justify">
              {PensionsText}
            </p>
            <br></br>
            <br></br>
            <p className={"h4-stat"}>{Livelihood}</p>
            <br></br>


            <ol className={"ol-stat"}>
              {pensionDescription[0]}
              <br></br>
              <li>{pensionDescription[1]}</li>
              <li>{pensionDescription[2].replace("2020", this.props.dates.pensionStartDate).replace("2071", this.props.dates.pensionEndDate)}}</li>
              <li>{pensionDescription[3]}</li>
              <li>{pensionDescription[4]}</li>
            </ol>
          </div>

          <br></br>
          <br></br>
          <br></br>

          <div className="row">
            <div className="col-md-6">
              <p className={"h4-stat text-left ml-4 pl-2"}
              >
                {gapsWageLabel.replace("2020", this.props.dates.pensionStartDate).replace("2071", this.props.dates.pensionEndDate)}
              </p>
              <PensionGraph
                menColor={menColor}
                womenColor={womenColor}
                differenceLabel={differenceLabel}
                type={"palk"}
                year={"2020"}
                unit=" €"
                tickTotal="7"
                genderLabel={genderLabel}
                occupation={""}
              ></PensionGraph>
            </div>

            <div className="col-md-6">
              <p
               className={"h4-stat text-left ml-4 pl-2"}
              >
                {gapsPensionLabel.replace("2020", this.props.dates.pensionStartDate).replace("2071", this.props.dates.pensionEndDate)}
              </p>
              <PensionGraph
                menColor={menColor}
                womenColor={womenColor}
                differenceLabel={differenceLabel}
                type={"pension"}
                year="2071"
                unit=" €"
                genderLabel={genderLabel}
                tickTotal="8"
                occupation={""}
              ></PensionGraph>
            </div>
          </div>

          <br></br>
          <br></br>

          <p
            className={"h4-stat text-left ml-4 pl-2"}
          >
            {replacementNeeds2}
          </p>

          <div>
            <div className={"col-md-12"}>
          <PensionGraph
            menColor={menColor}
            womenColor={womenColor}
            differenceLabel={differenceLabel}
            type={"am_kesk"}
            unit="%"
            tickTotal="8"
            genderLabel={genderLabel}
            occupation={""}
          ></PensionGraph>
            </div>
          <br></br>

          <br></br>
          <p
            className={"h4-stat text-left ml-4 pl-2"}
          >
            {replacementNeeds1}
          </p>

            <div className={"col-md-12"}>
          <PensionGraph
            menColor={menColor}
            womenColor={womenColor}
            differenceLabel={differenceLabel}
            type={"am_oma"}
            unit="%"
            tickTotal="8"
            genderLabel={genderLabel}
            occupation={""}
          ></PensionGraph>
            </div>
          </div>
        </div>

        <input
          type="Submit"
          className="button btn-01"
          value={checkMyPlanLabel}
          onClick={() => window.open(pensionLink, "_blank")}
        ></input>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dates: state.dates,
  };
};

export default connect(mapStateToProps)(PensionsComponent);
