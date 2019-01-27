import React from "react";
import OnVisible from "react-on-visible";
import classNames from "classnames";
import "./Banner.scss";

export default ({
  children,
  isToggledOnVisible = true,
  color = "red",
  header,
  className,
  emoji,
  description = "",
  git,
  href,
  fullscreen,
  Content
}) => (
  <div className={classNames("banner", color, className)}>
    <OnVisible
      visibleClassName={isToggledOnVisible ? "banner-visible" : ""}
      className={classNames("banner-content", {
        "banner-visible": !isToggledOnVisible,
        fullscreen
      })}
    >
      {header && (
        <h2 className="slide-transition">
          {emoji && (
            <span role="img" aria-label="emoji">
              {emoji}
            </span>
          )}{" "}
          {header}
        </h2>
      )}
      {Content && <Content />}
      {children}
      <div className="banner-info">
        <section>{" " + description}</section>
        {git && <a href={git}> Check it out on GitHub! </a>}
        {href && <a href={href}> Check it out! </a>}
      </div>
    </OnVisible>
  </div>
);
