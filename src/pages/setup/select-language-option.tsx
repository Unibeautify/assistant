import * as React from "react";
import { Option, LanguageOptionValues } from "unibeautify";

import { OptionButton } from "./option-button";
import { sample } from "../../UglySamples";

export class SelectLanguageOption extends React.Component<
  SelectLanguageOptionProps,
  {}
> {
  private readonly languageEditURL: string =
    "https://github.com/unibeautify/ugly-samples/edit/master";

  public render() {
    const { code } = this;
    return (
      <div>
        <div>
          <strong>Value:</strong> {JSON.stringify(this.props.value)}
          <a
            href={code ? this.editExampleButtonUrl : this.addExampleButtonUrl}
            target="blank"
            className="btn btn-info float-right"
          >
            {code ? "Edit" : "Add"} {this.props.languageName} Example
          </a>
        </div>
        <br />
        <div className="text-left">
          <OptionButton
            key={"undefined"}
            optionKey={this.props.optionKey}
            name={undefined}
            selected={this.isSelected(undefined)}
            language={this.props.languageName}
            code={code}
            setValue={this.setValue}
            options={this.props.options}
          />
          {this.exampleValues.map(value => (
            <OptionButton
              key={value}
              optionKey={this.props.optionKey}
              name={value}
              selected={this.isSelected(value)}
              language={this.props.languageName}
              code={code}
              setValue={this.setValue}
              options={this.props.options}
              />
          ))}
        </div>
      </div>
    );
  }

  private get editExampleButtonUrl(): string {
    return `${this.languageEditURL}/samples/${this.props.languageName}/${
      this.props.optionKey
    }.txt`;
  }

  private get addExampleButtonUrl(): string {
    return `${this.languageEditURL.replace(
      "/edit/",
      "/new/"
    )}/samples/${encodeURIComponent(this.props.languageName)}/new?filename=${
      this.props.optionKey
    }.txt&value=Type%20Example%20Here`;
  }

  private get code(): string | undefined {
    const { languageName, optionKey } = this.props;
    return sample(languageName, optionKey);
  }

  private setValue = (newValue: any): void => {
    this.props.setValue({
      language: this.props.languageName,
      optionKey: this.props.optionKey,
      value: newValue
    });
  };

  private isSelected(exampleValue: any): boolean {
    const { value } = this.props;
    return (
      exampleValue === value ||
      JSON.stringify(exampleValue) === JSON.stringify(value)
    );
  }

  private get exampleValues(): any[] {
    const { option } = this;
    if (option.enum) {
      return option.enum;
    }
    switch (option.type) {
      case "boolean":
        return [true, false];
      case "integer": {
        const min = option.minimum || 0;
        const max = option.maximum || option.default * 2;
        return [option.default, min, max].sort();
      }
      case "array": {
        return [[], option.default];
      }
      default:
        return [option.default];
    }
  }

  private get option() {
    return this.props.option;
  }
}

export interface SelectLanguageOptionProps {
  optionKey: string;
  option: Option;
  languageName: string;
  value: any;
  options: LanguageOptionValues;
  setValue(options: { value: any; language: string; optionKey: string }): void;
}
