import React from "react";
import chunk from "lodash.chunk";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  DiscreteColorLegend,
  GradientDefs,
  AreaSeries
} from "react-vis";

import { GRAPH_COLORS, MONTHS } from "../../lib/graphs";
import { Flex } from "../Layout";
import { setHoveredYear } from "../../actions/SpotifyAnalysis";
import { lightGreyStroke, xAxisStyle } from "../reactVisStyles";

import playlists from "./playlistData.json";
import minAndMax from "./minAndMax.json";
import monthlyPlaylists from "./monthlyPlaylistData.json";
import EmbeddedTrack from "./EmbeddedTrack";

const playlistsByYear = chunk(playlists, 12);

export default ({ dispatch, isDomainFixed, hoveredYear, selectedFeature }) => {
  const areaSeriesSource = hoveredYear
    ? playlistsByYear[hoveredYear]
    : monthlyPlaylists;
  return (
    <Flex column>
      <Flex wrap className="peak-tracks">
        <Flex column>
          Maximum : {minAndMax[selectedFeature].maximum.value * 100}
          <EmbeddedTrack id={minAndMax[selectedFeature].maximum.id} />
        </Flex>
        <Flex column>
          Minimum : {minAndMax[selectedFeature].minimum.value * 100}
          <EmbeddedTrack id={minAndMax[selectedFeature].minimum.id} />
        </Flex>
      </Flex>
      <div className="plot-container">
        <FlexibleWidthXYPlot
          height={300}
          yDomain={isDomainFixed ? [0, 100] : undefined}
        >
          <GradientDefs>
            <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor={
                  GRAPH_COLORS[(hoveredYear + 1) % GRAPH_COLORS.length]
                }
                stopOpacity={0.4}
              />
              <stop
                offset="100%"
                stopColor={
                  GRAPH_COLORS[(hoveredYear + 2) % GRAPH_COLORS.length]
                }
                stopOpacity={0.3}
              />
            </linearGradient>
          </GradientDefs>
          <HorizontalGridLines style={lightGreyStroke} />
          <VerticalGridLines style={lightGreyStroke} />
          <XAxis
            title="Months"
            style={xAxisStyle}
            tickFormat={i => (i % 1 === 0 ? MONTHS[i] : "")}
          />
          <YAxis />
          <AreaSeries
            color={"url(#CoolGradient)"}
            curve="curveMonotoneX"
            animation="gentle"
            data={areaSeriesSource.map((playlist, x) => ({
              x,
              y:
                playlist[selectedFeature].average -
                playlist[selectedFeature].standardDeviation / 2,
              y0:
                playlist[selectedFeature].average +
                playlist[selectedFeature].standardDeviation / 2
            }))}
          />
          {hoveredYear === false && (
            <LineSeries
              curve="curveMonotoneX"
              animation="gentle"
              color="#fff"
              style={{
                strokeWidth: 4
              }}
              data={monthlyPlaylists.map((playlist, i) => ({
                x: i,
                y: playlist[selectedFeature].average
              }))}
            />
          )}
          {playlistsByYear.map((year, i) => (
            <LineSeries
              curve="curveMonotoneX"
              animation="gentle"
              key={i}
              style={{
                stroke: GRAPH_COLORS[i % GRAPH_COLORS.length],
                strokeWidth: hoveredYear === i ? 4 : 1
              }}
              data={year.map((playlist, x) => ({
                x,
                y: playlist[selectedFeature].average
              }))}
            />
          ))}
        </FlexibleWidthXYPlot>
        <DiscreteColorLegend
          orientation="horizontal"
          items={playlistsByYear.map((_, i) => "201" + i)}
          colors={GRAPH_COLORS}
          onItemMouseEnter={i => dispatch(setHoveredYear(i - 2010))}
          onItemMouseLeave={() => dispatch(setHoveredYear(false))}
          onItemClick={() => {}}
        />
      </div>
    </Flex>
  );
};
