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

    render() {
        return (
            <div>
                <div
                    className="barseries h4-stat"
                    style={{ width: "100%",}}
                >
                    <FlexibleWidthXYPlot height={130} animation="gentle">
                        {this.props.language === "en" ? <XAxis
                                style={{ stroke: "black", strokeWidth: 0.5, opacity: 1 }}
                                tickTotal={7}
                                title={this.props.percentage?"%" : "€"}
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
                                title={this.props.percentage?"%" : "€"}

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
                                    label: this.props.percentage ? this.props.menMean.toString() : formatNumber(parseInt(this.props.menMean.toString()), this.props.language),
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
                                    label: this.props.percentage ? this.props.womenMean.toString() :formatNumber(parseInt(this.props.womenMean.toString()), this.props.language),
                                    yOffset: 20,
                                },
                            ]}
                            labelAnchorY="middleAlignment"
                        />
                    </FlexibleWidthXYPlot>
                    <p className={"body-stat text-left ml-5"}>{this.props.label}</p>
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
