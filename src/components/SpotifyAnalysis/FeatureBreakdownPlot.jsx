import React from "react";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  DiscreteColorLegend
} from "react-vis";

import { lightGreyStroke, xAxisStyle } from "../reactVisStyles";

import {
  setHoveredFeature,
  setSelectedFeature
} from "../../actions/SpotifyAnalysis";

import { GRAPH_COLORS, AUDIO_FEATURES, movingAverage } from "../../lib/graphs";

import playlists from "./playlistData.json";

export default ({ dispatch, isDomainFixed, hoveredFeature, windowSize }) => (
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
      {AUDIO_FEATURES.map((type, i) => (
        <LineSeries
          curve="curveMonotoneX"
          key={i}
          style={{
            stroke: GRAPH_COLORS[i % GRAPH_COLORS.length],
            strokeWidth: hoveredFeature === type ? 4 : 1
          }}
          animation="gentle"
          data={movingAverage(
            playlists.map(playlist => playlist[type].average),
            windowSize
          ).map((y, x) => ({ x, y }))}
        />
      ))}
    </FlexibleWidthXYPlot>
    <DiscreteColorLegend
      orientation="horizontal"
      colors={GRAPH_COLORS}
      items={AUDIO_FEATURES}
      onItemMouseEnter={feature => dispatch(setHoveredFeature(feature))}
      onItemClick={feature => dispatch(setSelectedFeature(feature))}
      onItemMouseLeave={() => dispatch(setHoveredFeature(undefined))}
    />
  </div>
);
