import * as React from "react";
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import { hot } from "react-hot-loader";
import { Welcome } from "./Welcome";
import { Config, Debug, Setup } from "./pages";
require('./styles/lux.css');

const App = () => (
  <Router>
      <div>
          <Route exact path="/" component={Welcome} />
          <Route path="/config" component={Config} />
          <Route path="/debug" component={Debug} />
          <Route path="/setup" component={Setup} />
      </div>
  </Router>
)

export default hot(module)(App)