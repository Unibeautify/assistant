import * as React from "react";

import { ApiClient, BeautifyResponse } from "../../ApiClient";
import { BeautifyData } from "unibeautify";

export class BeautifyConsumer extends React.Component<
  BeautifyProps,
  BeautifyState
> {
  state: BeautifyState = {
    sentDate: new Date(),
  };

  public componentDidMount() {
    this.beautify(this.props.data);
  }
  public componentWillReceiveProps(nextProps: BeautifyProps) {
    this.beautify(nextProps.data);
  }

  private beautify(data: BeautifyData) {
    const sentDate = new Date();
    this.props.client.beautify(data).then(beautified => {
      if (this.state.sentDate < sentDate) {
        this.setState(prevState => ({
          ...prevState,
          sentDate,
          beautified,
        }));
      }
    });
  }

  public render() {
    const { beautified } = this.state;
    return this.props.children(beautified);
  }
}

export interface BeautifyProps {
  client: ApiClient;
  children(beautified?: BeautifyResponse): JSX.Element | JSX.Element[];
  data: BeautifyData;
}

export interface BeautifyState {
  sentDate: Date;
  beautified?: BeautifyResponse;
}
