import * as React from "react";
import { SelectLanguages } from "./select-languages";
import { SelectOptions } from "./select-options";
import { Language } from "unibeautify";
require("highlight.js/lib/highlight.js");
require("highlight.js/styles/default.css");

export class Wizard extends React.Component<any, any> {

  totalSteps: number;

  constructor(props: any) {
    super(props);
    this.state = {
      currentStep: 1,
      preStepName: "Prev",
      nexStepName: "Next",
      stepName: "Languages"
    };
    // Set to number of options based on the languages
    // After the languages have been selected, + 1
    this.totalSteps = 10;
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  next() {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.totalSteps-1) {
      currentStep = this.totalSteps;
    }
    else {
      currentStep = currentStep + 1;
    }

    this.setState({
      currentStep: currentStep
      // Set stepName to the next option

      // Nice to have
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
      currentStep: currentStep,
      // Set stepName to the next option
      
      // Nice to have
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
          <SelectOptions stepName="brace_style" />
        }
        <div className="text-center">
          {this.state.currentStep > 1 &&
            <button className="btn btn-primary" onClick={this.prev}>&lt; {this.state.preStepName}</button>
          }
          {this.state.currentStep !== this.totalSteps &&
            <button className="btn btn-primary" onClick={this.next}>{this.state.nexStepName} &gt;</button>
          }
          <div>Step {this.state.currentStep} of {this.totalSteps}</div>
        </div>
      </div>
    );
  }
}