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
        <select
          multiple={true}
          className="form-control multiple"
          onChange={this.handleChange}
        >
          {this.props.allValues.map(value => (
            <option value={value}>{value}</option>
          ))}
        </select>
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

  private handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;
    const selectedValues = [].map.call(
      target.selectedOptions,
      (selection: HTMLOptionElement) => selection.label
    );
    this.props.setValue && this.props.setValue(selectedValues);
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

export interface MultiSelectProps {
  allValues: string[];
  optionKey: string;
  value?: string | number;
  language: string;
  code?: string;
  options?: LanguageOptionValues;
  setValue?(newValue: any): void;
}
