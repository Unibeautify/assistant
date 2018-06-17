import * as React from "react";
import { DiagnoseBeautifyError } from "./";
import { DebugReport } from "../models";
const { default: TimeAgo } = require("react-timeago") as any;

export class DebugReportSummary extends React.Component<any, DebugState> {
  public render() {
    const { report } = this.props;
    if (report.isValid) {
      return (
        <div>
          <p>
            Thanks! I see this was generated <TimeAgo date={report.date} />.
          </p>
          {/*
                    <p>Platform: <span className="badge badge-default">{report.platform}</span>.</p>
                    <p>Atom Version <span className="badge badge-default">{report.atomVersion}</span>.</p>
                    <p>Atom Beautify Version <span className="badge badge-default">{report.atomBeautifyVersion}</span>.</p>
                    <p>Original File Path <span className="badge badge-default">{report.filePath}</span>.</p>
                    <p>Original File Grammar <span className="badge badge-default">{report.grammar}</span>.</p>
                    <p>Original File Language <span className="badge badge-default">{report.language}</span>.</p>
                    <p>Language namespace <span className="badge badge-default">{report.languageNamespace}</span>.</p>
                    <p>Supported Beautifiers <span className="badge badge-default">{report.beautifiers}</span>.</p>
                    <p>Selected Beautifier <span className="badge badge-default">{report.beautifier}</span>.</p>
                    */}
          {/*<pre>{JSON.stringify(report, null, 2)}</pre>*/}
          {/*{Object.keys(report.toJSON()).map(key => (
                        <div key={key}>
                            <details>
                                <summary>{key}</summary>
                                <pre>{JSON.stringify(report.toJSON()[key], null, 2)}</pre>
                            </details>
                        </div>
                    ))}*/}
          {report.hasError ? (
            <DiagnoseBeautifyError error={report.error} />
          ) : (
            <div>Looks good to me!</div>
          )}
        </div>
      );
    } else {
      return <div>This doesn't look right. Please try again.</div>;
    }
  }

  // private renderError(error: BeautifyError) {
  //     switch (error.type) {
  //         case BeautifyErrorType.InvalidExecutableVersion:
  //             return (<div>Invalid version!</div>)
  //         default:
  //             return (<div>Unknown error!!!</div>)
  //     }
  // }
}

export interface DebugProps {
  report: DebugReport;
}

export interface DebugState {}
