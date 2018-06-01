import * as React from "react";
import { Wizard } from "./wizard";

export class Setup extends React.Component<any, any> {
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3 text-center">Setup</h1>
                    <Wizard />
                </div>
            </div>
        );
    }
}