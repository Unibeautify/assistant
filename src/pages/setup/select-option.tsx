import * as React from "react";
import { Option, LanguageOptionValues } from "unibeautify";

import { SelectLanguageOption } from "./select-language-option";
import _ = require("lodash");

export class SelectOption extends React.Component<SelectOptionProps, {}> {
  public render() {
    const { option, optionKey, setValue, languageNames } = this.props;
    return (
      <div>
        <div>
          <strong>Description:</strong> {this.description}
        </div>
        <div>
          <strong>Type:</strong> {this.type}
        </div>
        <br />
        {languageNames.sort().map(languageName => (
          <div key={languageName} className="languageOptionGroup">            
            <SelectLanguageOption
              optionKey={optionKey}
              option={option}
              languageName={languageName}
              value={this.valueForLanguageOption(languageName, optionKey)}
              setValue={setValue}
              options={this.props.options}
            />
          </div>
        ))}
      </div>
    );
  }

  private get type(): string {
    if (this.option.type === "array") {
      if (this.option.items && this.option.items.type) {
        return `${this.option.type} of ${this.option.items.type}s`;
      }
    }
    return this.option.type;
  }

  private get description(): string {
    return this.option.description;
  }

  private get option() {
    return this.props.option;
  }

  private valueForLanguageOption(languageName: string, optionKey: string): any {
    return _.get(this.props.options, [languageName, optionKey]);
  }
}

export interface SelectOptionProps {
  optionKey: string;
  option: Option;
  languageNames: string[];
  options: LanguageOptionValues;
  setValue(options: { value: any; language: string; optionKey: string }): void;
}
