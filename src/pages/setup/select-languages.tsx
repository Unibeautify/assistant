import * as React from "react";

export class SelectLanguages extends React.Component<any, any> {

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