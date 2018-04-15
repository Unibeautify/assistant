import * as React from "react";
import { OptionButton } from "./option-button";

export class SelectOptions extends React.Component<any, any> {

  // The option buttons are dependent on whatever the option is
  // So keep track of the option in the state
  // and switch the option buttons whenever the optionName changes
  constructor(props: any) {
    super(props);
    this.state = {
      language: "javascript",
      optionName: props.stepName
    };
  }

  render() {
    return (
      <div className="text-left">
        <OptionButton name="Collapse" language={this.state.language} code={`if (true) {\n  return true;\n} else {\n  return false;\n}`} />
        <OptionButton name="End Expand" language={this.state.language} code={`if (true) {\n  return true;\n}\nelse {\n  return false;\n}`} />
        <OptionButton name="Expand" language={this.state.language} code={`if (true)\n{\n  return true;\n}\nelse\n{\n  return false;\n}`} />
      </div>
    );
  }
}