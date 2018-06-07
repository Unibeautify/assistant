import * as React from "react";
import Highlight from "react-highlight";
import { Card } from "./card";

export class OptionButton extends React.Component<OptionButtonProps, {}> {
  public render() {
    return (
      <Card
        header={this.header}
        className={`${
          this.props.selected ? "border-success" : "border-primary"
        } mb-3`}
        onClick={this.onClick}
      >
        <Highlight className={this.props.language}>{this.props.code}</Highlight>
      </Card>
    );
  }

  private get header(): string {
    if (this.props.name === undefined) {
      return "I don't care";
    }
    return JSON.stringify(this.props.name);
  }

  private onClick = () => {
    this.props.setValue(this.props.name);
  };
}

export interface OptionButtonProps {
  selected: boolean;
  name?: string;
  language: string;
  code: string;
  setValue(newValue: any): void;
}
