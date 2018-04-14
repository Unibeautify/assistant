import * as React from "react";
import Highlight from "react-highlight";

export class OptionButton extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return(
      <div className="card border-primary mb-3">
        <h4 className="card-header">{this.props.name}</h4>
        <div className="card-body">
          <div className="card-text">
            <Highlight className={this.props.language}>
              {this.props.code}
            </Highlight>
        </div>
      </div>
    </div>
    );
  }
}