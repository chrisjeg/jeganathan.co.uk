import React from "react";
export default ({ id, width = "300", height = "80" }) => (
  <iframe
    title={id}
    src={"https://open.spotify.com/embed/track/" + id}
    width={width}
    height={height}
    frameborder="0"
    allowtransparency="true"
    allow="encrypted-media"
  />
);
