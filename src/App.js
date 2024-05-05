import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// components
import ProgressBar from "react-topbar-progress-indicator";

import "./App.css";

const Portal = React.lazy(() => import("./layouts/portal/Portal"));
const Site = React.lazy(() => import("./layouts/site/Site"));

ProgressBar.config({
  barThickness: 6,
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={<ProgressBar />}>
          <Switch>
            <Route
              path="/portal"
              name="Portal"
              render={(props) => <Portal {...props} />}
            />
            <Route
              path="/"
              name="Site"
              render={(props) => <Site {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
