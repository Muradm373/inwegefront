import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import ee from "./ee.json";

const MapChart = () => {
  console.log(ee);
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 250 }}>
        <Geographies geography={ee}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const l = geo.properties.MNIMI;
                  // setTooltipContent(`${l}`);
                  console.log(l);
                }}
                onMouseLeave={() => {
                  // setTooltipContent("");
                }}
                style={{
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
                  }
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
