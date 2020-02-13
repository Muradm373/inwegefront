import React, { memo, Component } from "react";
import { geoCentroid } from "d3-geo";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import ee from "./ee.json";

const replaceMaakond = (maakond) =>{
  return maakond.replace("maakond", "");
}

class MapChart extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: "",
      notSelectedStyle: {
                  default: {
                    fill: "#c7ddf3",
                    outline: "none"
                  },
                  hover: {
                    fill: "#F53",
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none"
                  },
                  selected: {
                    fill: "#E42",
                    outline: "none"
                  }
                },
     selectedStyle: {
                  default: {
                    fill: "#E42",
                    outline: "none"
                  },
                  hover: {
                    fill: "#F53",
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none"
                  },
                  selected: {
                    fill: "#E42",
                    outline: "none"
                  }
                }
    }
  }
  render() { 
     return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 350  }}>
        <Geographies geography={ee}>
          {({ geographies }) =>(
            <>
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const l = geo.properties.MNIMI;
                  // setTooltipContent(`${l}`);
                }}
                onMouseLeave={() => {
                  // setTooltipContent("");
                }}
                onClick={()=>{
                  const selectedRegion = geo.properties.MNIMI;
                  this.setState({selected: selectedRegion})
                  this.props.onRegionChange(selectedRegion)
                }}
                style={this.state.selected!==geo.properties.MNIMI?this.state.notSelectedStyle:this.state.selectedStyle}
              />
            ))}
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {
                    (true ? (
                      <Marker coordinates={centroid}>
                        <text style={{fontSize: "8pt"}} y="2" fontSize={14} textAnchor="middle">
                          {replaceMaakond(geo.properties.MNIMI)}
                        </text>
                      </Marker>
                    
                    ) :<></>)}
                </g>
              );
            })}
            </>
          )
          }
        </Geographies>
      </ComposableMap>
    </>
  );
  }
}
 

export default memo(MapChart);
