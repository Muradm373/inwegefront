import React, { Component } from "react";
import {API_URL, propsLabel, quarter} from "../../../dictionary/text";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import {connect} from "react-redux";



class AgeBarChartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      occupation: props.occupation,
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
          width: "100%"
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "70%",
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
          axisTicks: {
            show: true,
            color: '#78909C',
            height: 6,
          },
        },
        yaxis: {
          title: {
            text: propsLabel,
          },
          tickAmount: 5
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
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            return (
                '<div class="arrow_box text-left wrap-stat">' +
                   '<span >' +
                      w.globals.labels[dataPointIndex] +
                      `: Kokku ametialal - } : ` +
                    "</span>"+
                    "<div>" +
                                     +
                      series[seriesIndex][dataPointIndex] +
                    "</div>"+
                "</div>"
            );
          }
        },
        title: {
          text: this.props.label +
              `${this.props.dates.ageDate} (${this.props.dates.ageDataQuarter} ${quarter})`,
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
    this.getOccupation = this.getOccupation.bind(this);
    this.getAgeData();
  }


  componentWillReceiveProps(props) {
    this.getAgeData(props.isco);
    window.addEventListener("resize", this.resize.bind(this));

    this.setState({ occupation:props.occupation,options: {
        ...this.state.options, tooltip: {
          y: {
            formatter: function (val) {
              return val + "%";
            },
          },
          custom: this.getOccupation
        },
      }
    })
    this.resize();
  }

  getOccupation(data){
      return (
          `<div class="arrow_box text-left"> 
                  <p class="arrow-box-p">
                    ${data.w.globals.labels[data.dataPointIndex]}: <br/>
                    ${this.splitWords(this.state.occupation, 30)} : 
                        ${data.series[data.seriesIndex][data.dataPointIndex]}%
                  </p>
                </div>`
      );
  }

  splitWords(text, limit){
    let splitText = "";
    for(let i = 0; i < text.length; i++){
      splitText += text[i];
      if(i !== 0 && i % limit === 0)
        splitText += '<br/>'
    }

    return splitText;
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
      <div className="row text-center age-bar mx-auto" >
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
