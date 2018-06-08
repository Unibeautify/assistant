import * as React from "react";

import { ApiClient, SupportResponse } from "../../ApiClient";

export class SupportConsumer extends React.Component<SupportProps, SupportState> {
  constructor(props: SupportProps) {
    super(props);
    this.state = {};
  }

  public componentWillMount() {
    this.props.client.support().then(support => {
      this.setState((prevState = {}) => ({
        ...prevState,
        support
      }));
    });
  }

  public render() {
    const { support } = this.state;
    return this.props.children(support);
  }
}

export interface SupportProps {
  client: ApiClient;
  children(support?: SupportResponse): JSX.Element | JSX.Element[];
}

export interface SupportState {
  support?: SupportResponse;
}
