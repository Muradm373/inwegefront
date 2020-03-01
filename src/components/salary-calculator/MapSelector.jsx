import React, { memo, Component } from "react";
import { API_URL } from "../../text";
import { geoCentroid } from "d3-geo";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import ee from "../../ee.json";
import axios from "axios";

const replaceMaakond = maakond => {
  return maakond.replace("maakond", "");
};

class MapSelector extends Component {
  constructor(props) {
    super();

    this.state = {
      selected: "",
      averages: [],
      notSelectedStyle: {
        default: {
          fill: props.mapElementColor,
          outline: "none"
        },
        hover: {
          fill: "#FFFFFF",
          outline: "none"
        },
        pressed: {
          fill: "#FFF",
          outline: "none"
        }
      },
      selectedStyle: {
        default: {
          fill: "#FFF",
          outline: "none"
        },
        hover: {
          fill: "#FFF",
          outline: "none"
        },
        pressed: {
          fill: "#FFF",
          outline: "none"
        }
      }
    };

    this.getMeansForAllRegions();
    this.getMeanForRegion("Harju maakond");

    this.getMeansForAllRegions = this.getMeansForAllRegions.bind(this);
    this.getMeanForRegion = this.getMeanForRegion.bind(this);
  }

  getMeansForAllRegions() {
    const url = `${API_URL}/`;
    axios
      .get(url + "regions/average")
      .then(response => response.data)
      .then(data => {
        this.setState({ averages: data.payload });
      });
  }

  componentWillReceiveProps(props) {
    this.setState({
      notSelectedStyle: {
        default: {
          fill: props.mapElementColor,
          outline: "none"
        },
        hover: {
          fill: "#FFFFFF",
          outline: "none"
        },
        pressed: {
          fill: "#FFF",
          outline: "none"
        }
      }
    });
  }

  getMeanForRegion(region) {
    let data = {};
    this.state.averages.map(el => {
      if (el.region === region) {
        data = "Men: €" + el.maleAverage + "\nWomen: €" + el.femaleAverage;
        return data;
      }
    });
    return data;
  }

  render() {
    return (
      <>
        <ComposableMap data-tip="" projectionConfig={{ scale: 340 }}>
          <Geographies geography={ee}>
            {({ geographies }) => (
              <>
                {geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const l = geo.properties.MNIMI;
                      const data = this.getMeanForRegion(l);

                      this.props.setTooltipContent(data.toString());
                    }}
                    onMouseLeave={() => {
                      this.props.setTooltipContent("");
                    }}
                    onClick={() => {
                      const selectedRegion = geo.properties.MNIMI;
                      this.setState({ selected: selectedRegion });
                      this.props.onRegionChange({ value: selectedRegion });
                    }}
                    style={
                      this.state.selected !== geo.properties.MNIMI
                        ? this.state.notSelectedStyle
                        : this.state.selectedStyle
                    }
                  />
                ))}
                {geographies.map(geo => {
                  const centroid = geoCentroid(geo);
                  return (
                    <g key={geo.rsmKey + "-name"}>
                      {true ? (
                        <Marker coordinates={centroid}>
                          <text
                            style={{ fontSize: "10pt", fontFamily: "Verdana" }}
                            y="2"
                            fontSize={14}
                            textAnchor="middle"
                          >
                            {replaceMaakond(geo.properties.MNIMI)}
                          </text>
                        </Marker>
                      ) : (
                        <></>
                      )}
                    </g>
                  );
                })}
              </>
            )}
          </Geographies>
        </ComposableMap>
      </>
    );
  }
}

export default memo(MapSelector);
