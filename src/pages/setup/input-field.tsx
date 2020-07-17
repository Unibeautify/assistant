import * as React from "react";
import Highlight from "react-highlight";

import { OptionButton } from "./option-button";
import { BeautifiedCode } from "./beautifed-code";
import { Card } from "./card";

export class InputField extends OptionButton {
  public render() {
    const { option, code, value } = this.props;
    if (option === undefined) {
      return <div />;
    }
    return (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Value
            </span>
          </div>
          <input
            type="number"
            className="form-control"
            placeholder={
              code ? "Enter number to preview below" : "Enter number"
            }
            key={this.props.optionKey}
            min={option.minimum || 0}
            max={option.maximum || option.default * 2}
            value={value}
            onChange={this.handleChange}
          />
        </div>
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
                    <Card className="previewCard card-fluid" header="Preview">
                      <Highlight className={this.props.language}>
                        {beautifiedText}
                      </Highlight>
                    </Card>
                  </div>
                )}
              </BeautifiedCode>
            </div>
          ) : (
            <Highlight className={this.props.language}>{code}</Highlight>
          )
        ) : undefined}
      </div>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const valid = isNaN(Number(target.value)) ? false : target.checkValidity();
    if (valid) {
      const newValue = Number(target.value);
      this.props.setValue && this.props.setValue(newValue);
    }
  };
}
