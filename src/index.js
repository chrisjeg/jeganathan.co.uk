import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import SpotifyAnalysis from "./pages/SpotifyAnalysis";

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/spotify-analysis/" component={SpotifyAnalysis} />
    </div>
  </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById("root"));
