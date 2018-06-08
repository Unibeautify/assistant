import * as React from "react";
import Highlight from "react-highlight";
import { Card } from "./card";
import { LanguageOptionValues } from "unibeautify";
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

  private get options(): LanguageOptionValues {
    const { options = {}, language, name, optionKey } = this.props;
    return {
      ...options,
      [language]: {
        ...(options[language] || {}),
        [optionKey]: name
      }
    };
  }

  private get header(): string {
    if (this.props.name === undefined) {
      return this.props.options ? "Default" : "Original";
    }
    return JSON.stringify(this.props.name);
  }

  private onClick = () => {
    this.props.setValue && this.props.setValue(this.props.name);
  };
}

export interface OptionButtonProps {
  selected: boolean;
  optionKey: string;
  name?: string;
  language: string;
  code?: string;
  options?: LanguageOptionValues;
  setValue?(newValue: any): void;
}
