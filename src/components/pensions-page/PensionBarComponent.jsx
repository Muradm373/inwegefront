/* eslint-disable */
import React, { Component } from "react";
import {
    HorizontalBarSeries,
    XYPlot,
    XAxis,
    LabelSeries, FlexibleWidthXYPlot,
} from "react-vis";
import { averageBetweenMenAndWomen, quarter } from "../../dictionary/text";
import {connect} from "react-redux";
import {formatNumber} from "../../actions/actions";

class PensionBarComponent extends Component {

    formatPensionBarLabel(data){
        if(this.props.percentage) {
            if(this.props.language !== "en")
                return data.replace(".", ",")
            else
                return data
        }
        else
            return formatNumber(Math.ceil(data), this.props.language)
    }

    render() {
        return (
            <div>
                <div
                    className="barseries h4-stat"
                    style={{ width: "100%",}}
                >
                    <FlexibleWidthXYPlot height={130} animation="gentle" margin={{right: 15 }} >
                        {this.props.language === "en" ? <XAxis
                                style={{ stroke: "black", strokeWidth: 0.5, opacity: 1 }}
                                tickTotal={7}
                            />:
                            <XAxis
                                style={{stroke: "black", strokeWidth: 0.5, opacity: 1,
                                    fontFamily: "Roboto",
                                    fontWeight: "normal",
                                    fontSize: "13px",
                                    lineHeight: "16px",
                                    color: "#595959"
                                }}
                                tickTotal={7}
                                tickFormat={d => {
                                    return d;
                                }
                                }

                            />
                        }

                        <HorizontalBarSeries
                            data={[{ y: 2, x: parseInt(this.props.menMean) }]}
                            color={this.props.menColor}
                        />
                        <LabelSeries
                            style={{ fill: "white", fontSize: "15px", opacity: "0.8" }}
                            data={[
                                {
                                    y: 2,
                                    x: this.props.menMean * 0.5,
                                    label: this.formatPensionBarLabel(this.props.menMean.toString()),
                                    yOffset: -15,
                                },
                            ]}
                            labelAnchorY="middleAlignment"
                        />
                        <HorizontalBarSeries
                            data={[{ y: 2, x: parseInt(this.props.womenMean) }]}
                            color={this.props.womenColor}
                        />

                        <LabelSeries
                            style={{ fill: "white", fontSize: "15px", opacity: "0.8" }}
                            data={[
                                {
                                    y: 2,
                                    x: this.props.menMean * 0.5,
                                    label: this.formatPensionBarLabel(this.props.womenMean.toString()),
                                    yOffset: 20,
                                },
                            ]}
                            labelAnchorY="middleAlignment"
                        />
                    </FlexibleWidthXYPlot>
                    <div className="graph-xaxis-tick body-stat mr-4 ">
          <p>{this.props.percentage?"%" : "€"}</p>
        </div>
                    <p className={"body-stat text-left"}>{this.props.label}</p>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        ...state
    };
}

export default connect(mapStateToProps)(PensionBarComponent);
