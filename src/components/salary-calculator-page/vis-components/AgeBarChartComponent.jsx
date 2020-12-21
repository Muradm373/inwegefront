import React, { Component } from "react";
import {API_URL, menColor, monthLabel, propsLabel, quarter, womenColor} from "../../../dictionary/text";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import {connect} from "react-redux";
import { exportComponentAsJPEG, exportComponentAsPNG } from 'react-component-export-image';


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
          toolbar: {
            show: false
          },
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
          labels: {
            formatter: function (val) {
              return val;
            }
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
                `<div class="arrow_box text-left wrap-stat">
                <p class="arrow-box-p">
                </p>
                <div className="row ml-3 " style="margin-top: -35px">
                  <div className="circle-legend mt-2"
                       style="background-color: #FFBC45"></div>
                  <p className="ml-1">
                     ${w.globals.labels[dataPointIndex]}: Kokku ametialal - } :
                      ${series[seriesIndex][dataPointIndex]}aaaaaa
                  </p>
                  </div>
                </div>`
            );
          }
        },
        title: {
          text: "",
          floating: true,
          align: "center",
          style: {
            fontFamily: "Roboto",
            color: "#444",
            fontSize: "14px",
            fontWeight: "200",
          },
        },
      },
      mapDownloadMenu: false,
    };

    this.getAgeData = this.getAgeData.bind(this);
    this.componentRef = React.createRef();
    this.getOccupation = this.getOccupation.bind(this);
    this.getAgeData();
  }

  async promiseState() {
    new Promise(resolve => this.setState({ mapDownloadMenu: !this.state.mapDownloadMenu }, resolve));
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
                    ${data.w.globals.labels[data.dataPointIndex]}:
                     </p>
                     <br/>
                     <div class="row ml-3" >
                  <div class="circle-legend mt-2" style="background-color: ${"#FFBC45"}"></div>
                  <p class="ml-1 text-left h6-stat-white mt-1">
                    ${this.splitWords(`Kokku ametialal - ${this.state.occupation.toLowerCase()}`, 25)} 
                        ${this.props.language==="en" ? data.series[data.seriesIndex][data.dataPointIndex].toString():
              data.series[data.seriesIndex][data.dataPointIndex].toString().replace('.', ",")}%
                  </p>
                  </div>
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
      <div ref={this.componentRef} >
        <p className="graph-legends mx-auto pl-4 h4-stat text-left px-auto" style={{height: "40px", position: "absolute"}}>
          {this.props.label +
          ` | ${this.props.dates.ageDataQuarter} ${quarter} ${this.props.dates.ageDate}`}
        </p>
        <br/>
        <br/>
        <div id="chart" className={"mb-0 mt-4"}>
          <ReactApexChart
          id="apexchart"
            className={"mx-auto"}
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={300}
            width = {360}
          />
        </div>
        <div className="agebar-xaxis-label h6-stat-gray">
          <p>{`${propsLabel}`}</p>
        </div>

        <div className={"source-tip-agebar"}>
          <p className={"source-label-style"}>
            Allikas: statistikaamet
          </p>
        </div>

        <div
            className="apexcharts-toolbar apexcharts-toolbar-holder-agebar"
        >
          <div
              className="apexcharts-menu-icon"
              style={{}}
              title="Menu"
              onClick={() => {
                this.setState({ mapDownloadMenu: !this.state.mapDownloadMenu });
              }}
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </div>

          <div
              className={
                "apexcharts-menu " +
                (this.state.mapDownloadMenu ? "apexcharts-menu-open" : "")
              }
          >
            <div
                className="apexcharts-menu-item exportPNG"
                onClick={() => {
                  this.promiseState().then(()=>exportComponentAsPNG(this.componentRef))
                }}
                title="Download PNG"
            >
              Download PNG
            </div>
            <div
                className="apexcharts-menu-item exportPDF"
                title="Download JPEG"
                onClick={() => {
                  this.promiseState().then(()=>exportComponentAsJPEG(this.componentRef))
                }}
            >
              Download JPEG
            </div>
          </div>

        </div>
        <div className="graph-legends mx-auto pl-5">
          <div className={"row"}>
            <div
                className="circle-legend"
                style={{
                  background: "#FFBC45",
                }}
            ></div>
            <p
                className="graph-legend-age h6-stat-gray"
            >
              {`Kokku ametialal - ${this.props.occupation}`}
            </p>

          </div>
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
