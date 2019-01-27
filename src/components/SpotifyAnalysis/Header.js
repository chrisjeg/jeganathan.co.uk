import React from "react";
import Banner from "../components/Banner";
import { Flex } from "../components/Layout";

export default ({
    isDomainFixed,
    windowSize,
    onIncrement,
    onDecrement,
    onToggleDomain
  }) => (
    <Banner header="9 Years of Monthly Playlists" isToggledOnVisible={false} fullscreen>
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