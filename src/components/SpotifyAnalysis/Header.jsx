import React from "react";
import { Tooltip } from "react-tippy";

import Banner from "../Banner";
import { Flex } from "../Layout";

import "react-tippy/dist/tippy.css";
import GitHubLogo from "../../resources/github-logo.png";
import MediumLogo from "../../resources/medium-logo.png";

export default ({
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
    <Flex spaceAround>
      <Tooltip title="View the source on GitHub" position="bottom">
        <a href="https://github.com/chrisjeg/jeganathan.co.uk/tree/master/src/components/SpotifyAnalysis">
          <img alt="github-link" src={GitHubLogo} height="64px" />
        </a>
      </Tooltip>
      <Tooltip title="Read the related article on Medium" position="bottom">
      <a href="https://medium.com/@chris.jeganathan/exploring-9-years-of-monthly-playlists-ea1cb08b831f">
        <img alt="medium-link" src={MediumLogo} height="64px" />
      </a>
      </Tooltip>
    </Flex>
    <Flex className="main-controls">
      <button onClick={onToggleDomain}>
        Use {isDomainFixed ? "Dynamic" : "Fixed"} Graph Domain
      </button>
      <Flex className="button-controls">
        Window Size:{" "}
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
