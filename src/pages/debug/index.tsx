import * as React from "react";
import { DebugReportInput } from "./DebugReportInput";
import { DebugReport } from "./DebugReport";
const { default: TimeAgo } = require('react-timeago') as any;

export class Debug extends React.Component<any, DebugState> {

    constructor(props: any) {
        super(props);
        this.state = {
            report: undefined
        };
    }

    public render() {
        const { report } = this.state;
        return (
            <div className="container">
                <div className="jumbotron text-center">
                    <h1 className="display-3">Debugging <span style={{ "whiteSpace": "nowrap" }}>Atom-Beautify</span></h1>
                    <p>Are you experiencing unexpected beautification results? Let's see if we can figure this out together!</p>
                </div>
                <div>
                    <h2>Your Information</h2>
                    <p>Please generate the debugging report within Atom-Beautify and paste it below.</p>
                    <DebugReportInput debugReportChange={(report) => this.setState({ report })} />
                </div>
                {report && (
                    report.isValid ? (
                        <div>
                            <p>Thanks! I see this was generated <TimeAgo date={report.date} />.</p>
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
                            <pre>{JSON.stringify(report, null, 2)}</pre>
                        </div>
                    ) : (
                        <div>This doesn't look right. Please try again.</div>
                    )
                )}
            </div>
        );
    }

}

export interface DebugProps {

}

export interface DebugState {
    report: DebugReport;
}