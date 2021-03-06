import * as React from "react";
import Highlight from "react-highlight";
import { Card } from "./card";
import { LanguageOptionValues, Option } from "unibeautify";
import { BeautifiedCode } from "./beautifed-code";

export class OptionButton extends React.Component<OptionButtonProps, {}> {
  public render() {
    const { code } = this.props;
    return (
      <Card
        header={this.header}
        className={`${
          this.props.selected ? "border-success" : "border-primary"
        } mb-3`}
        onClick={this.onClick}
      >
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
        ) : undefined}
      </Card>
    );
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

  private get header(): string {
    if (this.props.value === undefined) {
      return this.props.options ? "Default" : "Original";
    }
    return JSON.stringify(this.props.value);
  }

  private onClick = () => {
    this.props.setValue && this.props.setValue(this.props.value);
  };
}

export interface OptionButtonProps {
  selected: boolean;
  optionKey: string;
  value?: string | number;
  language: string;
  code?: string;
  options?: LanguageOptionValues;
  setValue?(newValue: any): void;
  option?: Option;
}
