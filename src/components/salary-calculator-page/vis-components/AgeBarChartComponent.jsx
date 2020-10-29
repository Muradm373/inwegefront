import React, { Component } from "react";
import { API_URL, propsLabel } from "../../../dictionary/text";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import {connect} from "react-redux";

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
      tickTotal: 10,
      series: [
        {
          name: "Props",
          data: [],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "80%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#FFBC45"],

        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          title: {
            text: propsLabel,
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "%";
            },
          },
        },
        title: {
          text: this.props.label +
          (this.props.dates.ageDate ?  " " + this.props.dates.ageDate : ""),
          floating: true,
          offsetY: -5,
          align: "center",
          style: {
            color: "#444",
            fontSize: "14px",
            fontWeight: "200",
          },
        },
      },
    };

    this.getAgeData = this.getAgeData.bind(this);
    this.getAgeData();
  }

  componentWillReceiveProps(props) {
    this.getAgeData(props.isco);
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ tickTotal: window.innerWidth <= 760 ? 3 : 10 });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  structurizeData() {
    let categories = [];
    let data = [];
    this.state.ageData.map((e) => {
      let min = e.ageMin;
      let max = e.ageMax;
      let result = "";
      result = min + "-" + max;
      if (min == null) result = "<" + max;
      if (max == null) result = min + "+";
      categories.push(result);
      data.push(e.prop);
      return null;
    });

    let series = this.state.series;
    series[0].data = data;

    this.setState({
      series: series,
      options: {
        ...this.state.options,
        xaxis: { ...this.state.options.xaxis, categories: categories },
      },
    });
  }

  getAgeData(isco) {
    const url = `${API_URL}/`;
    if (isco !== "" && isco !== this.state.isco) {
      this.setState({ isco: isco });
      axios.get(url + "age?isco=" + isco).then((response) => {
        this.setState({ ageData: response.data.payload });
        this.structurizeData();
      });
    }
  }

  render() {
    return (
      <div className="row text-center w-100" className="age-bar">
        <div id="chart">
          <ReactApexChart
          id="apexchart"
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={300}
            width = {360}
          />
        </div>
    
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};


export default connect(mapStateToProps) (AgeBarChartComponent);
