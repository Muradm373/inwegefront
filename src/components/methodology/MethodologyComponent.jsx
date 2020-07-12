import React, { Component } from "react";
import { methodology } from "../../text";

class MethodologyComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="methodology-component">
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
