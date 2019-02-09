import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import SpotifyAnalysisFallback from "./pages/fallback/SpotifyAnalysisFallback";
const SpotifyAnalysis = lazy(() => import("./pages/SpotifyAnalysis"));

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact render={() => <Home />} />
      <Suspense fallback={<SpotifyAnalysisFallback />}>
        <Route
          path="/spotify-analysis/"
          component={() => <SpotifyAnalysis />}
        />
      </Suspense>
    </Switch>
  </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById("root"));
