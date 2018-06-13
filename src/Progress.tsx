import * as React from "react";

export const Progress: React.StatelessComponent<ProgressProps> = ({
  percentage
}: ProgressProps) => {
  const roundedPercentage = parseInt(percentage as any);
  const backgroundColour = backgroundColourForPercentage(roundedPercentage);
  return (
    <div className="progress">
      <div
        className={`progress-bar progress-bar-striped progress-bar-animated bg-${backgroundColour}`}
        role="progressbar"
        style={{ width: `${roundedPercentage}%` }}
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {roundedPercentage}%
      </div>
    </div>
  );
};

const backgroundColours = ["danger", "warning", "info", "success"];
function backgroundColourForPercentage(percentage: number): string {
  const piece = 100 / backgroundColours.length;
  const index = Math.max(0, Math.floor(percentage / piece) - 1);
  return backgroundColours[index];
}

export interface ProgressProps {
  percentage: number;
}
