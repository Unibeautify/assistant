import * as React from "react";
import Highlight from "react-highlight";

import { BeautifiedCode } from "./beautifed-code";
import { LanguageOptionValues } from "unibeautify";

export class MultiSelect extends React.Component<MultiSelectProps, {}> {
  public render() {
    const { code } = this.props;
    this.props.allValues.sort();
    return (
      <div>
        {this.props.allValues.map((value) => (
          <div>
            <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={value}
              onChange={this.handleChangeField}
            />
            <div className="input-group-append">
              <button type="button" className="btn btn-danger" onClick={this.handleRemoveField}>Remove</button>
            </div>
          </div>
        </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={this.handleAddField}>Add</button>
        {code ? (
          this.props.options ? (
            <div>
              <BeautifiedCode
                data={{
                  languageName: this.props.language,
                  text: code,
                  options: this.options,
                }}
              >
                {beautifiedText => (
                  <div>
                    <Highlight className={this.props.language}>
                      {beautifiedText}
                    </Highlight>
                  </div>
                )}
              </BeautifiedCode>
            </div>
          ) : (
            <Highlight className={this.props.language}>{code}</Highlight>
          )
        ) : (
          undefined
        )}
      </div>
    );
  }

  private handleChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
  };

  private handleAddField = () => {

  }

  private handleRemoveField = () => {

  }

  protected get options(): LanguageOptionValues {
    const { options = {}, language, value, optionKey } = this.props;
    return {
      ...options,
      [language]: {
        ...(options[language] || {}),
        [optionKey]: value,
      },
    };
  }
}

export interface MultiSelectProps {
  allValues: string[];
  optionKey: string;
  value?: string | number;
  language: string;
  code?: string;
  options?: LanguageOptionValues;
  setValue?(newValue: any): void;
}
