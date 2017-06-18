import * as React from "react";
import { DebugReportInput } from "./DebugReportInput";

export class Debug extends React.Component<any, any> {
    render() {
        return (
            <div className="container">
                <div className="jumbotron text-center">
                    <h1 className="display-3">Debugging <span style={{ "whiteSpace": "nowrap" }}>Atom-Beautify</span></h1>
                    <p>Are you experiencing unexpected beautification results? Let's see if we can figure this out together!</p>
                </div>
                <div>
                    <h2>Your Information</h2>
                    <p>Please generate the debugging report within Atom-Beautify and paste it below.</p>
                    <DebugReportInput />
                </div>
            </div>
        );
    }
}