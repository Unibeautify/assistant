import * as React from "react";
import {
  LanguageOptionValues,
  OptionValues,
  OptionsRegistry,
  Option,
} from "unibeautify";
import * as _ from "lodash";

import { SelectLanguages } from "./select-languages";
import { SelectOption } from "./select-option";
import { ExportConfig } from "./export-config";
import { SupportResponse, LanguageWithOptions } from "../../ApiClient";
import { Progress } from "../../Progress";

export class Wizard extends React.Component<WizardProps, WizardState> {
  constructor(props: WizardProps) {
    super(props);
    this.state = {
      languages: [],
      options: {},
      currentStep: 0,
    };
  }

  private get steps(): Step[] {
    const steps = [this.chooseLanguageStep, ...this.optionSteps];
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
      },
    };
  }

  private get exportConfigStep(): Step {
    return {
      name: "Export configuration",
      render: () => {
        return <ExportConfig options={this.state.options} />;
      },
    };
  }

  private get optionSteps(): Step[] {
    return (
      _.chain(this.selectedLanguageOptions)
        .toPairs()
        .map(([optionKey, option]) => ({
          optionKey,
          option,
          languages: this.languagesForOptionKey(optionKey),
        }))
        .orderBy(["languages.length", "optionKey"], ["desc", "asc"])
        // .reverse()
        .reduce(
          (steps, item) => {
            return [...steps, this.stepForOption(item)];
          },
          [] as Step[]
        )
        .value()
    );
  }

  private get selectedLanguageOptions(): OptionsRegistry {
    return this.selectedLanguages.reduce(
      (options, lang) => ({
        ...options,
        ...lang.options,
      }),
      {}
    );
  }

  private stepForOption({
    optionKey,
    option,
    languages,
  }: {
    optionKey: string;
    option: Option;
    languages: LanguageWithOptions[];
  }) {
    const optionName: string = this.optionName(optionKey, option);
    const languageNames: string[] = languages.map(({ name }) => name);
    return {
      name: `${optionName} (${languages.length} language${languages.length > 1 ? "s" : ""})`,
      sidemenuName: `${optionName}`,
      render: () => {
        return (
          <div>
            <SelectOption
              optionKey={optionKey}
              option={option}
              languageNames={languageNames}
              options={this.state.options}
              setValue={this.setValue}
            />
          </div>
        );
      },
    };
  }

  private languagesForOptionKey(optionKey: string) {
    return this.selectedLanguages.filter(
      lang => this.optionsForLanguage(lang.name)[optionKey]
    );
  }

  private setValue = ({
    value,
    language,
    optionKey,
  }: {
    value: any;
    language: string;
    optionKey: string;
  }): void => {
    console.log("setValue", this.state, value, language, optionKey);
    this.setState(
      prevState => ({
        ...prevState,
        options: {
          ...prevState.options,
          [language]: {
            ..._.get(prevState.options, language, {}),
            [optionKey]: value,
          },
        },
      }),
      () => {
        console.log("finalState", this.state, value, language, optionKey);
      }
    );
  };

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
      beautifiers,
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
        [languageName]: options as OptionValues,
      },
    }));
  }

  private get selectedLanguageNames(): string[] {
    return this.allLanguageNames.filter(this.isLanguageEnabled);
  }

  private get selectedLanguages() {
    return this.allLanguages.filter(({ name }) => this.isLanguageEnabled(name));
  }

  private isLanguageEnabled = (languageName: string): boolean => {
    return Boolean(this.state.options[languageName]);
  };

  private get allLanguageNames(): string[] {
    return this.allLanguages.map(({ name }) => name);
  }

  private get allLanguages() {
    return this.props.support.languages;
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
      currentStep: 0,
    }));
  };

  private goToEnd = () => {
    this.setState(prevState => ({
      ...prevState,
      currentStep: this.steps.length - 1,
    }));
  };

  private next = () => {
    this.setState(prevState => ({
      ...prevState,
      currentStep: Math.min(this.steps.length - 1, prevState.currentStep + 1),
    }));
  };

  private prev = () => {
    this.setState(prevState => ({
      ...prevState,
      currentStep: Math.max(0, prevState.currentStep - 1),
    }));
  };

  private setStep = (
    currentStep: number,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      currentStep,
    }));
  };

  private get percentage(): number {
    if (this.totalSteps === 1) {
      return 1;
    }
    return Math.max(0, (this.currentStep + 1) / this.totalSteps * 100);
  }

  public render() {
    const { step, steps, currentStep } = this;
    console.log(this.props.support, step);    
    return (
      <div>        
        <div className="row">
          <SideMenu>
            {steps.map((step, index) => (
              <SideMenuItem
                key={index}
                index={index}
                name={step.sidemenuName || step.name}
                selected={index === currentStep}
                setStep={this.setStep}
              />
            ))}
          </SideMenu>
          <div className="col-sm-9">
            <h2>{step.name}</h2>
            <div className="option-content">
              <StepView index={currentStep} step={step} />
            </div>
            <div className="footer">
              <div className="step-buttons">
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
              </div>
              <Progress percentage={this.percentage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SideMenu: React.StatelessComponent<SideMenuProps> = ({
  children,
}: SideMenuProps) => {
  return <div className="side-menu list-group">{children}</div>;
};

export interface SideMenuProps {
  children: JSX.Element | JSX.Element[];
}

const SideMenuItem: React.StatelessComponent<SideMenuItemProps> = ({
  index,
  name,
  selected,
  setStep,
}: SideMenuItemProps) => {
  return (
    <a
      onClick={e => setStep(index, e)}
      className={`list-group-item list-group-item-action${
        selected ? " active" : ""
      }`}
      href="#"
    >
      {index + 1}. {name}
    </a>
  );
};

export interface SideMenuItemProps {
  index: number;
  name: string;
  selected: boolean;
  setStep(currentStep: number, e: React.MouseEvent<HTMLAnchorElement>): void;
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
  sidemenuName?: string;
  render(options: LanguageOptionValues): JSX.Element;
}

const StepView: React.StatelessComponent<StepViewProps> = ({
  index,
  step,
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
