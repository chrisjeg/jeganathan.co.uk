import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";

const Home = lazy(() => import("./pages/Home"));
const SpotifyAnalysis = lazy(() => import("./pages/SpotifyAnalysis"));

const AppRouter = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact render={()=><Home/>} />
        <Route path="/spotify-analysis/" component={()=><SpotifyAnalysis/>} />
      </Switch>
    </Suspense>
  </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById("root"));
