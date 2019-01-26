import React from "react";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  MarkSeriesCanvas
} from "react-vis";

import tracks from "./labelledTracks";
import playlists from "./playlistData";
import { lightGreyStroke, xAxisStyle } from "../reactVisStyles";

const playlistToIndex = value => {
  const [year, month] = value.split("-");
  const yearOffset = parseInt(year) - 2010;
  return yearOffset * 12 + parseInt(month) - 1;
};

export default ({ isDomainFixed, selectedFeature }) => {
  return (
    <div className="plot-container">
      <FlexibleWidthXYPlot
        height={300}
        yDomain={isDomainFixed ? [0, 100] : undefined}
      >
        <HorizontalGridLines style={lightGreyStroke} />
        <VerticalGridLines style={lightGreyStroke} />
        <XAxis
          title="Years"
          style={xAxisStyle}
          tickValues={playlists.map((_, i) => i).filter(i => i % 12 === 0)}
          tickFormat={value => 2010 + value / 12}
        />
        <YAxis />
        <MarkSeriesCanvas
          size={2}
          onNearestXY={value => console.log(value.track)}
          data={tracks
            .filter(track => track[selectedFeature])
            .map(track => ({
              x: playlistToIndex(track.playlist),
              y: track[selectedFeature] * 100,
              track
            }))}
        />
      </FlexibleWidthXYPlot>
    </div>
  );
};
