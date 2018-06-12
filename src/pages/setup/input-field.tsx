import * as React from "react";
import Highlight from "react-highlight";

import { OptionButton } from "./option-button";
import { BeautifiedCode } from "./beautifed-code";

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
            className="form-control"
            key={this.props.optionKey}
            type="number"
            min={option.minimum || 0}
            max={option.maximum || option.default * 2}
            defaultValue={value || option.default}
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

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    this.props.setValue && this.props.setValue(newValue);
  };
}
