import * as React from "react";

export class Wizard extends React.Component<any, any> {

 constructor(props: any) {
   super(props);
   this.state = {
     currentStep: 1
   };

   this.next = this.next.bind(this);
   this.prev = this.prev.bind(this);
 }

 next() {
   let currentStep = this.state.currentStep;
   if (currentStep >= 9) {
     currentStep = 10; // Set to number of options
   } else {
     currentStep = currentStep + 1;
   }

   this.setState({
     currentStep: currentStep
     // Get next option name to use for button text
   });
 }

 prev() {
   let currentStep = this.state.currentStep;
   if (currentStep <= 1) {
     currentStep = 1;
   } else {
     currentStep = currentStep - 1;
   }

   this.setState({
     currentStep: currentStep
     // Get previous option name to use for button text
   });
 }

 render() {
   return(
     <div>
        <p>{this.state.currentStep}</p>
        <button className="btn btn-primary" onClick={this.prev}>Prev</button> <button className="btn btn-primary" onClick={this.next}>Next</button>
     </div>
   );
 }
}