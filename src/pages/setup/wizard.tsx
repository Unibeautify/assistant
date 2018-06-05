import * as React from "react";
import { Language, LanguageOptionValues, OptionValues } from "unibeautify";

import { SelectLanguages } from "./select-languages";
import { SelectOptions } from "./select-options";
import { SupportResponse } from "../../ApiClient";
require("highlight.js/lib/highlight.js");
require("highlight.js/styles/default.css");

export class Wizard extends React.Component<WizardProps, WizardState> {
  constructor(props: WizardProps) {
    super(props);
    this.state = {
      languages: [],
      options: {},
      currentStep: 0
    };
  }

  private get steps(): Step[] {
    return [
      {
        name: "Choose languages",
        render: () => {
          return (
            <SelectLanguages
              allLanguages={this.allLanguageNames}
              selectedLanguages={this.selectedLanguageNames}
              toggleLanguage={this.toggleLanguage}
            />
          );
        }
      },
      ...this.selectedLanguageNames.map(name => ({
        name,
        render() {
          return (
            <div>
              <SelectOptions stepName="brace_style" />
            </div>
          );
        }
      })),
      {
        name: "Export configuration",
        render: () => {
          return (
            <div>
              <pre>{JSON.stringify(this.state.options, null, 2)}</pre>
            </div>
          );
        }
      }
    ];
  }

  private get totalSteps(): number {
    return this.steps.length;
  }

  private toggleLanguage = (languageName: string): void => {
    if (this.isLanguageEnabled(languageName)) {
      return this.removeLanguage(languageName);
    }
    this.addLanguage(languageName);
  };

  private removeLanguage(languageName: string): void {
    this.setLanguageOptions(languageName, undefined);
  }

  private addLanguage(languageName: string): void {
    this.setLanguageOptions(languageName, {});
  }

  private setLanguageOptions(
    languageName: string,
    options?: OptionValues
  ): void {
    this.setState(prevState => ({
      ...prevState,
      options: {
        ...prevState.options,
        [languageName]: options
      }
    }));
  }

  private get selectedLanguageNames(): string[] {
    return this.allLanguageNames.filter(this.isLanguageEnabled);
  }

  private isLanguageEnabled = (languageName: string): boolean => {
    return Boolean(this.state.options[languageName]);
  };

  private get allLanguageNames(): string[] {
    return this.props.support.languages.map(({ name }) => name);
  }

  private get step(): Step {
    const { steps } = this;
    return steps[this.currentStep];
  }

  private get currentStep(): number {
    const { steps } = this;
    const { currentStep } = this.state;
    return Math.max(0, Math.min(steps.length - 1, currentStep));
  }

  private next = () => {
    this.setState(prevState => ({
      ...prevState,
      currentStep: Math.min(this.steps.length - 1, prevState.currentStep + 1)
    }));
  };

  private prev = () => {
    this.setState(prevState => ({
      ...prevState,
      currentStep: Math.max(0, prevState.currentStep - 1)
    }));
  };

  private setStep = (currentStep: number) => {
    this.setState(prevState => ({
      ...prevState,
      currentStep
    }));
  };

  public render() {
    const { step, steps, currentStep } = this;
    console.log(this.props.support, step);
    return (
      <div className="row">
        <SideMenu>
          {steps.map((step, index) => (
            <SideMenuItem
              key={index}
              index={index}
              name={step.name}
              selected={index === currentStep}
              setStep={this.setStep}
            />
          ))}
        </SideMenu>
        <div className="col-sm-10">
          <h2>{step.name}</h2>
          <div>
            <StepView index={currentStep} step={step} />
          </div>
          <div className="">
            {this.currentStep > 0 && (
              <button className="btn btn-primary" onClick={this.prev}>
                &lt; Previous
              </button>
            )}
            {this.state.currentStep + 1 < this.totalSteps && (
              <button className="btn btn-primary" onClick={this.next}>
                Next &gt;
              </button>
            )}
            <div>
              Step {this.currentStep + 1} of {this.totalSteps}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SideMenu: React.StatelessComponent<SideMenuProps> = ({
  children
}: SideMenuProps) => {
  return <div className="col-sm-2 sideNav">{children}</div>;
};

export interface SideMenuProps {
  children: JSX.Element | JSX.Element[];
}

const SideMenuItem: React.StatelessComponent<SideMenuItemProps> = ({
  index,
  name,
  selected,
  setStep
}: SideMenuItemProps) => {
  return (
    <a onClick={() => setStep(index)} className={selected ? "selected" : ""}>
      {name}
    </a>
  );
};

export interface SideMenuItemProps {
  index: number;
  name: string;
  selected: boolean;
  setStep(currentStep: number): void;
}

export interface WizardProps {
  support: SupportResponse;
}

export interface WizardState {
  languages: string[];
  options: LanguageOptionValues;
  currentStep: number;
}

export interface Step {
  name: string;
  render(options: LanguageOptionValues): JSX.Element;
}

const StepView: React.StatelessComponent<StepViewProps> = ({
  index,
  step
}: StepViewProps) => {
  return step.render({});
};

export interface StepViewProps {
  index: number;
  step: Step;
}
