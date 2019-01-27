import React, { useState, useEffect } from "react";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  MarkSeriesCanvas
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
  const [update, forceUpdate] = useState();

  useEffect(() => {
    window.addEventListener('resize', forceUpdate);
    return () => window.removeEventListener('resize', forceUpdate);
  }, []);

  return (
    <Flex>
      <div className="plot-container scatter">
        <FlexibleWidthXYPlot
          height={update && 300}
          yDomain={isDomainFixed ? [0, 100] : undefined}
          update={update}
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
    <Flex className="track-info">
      <Flex column grow className="track-detail">
        <a href={uri}>
        <img src={image} className="album-art" alt="album-art"/></a>
        <div>{name}</div>
        <div>{artists[0]}</div>
        <div>{playlist}</div>
        <audio controls src={preview_url} className="audio-sample"/>
      </Flex>
      <Flex column grow>
        {Object.keys(features).map(name => (
          <div key={name} className={classNames({
            bold: name === selectedFeature
          })}>{name} : {(features[name] * 100).toFixed(2)}</div>
        ))}
      </Flex>
    </Flex>
  );
};
