import * as React from "react";
import { OptionButton } from "./option-button";
import { Option } from "unibeautify";

export class SelectOptions extends React.Component<SelectOptionsProps, {}> {
  public render() {
    return (
      <div>
        <div>
          <strong>Type:</strong> {this.type}
        </div>
        <div>
          <strong>Value:</strong> {JSON.stringify(this.props.value)}
        </div>
        <br />
        <div className="text-left">
          <OptionButton
            key={"undefined"}
            name={undefined}
            selected={this.isSelected(undefined)}
            language={this.props.languageName}
            code={`if (true) {\n  return true;\n} else {\n  return false;\n}`}
            setValue={this.setValue}
          />
          {this.exampleValues.map(value => (
            <OptionButton
              key={value}
              name={value}
              selected={this.isSelected(value)}
              language={this.props.languageName}
              code={`if (true) {\n  return true;\n} else {\n  return false;\n}`}
              setValue={this.setValue}
            />
          ))}
        </div>
      </div>
    );
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

  private get type(): string {
    if (this.option.type === "array") {
      if (this.option.items && this.option.items.type) {
        return `${this.option.type} of ${this.option.items.type}s`;
      }
    }
    return this.option.type;
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

export interface SelectOptionsProps {
  optionKey: string;
  option: Option;
  languageName: string;
  value: any;
  setValue(options: { value: any; language: string; optionKey: string }): void;
}
