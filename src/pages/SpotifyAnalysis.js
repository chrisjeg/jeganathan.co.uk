import React, { useReducer } from "react";
import reducer, { initialState } from "../reducers/SpotifyAnalysis";
import {
  toggleDomain,
  decrementWindowSize,
  incrementWindowSize
} from "../actions/SpotifyAnalysis";
import "./SpotifyAnalysis.scss";
import { Flex } from "../components/Layout";
import Banner from "../components/Banner";

import FeatureBreakdown from "../components/SpotifyAnalysis/FeatureBreakdownPlot";
import FeatureDetailPlot from "../components/SpotifyAnalysis/FeatureDetailPlot";
import CompleteTrackScatter from "../components/SpotifyAnalysis/CompleteTrackScatter";

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
        description={`Finally, this section is showing the individual points that make up the playlists, currently broken down by ${state.selectedFeature}. Highlight one to see the track details above!`}
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

const Header = ({
  isDomainFixed,
  windowSize,
  onIncrement,
  onDecrement,
  onToggleDomain
}) => (
  <Banner
    header="9 Years of Monthly Playlists"
    emoji="🎉"
    isToggledOnVisible={false}
    fullscreen
    description={`I've been using Spotify for over 9 years now, and also been meticulously creating a playlist per month since January 2010. I figured it might be fun to see what I can pull out about my listening history using Spotify's "Audio Feature" API. \n\nYou can mess with these graphs using the buttons above - fixing the graph domain shows the full domain size of the API output and adjusting the window size lets you apply a moving average to the dataset`}
  >
    <Flex className="main-controls">
      <button onClick={onToggleDomain}>
        Use {isDomainFixed ? "Dynamic" : "Fixed"} Graph Domain
      </button>
      <Flex className="button-controls">
        Window Size: <button className="button-control" onClick={onDecrement}>
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
