import * as React from "react";
import { SelectLanguages } from "./select-languages";
import { SelectOptions } from "./select-options";
require("highlight.js/lib/highlight.js");
require("highlight.js/styles/default.css");

export class Wizard extends React.Component<any, any> {

  totalSteps: number;

  constructor(props: any) {
    super(props);
    this.state = {
      currentStep: 1,
      preStepName: "Languages",
      nexStepName: "Braces",
      stepName: "languages"
    };
    this.totalSteps = 10;
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  next() {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.totalSteps-1) {
      currentStep = this.totalSteps; // Set to number of options
    }
    else {
      currentStep = currentStep + 1;
    }

    this.setState({
      currentStep: currentStep
      //preStepName: Get previous option name to use for button text
      //nexStepName: Get next option name to use for button text
    });
  }

  prev() {
    let currentStep = this.state.currentStep;
    if (currentStep <= 1) {
      currentStep = 1;
    }
    else {
      currentStep = currentStep - 1;
    }

    this.setState({
      currentStep: currentStep
      //preStepName: Get previous option name to use for button text
      //nexStepName: Get next option name to use for button text
    });
  }

  render() {
    return(
      <div>
        <h2>{this.state.stepName}</h2>
        {this.state.currentStep === 1 &&
          <SelectLanguages />
        }
        {this.state.currentStep > 1 &&
          <SelectOptions />
        }
        <div className="text-center">
          {this.state.currentStep > 1 &&
            <button className="btn btn-primary" onClick={this.prev}>&lt; {this.state.preStepName}</button>
          }
          {this.state.currentStep !== this.totalSteps &&
            <button className="btn btn-primary" onClick={this.next}>{this.state.nexStepName} &gt;</button>
          }
          <div>Option {this.state.currentStep} of {this.totalSteps}</div>
        </div>
      </div>
    );
  }
}