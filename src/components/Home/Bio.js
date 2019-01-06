import React, { useState } from "react";
import "./Bio.scss";

export default function Bio() {
    const [isLoaded, setLoaded] = useState(false);
    return (
        <div className="bio">
          <div className="full-name drop-transition">
            <div className="first-name">Christopher</div>
            <div className="last-name">
              <div className="raised">Jeganathan</div>
              <div className="text-highlight" />
            </div>
            <div>
              Enjoys:
              <br />
              - developing fullstack
              <br />
              - fiddling with APIs
              <br />- abusing emojis in commit messages{" "}
              <span role="img" aria-label="lit">
                🔥🔥🔥💯
              </span>
              <br />
            </div>
          </div>
  
          <div className="picture-row">
            <div className="bio-picture">
              <img
                className={isLoaded ? "loaded" : ""}
                src="https://github.com/chrisjeg.png?size=400"
                onLoad={() => setLoaded(true)}
                alt="profile"
              />
              <div className="bio-description">
                <span className="role">Lead Developer</span>
                <br />
                <span className="location">at Nomura</span>
              </div>
            </div>
          </div>
        </div>
      );
}
