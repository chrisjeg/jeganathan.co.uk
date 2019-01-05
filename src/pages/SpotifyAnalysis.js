import React, { Component, useReducer } from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  AreaSeries,
  GradientDefs,
  DiscreteColorLegend
} from 'react-vis';
import chunk from "lodash.chunk";
import reducer from "../reducers/SpotifyAnalysis";

import playlists from "../playlistData.json";
import monthlyPlaylists from "../monthlyPlaylistData.json";

import './SpotifyAnalysis.scss';
import Banner from '../components/Banner.js';

const dataSets = [
  "popularity",
  "liveness",
  "valence",
  "instrumentalness",
  "danceability",
  "speechiness",
  "acousticness",
]

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const colors = ["#06D6A0", "#FFD166", "#EF476F", "#118AB2", "#F26419", "#4357AD", "#DB222A"]
const LIGHT_GREY = "#DDD";
const MAX_WINDOW_SIZE = 6;



function SpotifyAnalysisPage() {
  const [state, dispatch] = useReducer(reducer);


}

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedItem: "popularity",
      hoveredYear: false,
      windowSize: 0,
      setDomain: false
    }
    this.incrementMovingAverageWindow = this.incrementMovingAverageWindow.bind(this);
    this.decrementMovingAverageWindow = this.decrementMovingAverageWindow.bind(this);
  }

  decrementMovingAverageWindow() {
    this.setState(prev =>
      prev.windowSize > 0 ? { windowSize: prev.windowSize - 1 } : {}
    )
  }

  incrementMovingAverageWindow() {
    this.setState(prev =>
      prev.windowSize < MAX_WINDOW_SIZE ? { windowSize: prev.windowSize + 1 } : {}
    )
  }

  render() {
    const playlistsByYear = chunk(playlists, 12);
    return (
      <>
        <Banner header="9 Years of Monthly Playlists">
          <button className="slide-transition" onClick={() => this.setState(prev => ({ setDomain: !prev.setDomain }))}>Set Domain</button>
          <div>
            <button className="button-control" onClick={this.decrementMovingAverageWindow}>&lt;</button>
            {this.state.windowSize * 2} months
          <button onClick={this.incrementMovingAverageWindow}>&gt;</button>
          </div>
        </Banner>
        <div>
          <XYPlot width={1000} height={300} yDomain={this.state.setDomain ? [0, 100] : undefined}>
            <HorizontalGridLines style={{ stroke: LIGHT_GREY }} />
            <VerticalGridLines style={{ stroke: LIGHT_GREY }} />
            <XAxis
              title="Months"
              style={{
                line: { stroke: LIGHT_GREY },
                text: { stroke: 'none', fill: '#333', fontWeight: 600 }
              }}
              tickFormat={value => playlists[value].name}
            />
            <YAxis />
            {dataSets.map((type, i) => (<LineSeries
              curve="curveMonotoneX"
              key={i}
              style={{
                stroke: colors[i % colors.length],
                strokeWidth: this.state.hoveredItem === type ? 4 : 1
              }}
              animation="gentle"
              data={movingAverage(playlists
                .map(playlist => playlist[type].average), this.state.windowSize)
                .map((y, x) => ({ x, y }))
              }
            />))}
          </XYPlot>
          <DiscreteColorLegend
            orientation="horizontal"
            colors={colors}
            items={dataSets}
            onItemMouseEnter={i => this.setState({ hoveredItem: i })}
            onItemClick={i => this.setState({ selectedItem: i })}
            onItemMouseLeave={() => this.setState({ hoveredItem: false })} />
        </div>
        <h3>{`${this.state.selectedItem} ${this.state.hoveredYear !== false ? "(" + (this.state.hoveredYear + 2010) + ")" : ""}`}</h3>
        <XYPlot width={1000} height={300} yDomain={this.state.setDomain ? [0, 100] : undefined}>
          <GradientDefs>
            <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={colors[(this.state.hoveredYear + 1) % colors.length]} stopOpacity={0.4} />
              <stop offset="100%" stopColor={colors[(this.state.hoveredYear + 2) % colors.length]} stopOpacity={0.3} />
            </linearGradient>
          </GradientDefs>
          <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
          <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
          <XAxis
            title="X Axis"
            style={{
              line: { stroke: '#ADDDE1' },
              ticks: { stroke: '#ADDDE1' },
              text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
            }}
            tickFormat={i => i % 1 === 0 ? months[i] : ""}
          />
          <YAxis title="Y Axis" />
          {this.state.hoveredYear !== false ? <AreaSeries
            color={'url(#CoolGradient)'}
            curve="curveMonotoneX"
            animation="gentle"
            data={playlistsByYear[this.state.hoveredYear].map((playlist, x) => ({
              x,
              y: playlist[this.state.selectedItem].average - (playlist[this.state.selectedItem].standardDeviation / 2),
              y0: playlist[this.state.selectedItem].average + (playlist[this.state.selectedItem].standardDeviation / 2)
            }))}
          /> : <AreaSeries
              curve="curveMonotoneX"
              color={'url(#CoolGradient)'}
              animation="gentle"
              data={monthlyPlaylists.map((playlist, x) => ({
                x,
                y: playlist[this.state.selectedItem].average - (playlist[this.state.selectedItem].standardDeviation / 2),
                y0: playlist[this.state.selectedItem].average + (playlist[this.state.selectedItem].standardDeviation / 2)
              }))}
            />}
          {this.state.hoveredYear === false && <LineSeries
            curve="curveMonotoneX"
            animation="gentle"
            color="#fff"
            style={{
              strokeWidth: 4
            }}
            data={monthlyPlaylists.map((playlist, i) => ({
              x: i,
              y: playlist[this.state.selectedItem].average
            }))}
          />}
          {playlistsByYear.map((year, i) => (<LineSeries
            curve="curveMonotoneX"
            animation="gentle"
            key={i}
            style={{
              stroke: colors[i % colors.length],
              strokeWidth: this.state.hoveredYear === i ? 4 : 1
            }}
            data={year.map((playlist, x) => ({ x, y: playlist[this.state.selectedItem].average }))}
          />))}

        </XYPlot>
        <DiscreteColorLegend
          orientation="horizontal"
          items={playlistsByYear.map((_, i) => "201" + i)}
          colors={colors}
          onItemMouseEnter={i => this.setState({ hoveredYear: i - 2010 })}
          onItemMouseLeave={() => this.setState({ hoveredYear: false })}
          onItemClick={() => { }} />
      </>
    );
  }
}

const movingAverage = (array, windowSize = 0) => {
  const newArray = [];
  if (!windowSize) {
    return array;
  }
  for (let i = 0; i < array.length; i++) {
    const start = i - windowSize;
    const end = i + windowSize
    const actualStart = start >= 0 ? start : 0;
    const actualEnd = (end < array.length) ? end : array.length - 1;

    const sample = array.slice(actualStart, actualEnd);
    newArray.push(sample.reduce((acc, val) => {
      acc += val;
      return acc;
    }, 0) / sample.length);
  }
  return newArray;
}


export default App;
