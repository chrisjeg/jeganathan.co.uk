import React from "react";
import classNames from "classnames";
import "./Layout.scss";

export const Flex = ({ children, center, column, className }) => (
  <div
    className={classNames(
      "flex",
      {
        center,
        column
      },
      className
    )}
  >
    {children}
  </div>
);
