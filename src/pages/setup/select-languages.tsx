import * as React from "react";
import { Language } from "unibeautify";

export class SelectLanguages extends React.Component<SelectLanguagesProps, {}> {
  public render() {
    return (
      <div>
        <fieldset className="form-group">
          {this.props.allLanguages.map(lang => (
            <div key={lang} className="form-check">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={lang}
                  checked={this.isLanguageEnabled(lang)}
                  onChange={this.handleCheckboxChange}
                />
                {lang}
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    );
  }

  private isLanguageEnabled(languageName: string): boolean {
    return this.props.selectedLanguages.indexOf(languageName) !== -1;
  }

  private handleCheckboxChange = (event: any) => {
    const target = event.target;
    const languageName = target.name;
    this.props.toggleLanguage(languageName);
  };
}

export interface SelectLanguagesProps {
  selectedLanguages: string[];
  allLanguages: string[];
  toggleLanguage(languageName: string): void;
}
