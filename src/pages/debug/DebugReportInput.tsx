import * as React from "react";

export class DebugReportInput extends React.Component<any, any> {
    render() {
        return (
            <div>
                <details>
                    <summary>Click here if you do not know how to retrieve the debugging report.</summary>
                    <p>
                        1. Open the <a href="https://atom.io/packages/command-palette" target="_blank">Command Palette</a> using <kbd>cmd-shift-p</kbd> (macOS) or <kbd>ctrl-shift-p</kbd> (Linux/Windows) in Atom.
                        <img className="img-fluid" src="https://i.github-camo.com/66a8b9f48e16131197cca2ca3ffebde9e8679c99/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3637313337382f323234313335342f32393038623736382d396363642d313165332d396461312d6131313735336330343935642e706e67" alt="command palette" />
                    </p>
                    <p>2. Search for command <kbd>Atom Beautify: Help Debug Editor</kbd> and run it.</p>
                    <p>3. Copy resulting debugging information.</p> 
                </details>
                <form>
                    <div className="form-group">
                        <textarea className="form-control" id="debugReport" rows={5} defaultValue={""} placeholder="Paste debug report here." />
                    </div>
                </form>
            </div>
        );
    }
}