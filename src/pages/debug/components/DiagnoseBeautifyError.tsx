import * as React from "react";
import {
  BeautifyError,
  BeautifyErrorType,
  InvalidExecutableVersionError,
} from "../models";

export class DiagnoseBeautifyError extends React.Component<
  DiagnoseBeautifyErrorProps,
  DiagnoseBeautifyErrorState
> {
  public render() {
    return (
      <div className="alert alert-danger" role="alert">
        <p>I found an error!</p>
        <div>{this.renderError()}</div>
      </div>
    );
  }

  get error(): BeautifyError {
    return this.props.error;
  }

  private renderError() {
    const { error } = this;
    switch (error.type) {
      case BeautifyErrorType.InvalidExecutableVersion:
        return this.renderInvalidExecutableVersionError();
      default:
        return <div>Unknown error!!!</div>;
    }
  }

  private renderInvalidExecutableVersionError() {
    const error = this.error as InvalidExecutableVersionError;
    const title = `Executable "${error.executable}" cannot parse version "${
      error.version
    }"`;
    const url = `https://github.com/Glavin001/atom-beautify/issues/new?title=${title}`;
    return (
      <div>
        The version of executable "<strong>{error.executable}</strong>" could
        not be properly parsed from "<strong>{error.version}</strong>
        ". If you think this is a bug please report it by clicking{" "}
        <a href={url} target="_blank" className="alert-link">
          here
        </a>
        .
      </div>
    );
  }
}

export interface DiagnoseBeautifyErrorProps {
  error: BeautifyError;
}

export interface DiagnoseBeautifyErrorState {}
