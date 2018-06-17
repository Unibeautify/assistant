import * as React from "react";

import { ApiClientConsumer } from "../../ApiClient";
import { Wizard } from "./wizard";
import { SupportConsumer } from "./support-consumer";

export class Setup extends React.Component<SetupProps, SetupState> {
  public render() {
    return (
      <div className="container-fluid">
        <div>
          <h1 className="display-3 jumbotron text-center">Setup</h1>
          <ApiClientConsumer>
            {client => (
              <SupportConsumer client={client}>
                {support =>
                  support ? <Wizard support={support} /> : <div>Loading...</div>
                }
              </SupportConsumer>
            )}
          </ApiClientConsumer>
        </div>
      </div>
    );
  }
}

export interface SetupProps {}

export interface SetupState {}
