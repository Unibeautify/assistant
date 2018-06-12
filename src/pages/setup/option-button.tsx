import * as React from "react";
import Highlight from "react-highlight";
import { Card } from "./card";
import { LanguageOptionValues, Option } from "unibeautify";
import { ApiClientConsumer } from "../../ApiClient";
import { BeautifyConsumer } from "./beautify-consumer";

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
              <ApiClientConsumer>
                {client => (
                  <BeautifyConsumer
                    client={client}
                    data={{
                      languageName: this.props.language,
                      text: code,
                      options: this.options
                    }}
                  >
                    {beautified => (
                      <div>
                        <Highlight className={this.props.language}>
                          {beautified && beautified.beautifiedText}
                        </Highlight>
                      </div>
                    )}
                  </BeautifyConsumer>
                )}
              </ApiClientConsumer>
            </div>
          ) : (
            <Highlight className={this.props.language}>{code}</Highlight>
          )
        ) : (
          undefined
        )}
      </Card>
    );
  }

  protected get options(): LanguageOptionValues {
    const { options = {}, language, value, optionKey } = this.props;
    return {
      ...options,
      [language]: {
        ...(options[language] || {}),
        [optionKey]: value
      }
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
