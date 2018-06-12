import * as React from "react";

import { BeautifyConsumer, BeautifyProps } from "./beautify-consumer";
import { ApiClientConsumer } from "../../ApiClient";

export const BeautifiedCode: React.StatelessComponent<BeautifiedTextProps> = ({
  children,
  data
}: BeautifiedTextProps) => {
  return (
    <ApiClientConsumer>
      {client => (
        <BeautifyConsumer client={client} data={data}>
          {beautified => children(beautified)}
        </BeautifyConsumer>
      )}
    </ApiClientConsumer>
  );
};

export interface BeautifiedTextProps {
  children: BeautifyProps["children"];
  data: BeautifyProps["data"];
}
