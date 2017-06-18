import * as React from "react";
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import { Welcome } from "./Welcome";
import { Config, Debug, Setup } from "./pages";
require('./styles/lux.css');

export default class App extends React.Component<any, any> {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/config" component={Config} />
                    <Route path="/debug" component={Debug} />
                    <Route path="/setup" component={Setup} />
                </div>
            </Router>
        );
    }
}