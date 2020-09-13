import React, { Component } from "react";
import { methodology } from "../../dictionary/text";

class MethodologyComponent extends Component {

  render() {
    return (
      <div className="w-75 text-center mx-auto card-shadow-forecast">
        <div className="methodology-component">
          <p className="methodology-header">{methodology.header}</p>
          <br></br>
          <br></br>
          <p>{methodology.description}</p>
          <br></br>
          <br></br>
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
