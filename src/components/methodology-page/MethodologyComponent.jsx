import React, { Component } from "react";
import AboutEst from "../../dictionary/AboutEst";
import AboutRus from "../../dictionary/AboutRus";
import AboutEng from "../../dictionary/AboutEng";
import { methodology } from "../../dictionary/text";
import { connect } from "react-redux";

class MethodologyComponent extends Component {
  renderAboutPage(language) {
    switch (language) {
      case "en":
        return <AboutEng />;
      case "ru":
        return <AboutRus />;
      default:
        return <AboutEst />;
    }
  }
  render() {
    return (
      <div className="methodology-paper text-center mx-auto card-shadow-forecast m-3 mb-5">
        <div id="methodology-component" className="block-page-title-block p-5">
          {this.renderAboutPage(this.props.language)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};

export default connect(mapStateToProps)(MethodologyComponent);
