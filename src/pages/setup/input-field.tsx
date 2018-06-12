import * as React from "react";
import { OptionButton, OptionButtonProps } from "./option-button";
import { ApiClientConsumer } from "../../ApiClient";
import { BeautifyConsumer } from "./beautify-consumer";
import Highlight from "react-highlight";
import { Option } from "unibeautify";

export class InputField extends OptionButton {
  public render() {
    const { option, code } = this.props;
    if (option === undefined) {
      return <div></div>
    }
    return (
      <div>
        <label className="col-form-label">{option.description}</label>
        <input
          className="form-control"
          key={this.props.optionKey}
          type="number"
          min={option.minimum || 0}
          max={option.maximum || option.default * 2}
          defaultValue={option.default}
          onChange={this.handleChange.bind(this)}
        />
        {code ? (
        <ApiClientConsumer>
          {client => (
            <BeautifyConsumer
              client={client}
              data={{
                languageName: this.props.language,
                text: code,
                options: {}
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
      ) : (
        undefined
      )}
    </div>
    );
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseInt(event.target.value);
    this.props.setValue && this.props.setValue(newValue);
  }
}

export interface InputFieldProps extends OptionButtonProps {
  option: Option;
}
