import * as React from "react";

import ApiClient, { SupportResponse } from "../../ApiClient";
import { Wizard } from "./wizard";

const apiUrl: string =
  "https://ntd6xp2n56.execute-api.us-east-1.amazonaws.com/dev/playground";

export class Setup extends React.Component<SetupProps, SetupState> {
  private readonly client: ApiClient;

  constructor(props: SetupProps) {
    super(props);
    this.client = new ApiClient(apiUrl);
    this.state = {};
  }

  public componentWillMount() {
    this.client.support().then(support => {
      this.setState((prevState = {}) => ({
        ...prevState,
        support
      }));
    });
  }

  public render() {
    const { support } = this.state;

    return (
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-3 text-center">Setup</h1>
          {support ? <Wizard support={support} /> : <div>Loading...</div>}
        </div>
      </div>
    );
  }
}

export interface SetupProps {}

export interface SetupState {
  support?: SupportResponse;
}
