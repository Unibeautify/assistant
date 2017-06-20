import * as React from "react";
import { DebugReportInput } from "./DebugReportInput";
import { DebugReport } from "./DebugReport";
const { default: TimeAgo } = require('react-timeago') as any;
import { DebugReportSummary } from "./DebugReportSummary";

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
                {report && <DebugReportSummary report={report} />}
            </div>
        );
    }

}

export interface DebugProps {

}

export interface DebugState {
    report: DebugReport;
}