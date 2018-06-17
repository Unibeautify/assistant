import * as React from "react";
import { Option, LanguageOptionValues } from "unibeautify";

import { OptionButton } from "./option-button";
import { InputField } from "./input-field";
import { InputArray } from "./input-array";
import { sample } from "../../UglySamples";

require("highlight.js/lib/highlight.js");
require("highlight.js/styles/default.css");

export class SelectLanguageOption extends React.Component<
  SelectLanguageOptionProps,
  {}
> {
  private readonly languageEditURL: string = "https://github.com/unibeautify/ugly-samples/edit/master";

  public render() {
    const { option } = this;
    if (option.type === "integer") {
      return this.numericInput;
    } else if (option.type === "array") {
      return this.arrayInput;
    } else {
      return this.optionButtons;
    }
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
      value: newValue,
    });
  };

  private isSelected(exampleValue: any): boolean {
    const { value } = this.props;
    return (
      exampleValue === value ||
      JSON.stringify(exampleValue) === JSON.stringify(value)
    );
  }

  private get inputValue(): string | number {
    const { value } = this.props;
    return value;
  }

  private get optionButtons(): any {
    const { code } = this;
    return (
      <div>
        <h2>{this.props.languageName}</h2>
        <div>
          <strong>Value:</strong> {JSON.stringify(this.props.value)}
          {this.editButton()}
        </div>
        <br />
        <div className="text-left">
          {code && (
            <OptionButton
              key={"original"}
              optionKey={this.props.optionKey}
              value={undefined}
              selected={false}
              language={this.props.languageName}
              code={code}
            />
          )}
          <OptionButton
            key={"default"}
            optionKey={this.props.optionKey}
            value={undefined}
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
              value={value}
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

  private editButton() {
    const { code } = this;
    return (
      <a
        href={code ? this.editExampleButtonUrl : this.addExampleButtonUrl}
        target="blank"
        className="btn btn-info float-right"
      >
        {code ? "Edit" : "Add"} {this.props.languageName} Example
      </a>
    );
  }

  private get numericInput(): any {
    const { option, code } = this;
    return (
      <div>
        <h2 className="inline">{this.props.languageName}</h2>
        {this.editButton()}
        <InputField
          option={option}
          optionKey={this.props.optionKey}
          selected={this.isSelected(undefined)}
          language={this.props.languageName}
          code={code}
          setValue={this.setValue}
          value={this.inputValue}
          options={this.props.options}
        />
      </div>
    );
  }

  private get arrayInput(): any {
    const { code, option } = this;
    return (
      <div>
        <h2 className="inline">{this.props.languageName}</h2>
        {this.editButton()}
        <InputArray
          option={option}
          optionKey={this.props.optionKey}
          language={this.props.languageName}
          code={code}
          setValue={this.setValue}
          value={this.props.value}
          options={this.props.options}
        />
      </div>
    );
  }

  private get exampleValues(): any[] {
    const { option } = this;
    if (option.enum) {
      return option.enum;
    }
    if (option.type === "boolean") {
      return [true, false];
    }
    return [option.default];
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
