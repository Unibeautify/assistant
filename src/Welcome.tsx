import * as React from "react";
import { Link } from "react-router-dom";

export class Welcome extends React.Component<any, any> {
  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h1 className="display-3 jumbotron">Welcome</h1>
          <p>
            Hello, I am your personal beautification assistant. How can I help
            you?
          </p>
          <p>
            <Link to="/debug" className="btn btn-outline-primary btn-lg">
              Debug Atom-Beautify
            </Link>
          </p>
          <p>
            <Link to="/setup" className="btn btn-outline-primary btn-lg">
              Setup Beautifiers
            </Link>
          </p>
          <p>
            <Link to="/config" className="btn btn-outline-primary btn-lg">
              Configuration Beautifiers
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
