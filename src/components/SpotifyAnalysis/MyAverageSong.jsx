import React from "react";
import { Flex } from "../Layout";
import { RadarChart, makeWidthFlexible } from "react-vis";
import "./MyAverageSong.scss";

import { AUDIO_FEATURES } from "../../lib/graphs";

const RADAR_PROPS = {
  data: [
    {
      liveness: 0.1915876163873375,
      valence: 0.5400935133457481,
      instrumentalness: 0.047959706703910504,
      danceability: 0.5950908752327756,
      speechiness: 0.07932216014897578,
      acousticness: 0.1637370023339542,
      energy: 0.7215364618249529
    }
  ],
  domains: AUDIO_FEATURES.filter(feature => feature !== "popularity").map(
    feature => ({
      name: feature,
      domain: [0, 1]
    })
  ),
  startingAngle: Math.PI / 3,
  height: 400,
  margin:{top: 30, right: 40}
};

const FlexibleWidthRadarChart = makeWidthFlexible(RadarChart);

export default () => (
  <Flex wrap center>
    <div className="radar-container">
      <FlexibleWidthRadarChart
        {...RADAR_PROPS}
        style={{
          labels: {
            fontSize: 10
          },
          polygons: {
            strokeWidth: 0.5,
            strokeOpacity: 1,
            fillOpacity: 0.1
          }
        }}
      />
    </div>
    <iframe
      title="Euclidean sorted tracks"
      className="average-song-playlist"
      src="https://open.spotify.com/embed/user/cjmonkey182/playlist/0ZUYwg5YIFGWNictWr31yk"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
    />
  </Flex>
);
