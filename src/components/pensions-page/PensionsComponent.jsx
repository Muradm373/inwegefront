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
  pensionLink
} from "../../dictionary/text";

class PensionsComponent extends Component {
  render() {
    return (
      <div className="text-center mx-auto card-shadow-forecast mb-5 pension-component">
        <div className="methodology-component" id="pensions-component">
          <div className="pns-graphs">
            <p >{pensionDescription[0]}</p>
            <br></br>
            <p >{pensionDescription[1]}</p>
            <p >{pensionDescription[2]}</p>
            <p >{pensionDescription[3]}</p>
            <p >{pensionDescription[4]}</p>
          </div>

          <br></br>
          <br></br>
          <br></br>

          <div className="row">
            <div className="col-md-6">
              <p
                style={{
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  lineHeight: "22px",
                }}
              >
                {gapsWageLabel}
              </p>
              <PensionGraph
                menColor={menColor}
                womenColor={womenColor}
                differenceLabel={differenceLabel}
                type={"palk"}
                year={"2020"}
                unit="€"
                tickTotal="7"
                genderLabel={genderLabel}
                occupation={""}
              ></PensionGraph>
            </div>

            <div className="col-md-6">
              <p
                style={{
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  lineHeight: "22px",
                }}
              >
                {gapsPensionLabel}
              </p>
              <PensionGraph
                menColor={menColor}
                womenColor={womenColor}
                differenceLabel={differenceLabel}
                type={"pension"}
                year="2071"
                unit="€"
                genderLabel={genderLabel}
                tickTotal="8"
                occupation={""}
              ></PensionGraph>
            </div>
          </div>

          <br></br>
          <br></br>

          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "18px",
              lineHeight: "22px",
            }}
          >
            {replacementNeeds2}
          </p>

          <PensionGraph
            menColor={menColor}
            womenColor={womenColor}
            differenceLabel={differenceLabel}
            type={"am_kesk"}
            unit=""
            tickTotal="8"
            genderLabel={genderLabel}
            occupation={""}
          ></PensionGraph>
          <br></br>

          <br></br>
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "18px",
              lineHeight: "22px",
            }}
          >
            {replacementNeeds1}
          </p>

          <PensionGraph
            menColor={menColor}
            womenColor={womenColor}
            differenceLabel={differenceLabel}
            type={"am_oma"}
            unit=""
            tickTotal="8"
            genderLabel={genderLabel}
            occupation={""}
          ></PensionGraph>
        </div>

        <input type="Submit" className="button btn-01" value={checkMyPlanLabel} onClick={()=> window.open(pensionLink, "_blank")}></input>
       </div>
    );
  }
}

export default PensionsComponent;
