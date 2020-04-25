import * as React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import * as CopyToClipboard from "react-copy-to-clipboard";
import Download from "@axetroy/react-download";
import * as jsYaml from "js-yaml";
import { LanguageOptionValues } from "unibeautify";

require("codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/yaml/yaml");

export class ExportConfig extends React.Component<
  ExportConfigProps,
  ExportConfigState
> {
  constructor(props: ExportConfigProps) {
    super(props);
  }
  state = {
    exportLanguage: "json",
  };

  public render() {
    const { options } = this.props;
    const { exportLanguage } = this.state;
    let mode;
    let configText;
    if (exportLanguage === "yaml") {
      mode = "yaml";
      configText = jsYaml.dump(options);
    } else {
      mode = {
        name: "javascript",
        json: true,
      };
      configText = JSON.stringify(options, null, 2);
    }
    return (
      <div className="exportConfig">
        <div>
          See <a href="https://unibeautify.com/docs/config-file" target="_blank">documentation on how to create a Unibeautify configuration file</a> for next steps.
        </div>
        <br />
        <div>
          <Download
            file={`.unibeautifyrc.${exportLanguage}`}
            content={configText}
            >
            <button className="btn btn-info" type="submit">
              Download .unibeautifyrc.{exportLanguage}
            </button>
          </Download>
          <CopyToClipboard text={configText}>
            <button className="btn btn-outline-info" type="submit">
              Copy .unibeautifyrc.{exportLanguage}
            </button>
          </CopyToClipboard>
        </div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link${
                exportLanguage === "json" ? " active show" : ""
              }`}
              onClick={this.handleTabClick}
              data-toggle="tab"
              href="#json"
            >
              JSON
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link${
                exportLanguage === "yaml" ? " active show" : ""
              }`}
              onClick={this.handleTabClick}
              data-toggle="tab"
              href="#yaml"
            >
              YAML
            </a>
          </li>
        </ul>
        <CodeMirror
          value={configText}
          options={{
            readOnly: true,
            lineNumbers: true,
            mode: mode,
          }}
        />
      </div>
    );
  }

  private handleTabClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const tab = event.target;
    if (tab instanceof Element) {
      let language = tab.getAttribute("href");
      language = language ? language.slice(1, language.length) : "";
      this.setState({
        exportLanguage: language,
      });
    }
  };
}

export interface ExportConfigProps {
  options: LanguageOptionValues;
}

export interface ExportConfigState {
  exportLanguage: string;
}
