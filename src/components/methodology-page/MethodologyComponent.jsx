import React, { Component } from "react";
import { methodology } from "../../dictionary/text";

class MethodologyComponent extends Component {

  render() {
    return (
      <div>
        <div className="methodology-component">
          <p className="methodology-header">{methodology.header}</p>
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
