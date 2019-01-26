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
        description="some description"
        isToggledOnVisible={false}
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
        description="some description"
        isToggledOnVisible={false}
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
        isToggledOnVisible={false}
      >
        <CompleteTrackScatter isDomainFixed={state.isDomainFixed} selectedFeature={state.selectedFeature}/>
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
