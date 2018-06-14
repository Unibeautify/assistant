import * as React from "react";
import Highlight from "react-highlight";

import { BeautifiedCode } from "./beautifed-code";
import { LanguageOptionValues, Option } from "unibeautify";

export class InputArray extends React.Component<InputArrayProps, {}> {
  public render() {
    const { code } = this.props;
    return (
      <div>
        {this.props.value
          ? this.props.value.map((value, index) => (
              <div key={index}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={value}
                    onChange={this.handleChangeField(index)}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={this.handleRemoveField(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          : undefined}
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleAddField}
        >
          Add
        </button>
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

  private handleChangeField = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    console.log("handleChangeField", index, value);
    const prevValue = this.props.value || [];
    const newValue = prevValue.slice();
    newValue[index] = value;
    this.props.setValue && this.props.setValue(newValue);
  };

  private handleAddField = () => {
    console.log(this.props.value);
    const prevValue = this.props.value || [];
    this.props.setValue && this.props.setValue(prevValue.concat(""));
  };

  private handleRemoveField = (index: number) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log("handleRemoveField", index);
    const prevValue = this.props.value || [];
    const newValue = prevValue.slice();
    newValue.splice(index, 1);
    this.props.setValue && this.props.setValue(newValue);
  };

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

export interface InputArrayProps {
  optionKey: string;
  value?: string[];
  language: string;
  code?: string;
  options?: LanguageOptionValues;
  setValue?(newValue: any): void;
  option?: Option;
}
