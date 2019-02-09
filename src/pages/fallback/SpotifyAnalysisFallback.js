import React from "react";
import Banner from "../../components/Banner";
export default () => (
  <Banner
    header="9 Years of Monthly Playlists"
    emoji="🎉"
    isToggledOnVisible={false}
    fullscreen
    description={`I've been using Spotify for over 9 years now, and also been meticulously creating a playlist per month since January 2010. I figured it might be fun to see what I can pull out about my listening history using Spotify's "Audio Feature" API. \n\nYou can mess with these graphs using the buttons above - fixing the graph domain shows the full domain size of the API output and adjusting the window size lets you apply a moving average to the dataset`}
  >
    <div style={{ height: "38px", margin:"7px 0", textAlign:"center" }}> Loading... </div>
  </Banner>
);
