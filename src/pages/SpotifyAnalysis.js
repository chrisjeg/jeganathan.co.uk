import React, { useReducer } from "react";
import reducer, { initialState } from "../reducers/SpotifyAnalysis";
import {
  toggleDomain,
  decrementWindowSize,
  incrementWindowSize
} from "../actions/SpotifyAnalysis";
import "./SpotifyAnalysis.scss";
import Banner from "../components/Banner";

import FeatureBreakdown from "../components/SpotifyAnalysis/FeatureBreakdownPlot";
import FeatureDetailPlot from "../components/SpotifyAnalysis/FeatureDetailPlot";
import CompleteTrackScatter from "../components/SpotifyAnalysis/CompleteTrackScatter";
import MyAverageSong from "../components/SpotifyAnalysis/MyAverageSong";
import Header from "../components/SpotifyAnalysis/Header";

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
        color="yellow"
        header='My "Average" Song'
        description='To start with, I got the mean all of the features in my collection to get what my "average" track would look like (shown on the left). Using this data, I managed to sort all of my tracks by Euclidean distance (ascending), avaliable as a playlist on the right!'
        isToggledOnVisible={false}
        fullscreen
      >
        <MyAverageSong />
      </Banner>
      <Banner
        color="green"
        header="Feature Breakdown"
        description="Above, each of the playlists is broken down into its features, made from the averages of the tracks that the playlist contains, selecting a feature will provide detail below"
        isToggledOnVisible={false}
        fullscreen
      >
        <FeatureBreakdown
          dispatch={dispatch}
          isDomainFixed={state.isDomainFixed}
          hoveredFeature={state.hoveredFeature}
          windowSize={state.windowSize}
        />
      </Banner>
      <Banner
        color="blue"
        header={featureSectionHeader}
        description="By default, this graph will show the average created from each of the months and the area graph represents a standard deviation of ± 0.5, selecting a year will show the standard deviation for the months of that year"
        isToggledOnVisible={false}
        fullscreen
      >
        <FeatureDetailPlot
          dispatch={dispatch}
          isDomainFixed={state.isDomainFixed}
          hoveredYear={state.hoveredYear}
          selectedFeature={state.selectedFeature}
        />
      </Banner>
      <Banner
        color="yellow"
        header="All the tracks!"
        emoji="🔥"
        description={`Finally, this section is showing the individual points that make up the playlists, currently broken down by ${
          state.selectedFeature
        }. Highlight one to see the track details above!`}
        isToggledOnVisible={false}
        fullscreen
      >
        <CompleteTrackScatter
          isDomainFixed={state.isDomainFixed}
          selectedFeature={state.selectedFeature}
        />
      </Banner>
    </div>
  );
}

export default SpotifyAnalysisPage;
