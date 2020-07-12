import React, { Component } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  Hint,
  LabelSeries,
} from "react-vis";
import { API_URL } from "../../text";
import axios from "axios";

class AgeBarChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageData: [],
      greenData: [
        { x: "0", y: 0 },
        { x: "0", y: 0 },
        { x: "0", y: 0 },
      ],
      value: false,
    };

    this.getAgeData = this.getAgeData.bind(this);
    this.getAgeData();
  }

  componentWillReceiveProps(props) {
    this.getAgeData(props.isco);
  }

  structurizeData() {
    let categories = [];
    this.state.ageData.map((e) => {
      let min = e.ageMin;
      let max = e.ageMax;
      let result = "";
      result = min + "-" + max;
      if (min == null) result = "<" + max;
      if (max == null) result = min + "<";
      categories.push({
        x: result,
        y: e.prop,
        label: 5,
      });
    });

    this.setState({ greenData: categories });
  }

  getAgeData(isco) {
    const url = `${API_URL}/`;
    axios.get(url + "age?isco=" + isco).then((response) => {
      this.setState({ ageData: response.data.payload });
      this.structurizeData();
    });
  }

  _forgetValue = () => {
    this.setState({
      value: null,
    });
  };

  _rememberValue = (value) => {
    this.setState({ value });
    console.log(value);
  };

  render() {
    return (
      <div className="row justify-content-center text-center">
        <XYPlot
          xType="ordinal"
          width={500}
          height={300}
          yDistance={100}
          style={{ padding: "-100px" }}
          onMouseLeave={() => this.setState({ value: false })}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickTotal={10} title="Ages" tickLabelAngle={-45} />
          <YAxis title="props" />
          <VerticalBarSeries
            onValueMouseOver={(v) => this._rememberValue(v)}
            onValueMouseOut={this._forgetValue}
            data={this.state.greenData}
            style={{ marginTop: "10px" }}
          ></VerticalBarSeries>
          {this.state.value ? (
            <Hint
              value={this.state.value}
              horizontalAlign={Hint.ALIGN.RIGHT}
              verticalAlign={Hint.ALIGN.BOTTOM}
            >
              <div className="custom-hint">
                <p style={{ margin: "10px" }}>{this.state.value.y}</p>
              </div>
            </Hint>
          ) : null}
        </XYPlot>
      </div>
    );
  }
}

export default AgeBarChartComponent;
