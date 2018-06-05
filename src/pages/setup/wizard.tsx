import * as React from "react";
import {
  Language,
  LanguageOptionValues,
  OptionValues,
  OptionsRegistry,
  Option
} from "unibeautify";
import * as _ from "lodash";
import Highlight from "react-highlight";

import { Card } from "./card";
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
    const steps = [this.chooseLanguageStep, ...this.languageSteps];
    if (this.selectedLanguageNames.length > 0) {
      steps.push(this.exportConfigStep);
    }
    return steps;
  }

  private get chooseLanguageStep(): Step {
    return {
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
    };
  }

  private get exportConfigStep(): Step {
    return {
      name: "Export configuration",
      render: () => {
        return (
          <div>
            <Card
              header={"JSON"}
              style={{
                width: "100%",
                minHeight: "400px"
              }}
            >
              <Highlight className={"JSON"}>
                {JSON.stringify(this.state.options, null, 2)}
              </Highlight>
            </Card>
          </div>
        );
      }
    };
  }

  private get languageSteps(): Step[] {
    return this.selectedLanguageNames.reduce(
      (steps, languageName) => {
        return [...steps, ...this.stepsForLanguage(languageName)];
      },
      [] as Step[]
    );
  }

  private stepsForLanguage(languageName: string) {
    const options = this.optionsForLanguage(languageName);
    return Object.keys(options).map(optionKey => {
      const option = options[optionKey];
      const optionName: string = this.optionName(optionKey, option);
      return {
        name: `${languageName}: ${optionName}`,
        render: () => {
          return (
            <div>
              <SelectOptions
                optionKey={optionKey}
                option={option}
                languageName={languageName}
                value={this.valueForLanguageOption(languageName, optionKey)}
                setValue={this.setValue}
              />
            </div>
          );
        }
      };
    });
  }

  private setValue = ({
    value,
    language,
    optionKey
  }: {
    value: any;
    language: string;
    optionKey: string;
  }): void => {
    this.setState(prevState => ({
      ...prevState,
      options: {
        ...prevState.options,
        [language]: {
          ..._.get(prevState.options, language, {}),
          [optionKey]: value
        }
      }
    }));
    this.next();
  };

  private valueForLanguageOption(languageName: string, optionKey: string): any {
    return _.get(this.state.options, [languageName, optionKey]);
  }

  private optionName(optionKey: string, option: Option): string {
    let title: string = option.title || "";
    if (!option.title) {
      title = optionKeyToTitle(optionKey);
    }
    return title;
  }

  private optionsForLanguage(languageName: string): OptionsRegistry {
    const support = this.supportForLanguage(languageName);
    return support ? support.options : {};
  }

  private supportForLanguage(languageName: string) {
    return this.props.support.languages.find(
      lang => lang.name === languageName
    );
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
    const support = this.supportForLanguage(languageName);
    const beautifiers = support ? support.beautifiers : [];
    this.setLanguageOptions(languageName, {
      beautifiers
    } as any);
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

  private goToStart = () => {
    this.setState(prevState => ({
      ...prevState,
      currentStep: 0
    }));
  };

  private goToEnd = () => {
    this.setState(prevState => ({
      ...prevState,
      currentStep: this.steps.length - 1
    }));
  };

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
        <div className="col-sm-9">
          <h2>{step.name}</h2>
          <div>
            <StepView index={currentStep} step={step} />
          </div>
          <div className="">
            {this.currentStep > 0 && (
              <span>
                <button className="btn btn-success" onClick={this.goToStart}>
                  &lt;&lt; Choose Languages
                </button>
                <button className="btn btn-primary" onClick={this.prev}>
                  &lt; Previous
                </button>
              </span>
            )}
            {this.state.currentStep + 1 < this.totalSteps && (
              <span>
                <button className="btn btn-primary" onClick={this.next}>
                  Next &gt;
                </button>
                <button className="btn btn-success" onClick={this.goToEnd}>
                  Export Config &gt;&gt;
                </button>
              </span>
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
  return <div className="list-group">{children}</div>;
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
    <a onClick={() => setStep(index)} className={`list-group-item list-group-item-action${selected ? " active" : ""}`} href="#">
      {index + 1}. {name}
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

function optionKeyToTitle(optionKey: string): string {
  return optionKey
    .split("_")
    .map(_.capitalize)
    .join(" ");
}
