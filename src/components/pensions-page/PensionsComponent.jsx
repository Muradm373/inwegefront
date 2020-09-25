import React, { Component } from "react";
import { pensionsDescription } from "../../dictionary/textMethodology";
import PensionGraph from "./PensionGraph";
import {
  menColor,
  womenColor,
  genderLabel,
  differenceLabel,
} from "../../dictionary/text";

class PensionsComponent extends Component {
  render() {
    return (
      <div className="w-75 text-center mx-auto card-shadow-forecast">
        <div className="methodology-component" id="pensions-component">
          <div style={{ textAlign: "left" }}>
            <p style={{ textAlign: "left" }}>{pensionsDescription[0][0]}</p>
            <br></br>
            <p style={{ textAlign: "left" }}>{pensionsDescription[0][1]}</p>
            <p style={{ textAlign: "left" }}>{pensionsDescription[0][2]}</p>
            <p style={{ textAlign: "left" }}>{pensionsDescription[0][3]}</p>
            <p style={{ textAlign: "left" }}>{pensionsDescription[0][4]}</p>
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
                Wage gap
              </p>
              <PensionGraph
                menColor={menColor}
                womenColor={womenColor}
                differenceLabel={differenceLabel}
                type={"palk"}
                unit="€"
                genderLabel={genderLabel}
                tickTotal="10"
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
                Pension gap
              </p>
              <PensionGraph
                menColor={menColor}
                womenColor={womenColor}
                differenceLabel={differenceLabel}
                type={"pension"}
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
            Replacement rate in relation to the employee’s last wage
          </p>

          <PensionGraph
            menColor={menColor}
            womenColor={womenColor}
            differenceLabel={differenceLabel}
            type={"am_kesk"}
            unit=""
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
            Replacement rate in relation to the average wage in Estonia at the
            time of retirement
          </p>

          <PensionGraph
            menColor={menColor}
            womenColor={womenColor}
            differenceLabel={differenceLabel}
            type={"am_oma"}
            unit=""
            genderLabel={genderLabel}
            occupation={""}
          ></PensionGraph>
        </div>
      </div>
    );
  }
}

export default PensionsComponent;
