import React from "react";
import classNames from "classnames";
import "./Layout.scss";

export const Flex = ({ children, center, column, className, grow }) => (
  <div
    className={classNames(
      "flex",
      {
        center,
        column, grow
      },
      className
    )}
  >
    {children}
  </div>
);
