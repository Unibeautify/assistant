import * as React from "react";

import { ApiClient, BeautifyResponse } from "../../ApiClient";
import { BeautifyData } from "unibeautify";

export class BeautifyConsumer extends React.Component<
  BeautifyProps,
  BeautifyState
> {
  constructor(props: BeautifyProps) {
    super(props);
    this.state = {};
  }

  public componentWillMount() {
    this.beautify(this.props.data);
  }
  public componentWillReceiveProps(nextProps: BeautifyProps) {
    this.beautify(nextProps.data);
  }

  private beautify(data: BeautifyData) {
    this.props.client.beautify(data).then(beautified => {
      this.setState((prevState = {}) => ({
        ...prevState,
        beautified
      }));
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
  beautified?: BeautifyResponse;
}
