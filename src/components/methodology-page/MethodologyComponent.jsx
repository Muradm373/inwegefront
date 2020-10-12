import React, { Component } from "react";
import { methodology } from "../../dictionary/text";

class MethodologyComponent extends Component {

  render() {
    return (
      <div className="methodology-paper text-center mx-auto card-shadow-forecast m-3 mb-5">
        <div id="methodology-component" className="block-page-title-block p-5">
          <br></br>
          <br></br>
          <p>{methodology.description}</p>
          <br></br>
          <br></br>
          <ul>
            {methodology.listItems.map((e, index) => {
              return <li><p className="ml-4">{index+1}) {e}</p></li>;
            })}
          </ul>
          <br></br>
          <p>{methodology.itemsDescription}</p>
        </div>
      </div>
    );
  }
}

export default MethodologyComponent;
