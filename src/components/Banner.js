import React from 'react';
import classNames from "classnames";
import OnVisible from 'react-on-visible';
import './Banner.scss'

export default ({
    children,
    isToggledOnVisible = true,
    color = 'red',
    header,
    className,
    emoji,
    description = '',
    git,
    href,
    Content
})=>(
    <div className={`banner ${color} ${className || ""}`}>
        <OnVisible visibleClassName={isToggledOnVisible ? "banner-visible" : ""} className={isToggledOnVisible ? "banner-content" : "banner-content banner-visible"}>
            {header && (<h2 className="slide-transition">{emoji && (<span role="img" aria-label="emoji">{emoji}</span>)} {header}</h2>)}
            {Content && <Content/>}
            {children}
            <div className="banner-info">
              <section>
                     
                    {' ' + description}
              </section>
              {git && <a href={git}> Check it out on GitHub! </a>}
              {href && <a href={href}> Check it out! </a>}
            </div>
        </OnVisible>
    </div>
)