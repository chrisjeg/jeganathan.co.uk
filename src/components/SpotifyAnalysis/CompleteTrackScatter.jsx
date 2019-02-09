import React, { useState } from "react";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  MarkSeries
} from "react-vis";

import "./CompleteTrackScatter.scss";
import classNames from "classnames";
import tracks from "./labelledTracks";
import playlists from "./playlistData";
import { lightGreyStroke, xAxisStyle } from "../reactVisStyles";
import { Flex } from "../Layout";

const playlistToIndex = value => {
  const [year, month] = value.split("-");
  const yearOffset = parseInt(year) - 2010;
  return yearOffset * 12 + parseInt(month) - 1;
};

export default function CompleteTrackScatter({
  isDomainFixed,
  selectedFeature
}) {
  const [track, setTrack] = useState(tracks[0]);

  return (
    <Flex wrap className="complete-track-scatter">
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
          <YAxis title={selectedFeature} />
          <MarkSeries
            size={2}
            onNearestXY={value => setTrack(value.track)}
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
      <Track selectedFeature={selectedFeature} {...track} />
    </Flex>
  );
}

const Track = ({
  selectedFeature,
  playlist,
  image,
  uri,
  name,
  artists,
  preview_url,
  ...features
}) => {
  return (
    <Flex wrap className="track-info">
      <Flex column grow className="track-detail">
        <a href={uri}>
          <img src={image} className="album-art" alt="album-art" />
        </a>
        <div>{name}</div>
        <div>{artists[0]}</div>
        <div>{playlist}</div>
      </Flex>
      <Flex column grow>
        {Object.keys(features).map(name => (
          <div
            key={name}
            className={classNames({
              bold: name === selectedFeature
            })}
          >
            {name} : {(features[name] * 100).toFixed(2)}
          </div>
        ))}
      </Flex>
    </Flex>
  );
};
