import * as React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { hot } from "react-hot-loader";

import { Welcome } from "./Welcome";
import { Config, Debug, Setup } from "./pages";
import { ApiClientProvider, ApiClient, apiUrl } from "./ApiClient";
require("./styles/bootstraptheme.css");
require("./styles/main.css");

const App = () => (
  <Router>
    <ApiClientProvider value={new ApiClient(apiUrl)}>
      <div>
        <Route exact path="/" component={Welcome} />
        <Route path="/config" component={Config} />
        <Route path="/debug" component={Debug} />
        <Route path="/setup" component={Setup} />
      </div>
    </ApiClientProvider>
  </Router>
);

export default hot(module)(App);
