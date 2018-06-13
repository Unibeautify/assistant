import * as React from "react";

import { BeautifyConsumer, BeautifyProps } from "./beautify-consumer";
import { ApiClientConsumer } from "../../ApiClient";
import { Spinner } from "../../Spinner";

export const BeautifiedCode: React.StatelessComponent<BeautifiedTextProps> = ({
  children,
  data
}: BeautifiedTextProps) => {
  return (
    <ApiClientConsumer>
      {client => (
        <BeautifyConsumer client={client} data={data}>
          {beautified => {
            const text = beautified && beautified.beautifiedText;
            if (text) {
              return children(text);
            } else {
              return <Spinner />;
            }
          }}
        </BeautifyConsumer>
      )}
    </ApiClientConsumer>
  );
};

export interface BeautifiedTextProps {
  children(beautified: string): JSX.Element | JSX.Element[];
  data: BeautifyProps["data"];
}
