import React from "react";
import classNames from "classnames";
import "./Layout.scss";

export const Flex = ({ children, center, column, className, grow, wrap, spaceAround }) => (
  <div
    className={classNames(
      "flex",
      {
        center,
        column, 
        grow,
        wrap,
        spaceAround
      },
      className
    )}
  >
    {children}
  </div>
);
