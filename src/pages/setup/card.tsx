import * as React from "react";

export const Card: React.StatelessComponent<CardProps> = ({
  header,
  children,
  onClick,
  style,
  className = ""
}: CardProps) => {
  return (
    <div onClick={onClick} className={`card ${className}`} style={style}>
      <h4 className="card-header">{header}</h4>
      {children && (
        <div className="card-body">
          <div className="card-text">{children}</div>
        </div>
      )}
    </div>
  );
};

export interface CardProps {
  header: string;
  children?: JSX.Element | JSX.Element[];
  onClick?: (event: any) => void;
  className?: string;
  style?: React.CSSProperties;
}
