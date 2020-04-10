import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import Leaderboard from "./pages/OSRLeaderboard.js";
import LeaderboardLanding from "./pages/LeaderboardLanding.js";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/open-source-rover-challenge" render={props => <Leaderboard {...props} />} />
      <Route path="/" render={props => <LeaderboardLanding {...props} />} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
