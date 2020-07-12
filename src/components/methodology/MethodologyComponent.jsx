import React, { Component } from "react";
import { methodology } from "../../text";

class MethodologyComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div
          className="methodology-component"
          style={{
            textAlign: "left",
            fontFamily: "Roboto",
            fontSize: "16px",
            lineHeight: "20px",
            fontWeight: "normal",
            color: "#595959",
            padding: "5%",
          }}
        >
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "22px",
              lineHeight: "28px",
              fontWeight: "normal",
              color: "#595959",
            }}
          >
            {methodology.header}
          </p>
          <p>{methodology.description}</p>
          <ul>
            {methodology.listItems.map((e) => {
              return <li>{e}</li>;
            })}
          </ul>
          <p>{methodology.itemsDescription}</p>
        </div>
      </div>
    );
  }
}

export default MethodologyComponent;
