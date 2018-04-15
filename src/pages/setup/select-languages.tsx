import * as React from "react";
import { Language } from "unibeautify";

export class SelectLanguages extends React.Component<any, any> {

  // Lists all of the languages as checkboxes for the user to select
  // Try to keep already selected options in place if user adds/removes languages
  private get languageNames(): string[] {
    // return this.supportedLanguages.map(lang => lang.name);
    return ["Javascript", "CSS"];
  }

  private renderLanguageSelect() {
    const { languageNames } = this;
    return (
      <fieldset className="form-group">
        {languageNames.map(lang => (
          <div className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                name={lang}
              />
              {lang}
            </label>
          </div>
        ))}
    </fieldset>
    );
  }

  render() {
    return (
      <div>
        {this.renderLanguageSelect()}
      </div>
    );
  }
}