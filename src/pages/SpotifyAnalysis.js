import React, { useReducer } from "react";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  AreaSeries,
  GradientDefs,
  DiscreteColorLegend
} from "react-vis";
import chunk from "lodash.chunk";

import reducer, { initialState } from "../reducers/SpotifyAnalysis";

import {
  toggleDomain,
  decrementWindowSize,
  incrementWindowSize,
  setHoveredFeature,
  setSelectedFeature,
  setHoveredYear
} from "../actions/SpotifyAnalysis";
import "./SpotifyAnalysis.scss";
import { Flex } from "../components/Layout";
import Banner from "../components/Banner";
import {
  GRAPH_COLORS,
  MONTHS,
  AUDIO_FEATURES,
  movingAverage
} from "../lib/graphs";

import playlists from "../playlistData.json";
import monthlyPlaylists from "../monthlyPlaylistData.json";
const playlistsByYear = chunk(playlists, 12);

// Styles
const lightGreyStroke = {
  stroke: "#DDD"
};
const xAxisStyle = {
  line: lightGreyStroke,
  text: { stroke: "none", fill: "#333", fontWeight: 600 }
};

const convertToFeatureHeader = (feature, year) => {
  const featureTitle = feature[0].toUpperCase() + feature.slice(1);
  const formattedYear = year !== false ? `(${year + 2010})` : "";
  return featureTitle + " " + formattedYear;
};

function SpotifyAnalysisPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const featureSectionHeader = convertToFeatureHeader(
    state.selectedFeature,
    state.hoveredYear
  );
  const areaSeriesSource = state.hoveredYear
    ? playlistsByYear[state.hoveredYear]
    : monthlyPlaylists;
  return (
    <div className="spotify-analysis">
      <Header
        isDomainFixed={state.isDomainFixed}
        windowSize={state.windowSize}
        onToggleDomain={() => dispatch(toggleDomain())}
        onIncrement={() => dispatch(incrementWindowSize())}
        onDecrement={() => dispatch(decrementWindowSize())}
      />
      <Banner
        color="green"
        header="Feature Breakdown"
        description="some description"
        isToggledOnVisible={false}
      >
        <div className="plot-container">
          <FlexibleWidthXYPlot
            height={300}
            yDomain={state.isDomainFixed ? [0, 100] : undefined}
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
                  strokeWidth: state.hoveredFeature === type ? 4 : 1
                }}
                animation="gentle"
                data={movingAverage(
                  playlists.map(playlist => playlist[type].average),
                  state.windowSize
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
      </Banner>
      <Banner
        color="blue"
        header={featureSectionHeader}
        description="some description"
        isToggledOnVisible={false}
      >
        <div className="plot-container">
          <FlexibleWidthXYPlot
            height={300}
            yDomain={state.isDomainFixed ? [0, 100] : undefined}
          >
            <GradientDefs>
              <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={
                    GRAPH_COLORS[(state.hoveredYear + 1) % GRAPH_COLORS.length]
                  }
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor={
                    GRAPH_COLORS[(state.hoveredYear + 2) % GRAPH_COLORS.length]
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
                  playlist[state.selectedFeature].average -
                  playlist[state.selectedFeature].standardDeviation / 2,
                y0:
                  playlist[state.selectedFeature].average +
                  playlist[state.selectedFeature].standardDeviation / 2
              }))}
            />
            {state.hoveredYear === false && (
              <LineSeries
                curve="curveMonotoneX"
                animation="gentle"
                color="#fff"
                style={{
                  strokeWidth: 4
                }}
                data={monthlyPlaylists.map((playlist, i) => ({
                  x: i,
                  y: playlist[state.selectedFeature].average
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
                  strokeWidth: state.hoveredYear === i ? 4 : 1
                }}
                data={year.map((playlist, x) => ({
                  x,
                  y: playlist[state.selectedFeature].average
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
      </Banner>
    </div>
  );
}

const Header = ({
  isDomainFixed,
  windowSize,
  onIncrement,
  onDecrement,
  onToggleDomain
}) => (
  <Banner header="9 Years of Monthly Playlists" isToggledOnVisible={false}>
    <Flex>
      <button onClick={onToggleDomain}>
        Use {isDomainFixed ? "Dynamic" : "Fixed"} Graph Domain
      </button>
      <Flex className="button-controls">
        <button className="button-control" onClick={onDecrement}>
          &lt;
        </button>
        {windowSize * 2} months
        <button className="button-control" onClick={onIncrement}>
          &gt;
        </button>
      </Flex>
    </Flex>
  </Banner>
);

export default SpotifyAnalysisPage;
